var options;

module.exports = (function () {

  function getType (value) {
    var map = {
        '[object Number]'   : 'num'
      , '[object String]'   : 'str'
      , '[object Boolean]'  : 'bool'
      , '[object Function]' : 'func'
      , 'null'              : 'null'
      , 'undefined'         : 'undef'
    }

    return map[toString.call(value)] || map[''+value];
  }
  
  function repeat (str, times) {
    times = times || -1;
    return (new Array(times + 1)).join(str);
  }
  
  function cleanObject (obj) {
    var lastKey = '';
    for(var key in obj) {
      (getType(obj[key])==='func') && delete obj[key] || (lastKey = key);
    }
    return lastKey;
  }
  
  function cleanArray (arr) {
    return arr.filter(function (item) {
      return getType(item) !== 'func';
    });
  }
  
  function generateLevel (level) {
    var levelStr  = repeat(' ', options.level.spaces)
      , opts = options.level;
    
    if(options.level.show && levelStr.length) {
      levelStr = levelStr.replace(' ', options.params.colored ? opts.char[opts.color] : opts.char);
    }
    
    return repeat(levelStr, level);
  }
  
  function hasChild (obj) {
    for(var key in obj) {
      if(isArray(obj[key]) || isObject(obj[key])) return true;
    }
  }
  
  function isArray (arr) {
    return toString.call(arr).match(/^\[object Array\]$/);
  }
  
  function isObject (obj) {
    return toString.call(obj).match(/^\[object Object\]$/);
  }
  
  function colorify (value, level) {
    var color = options.colors[getType(value)];
    return generateLevel(level) 
      + (getType(value) === 'str' ? (options.params.colored ? colorifySpec('"', 'quot') : '"') : '')
      + (options.params.colored ? (( '' + value )[color]) : ('' + value))
      + (getType(value) === 'str' ? (options.params.colored ? colorifySpec('"', 'quot') : '"') : '');
  }
  
  function colorifySpec (char, type, level) {
    return generateLevel(level) + (options.params.colored ? char[options.colors[type]] : char);
  }
  
  return {
    gen : function (json, level, isChild) {
      var colored = [];
          level   = level || 0;
      
      if (isObject(json)) {
        
        var lastKey = cleanObject(json);
        colored.push(colorifySpec('{', 'brack', isChild ? 0 : level)); 
        level++;
        
        for(var key in json) {
          var result = colorifySpec(key, 'attr', level) 
             + colorifySpec(': ', 'punc') 
             + this.gen(json[key], level, true) 
             + (key !== lastKey ? colorifySpec(',', 'punc') : '');
          colored.push(result);
        }
        
        colored.push(colorifySpec('}', 'brack', --level));
        
      } else if(isArray(json)) {
        json = cleanArray(json);
        
        if(hasChild(json)) {
          
          var result = json.map(function(item) {
            return this.gen(item, level+1);
          }.bind(this));
          
          colored.push(colorifySpec('[', 'brack', isChild ? 0 : level));;
          colored.push(result.join(colorifySpec(', ', 'punc') + '\n' ));
          colored.push(colorifySpec(']', 'brack', level));
          
        } else {
          
          var coloredArray = colorifySpec('[', 'brack', isChild ? 0 : level);
          for(var key in json) {
            coloredArray += [
                colorify(json[key])
              , json.length-1>key ? colorifySpec(', ', 'punc') : ''
            ].join('');
          }
          colored.push(coloredArray + colorifySpec(']', 'brack'));
          
        }
        
      } else {
        return generateLevel(isChild ? 0 : level) + colorify(json);
      }
      
      return colored.join('\n');
    }, 
    setOptions : function (opts) {
      options = opts;
      return this;
    }
  }
  
})();
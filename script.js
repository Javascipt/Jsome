var colors = {
    'num'   : 'cyan'
  , 'str'   : 'magenta'
  , 'bool'  : 'red'
  , 'regex' : 'blue'
  , 'undef' : 'grey'
  , 'null'  : 'grey'
  , 'attr'  : 'green'
  , 'quot'  : 'yellow'
  , 'punc'  : 'yellow'
  , 'brack' : 'yellow'
}

, level = {
    'show'    : false
  , 'char'    : '.'
  , 'color'   : 'red'
  , 'spaces'  : 2
  , 'start'   : 0
}

, params = {
    'colored' : true
  , 'async'   : false
}

, options = {
    colors  : colors 
  , level   : level
  , params  : params
}

, generator = require("./lib/generator").setOptions(options)
, stringify = require('json-stringify-safe');

module.exports = (function (generator, stringify) {
  
  function jsome (json, callBack) {
    return jsome.parse(stringify(json), callBack);
  }
  
  jsome.parse = function (jsonString, callBack) {
    var json = JSON.parse(jsonString);
    
    if (!jsome.params.async) {
      var output = generator.gen(json, options.level.start);
      if(Array.isArray(output)) {
        console.log.apply(console, output);
      } else {
        console.log(output); 
      }
    } else {
      setTimeout(function () {
        console.log(generator.gen(json, options.level.start));
        callBack && callBack();
      });
    }
    
    return json;
  }
  
  jsome.colors  = colors;
  jsome.level   = level;
  jsome.params  = params;
  
  return jsome;
  
})(generator, stringify);
var colors = {
    'num'   : 'cyan'
  , 'str'   : 'magenta'
  , 'bool'  : 'red'
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

, colors    = require('colors')
, generator = require("./generator").setOptions(options);

module.exports = (function (generator) {
  
  function jsome (json, callBack) {
    var colorsOldState = colors.enabled;
        colors.enabled = options.params.colored;
    
    if(!jsome.params.async) {
      console.log(generator.gen(json));
      colors.enabled = colorsOldState;
    } else {
      setTimeout(function () {
        console.log(generator.gen(json));
        colors.enabled = colorsOldState;
        callBack && callBack();
      });
    }
    
    return json;
  }
  
  jsome.parse = function (jsonString, callBack) {
    jsome(JSON.parse(jsonString), callBack);
  }
  
  jsome.colors  = colors;
  jsome.level   = level;
  jsome.params  = params;
  
  return jsome;
  
})(generator);
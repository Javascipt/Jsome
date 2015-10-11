require('colors');

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

, generator = require("./generator").setOptions(options);

module.exports = (function (generator) {
  
  function jsome (json, callBack) {
    if(!jsome.params.async) {
      console.log(generator.gen(json));
    } else {
      setTimeout(function () {
        console.log(generator.gen(json));
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
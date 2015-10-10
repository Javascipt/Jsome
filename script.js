require('colors');
require('than');


var generator = require("./generator")

, colors = {
  "num"   : "cyan",
  "str"	  : "magenta",
  "bool"  : "red",
  "undef" : "grey",
  "null"  : "grey",
  "attr"  : "green",
  "quot"  : "magenta",
  "punc"  : "yellow",
  "brack" : "yellow"
}

, level = {
  "show"    : false,
  "char"    : ".",
  "color"   : "yellow",
  "spaces"  : 4
}

, params = {
  "colored" : true,
  "async"   : false
}

module.exports = (function (generator) {
  
  function jsome(json, callBack) {
    
    if(!jsome.params.async) {
      console.log(generator.start(json));
      return json;
    }
    
    generator.start.than(json, function (data) {
      console.log.than(data, function () {
        callBack(json);
      });
    });
    
  }
  
  jsome.colors  = colors;
  jsome.level   = level;
  jsome.params  = params;
  
  return jsome;
  
})(generator);
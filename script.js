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
  , 'lintable': false
}


module.exports = (function () {

  function jsome (json, callBack) {
    return jsome.parse(stringify(json), callBack);
  }

  jsome.colors  = colors;
  jsome.level   = level;
  jsome.params  = params;

  var generator = require("./lib/generator").setJsomeRef(jsome)
    , stringify = require('json-stringify-safe');

  jsome.parse = function (jsonString, callBack) {
    var json = JSON.parse(jsonString);

    if (!jsome.params.async) {
      var output = generator.gen(json, jsome.level.start);
      if(Array.isArray(output)) {
        console.log.apply(console, output);
      } else {
        console.log(output);
      }
    } else {
      setTimeout(function () {
        console.log(generator.gen(json, jsome.level.start));
        callBack && callBack();
      });
    }

    return json;
  }

  jsome.getColoredString = function(jsonString, callBack){
    var json = JSON.parse(stringify(jsonString));
    if (!jsome.params.async) {
      var output = generator.gen(json, jsome.level.start);
      return output
    } else {
      setTimeout(function () {
        var output = generator.gen(json, jsome.level.start)
        callBack && callBack(output);
      });
    }
  }


  return jsome;

})();

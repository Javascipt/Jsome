Make your JSON objects look AWESOME!
====================================

![Jsome](https://api.travis-ci.org/Javascipt/Jsome.svg)
![Jsome](https://david-dm.org/Javascipt/Jsome.svg)
![Jsome](https://img.shields.io/npm/dm/jsome.svg)

![Downloads stats](https://nodei.co/npm/jsome.png?downloadRank=true&stars=true)

![Jsome](https://raw.githubusercontent.com/Javascipt/Jsome/master/logo.png)

This package allows you to give style to your JSON on your console!

## Installation :

```bash
  $ npm install jsome
```

if you need to use jsome as a command line, you may need to instal it globally

```bash
  $ [sudo] npm install -g jsome
```

## How does it work ?

#### Command line :

Using jsome as a command line, you need to run the following command that takes the path to your json file as argument

```bash
  $ jsome /path/to/your/json/file.json
  $ jsome [options] /path/to/your/json/file.json
```

You can also send a json string through a pipe (`|`)

```bash
  $ cat /path/to/your/json/file.json | jsome
```

The options available are :
- `-c`: to enable or disable colors (defualt value: true)
- `-l`: to enable or disable levels (default value: false)
- `-s`: to specify the number of tabulation spaces (default value: 2)
- `-r`: to specify valid JSON as output (default value: true)

examples :

```bash
  $ jsome -c false /path/to/your/file.json
  $ jsome -c false -l true /path/to/your/file.json
  $ jsome -s 4 /path/to/your/file.json
```

##### Module :

On your nodejs application, when you need to console.log a json object, all you need to do is to use the jsome function

```javascript
    var jsome = require('jsome');
    jsome([{"id":1,"email":"Khalid@Morocco.ma","active":true},{"id":2,"email":"Someone@somewhere.com","active":false},{"id":3,"email":"chinese@bamboo.tree","active":true}]);
```

Then your json object will be displayed on the console in a pretty format with Awsome colors !
Here is the result :

![jsome](https://raw.githubusercontent.com/Javascipt/Jsome/master/examples/example1.png)

The `jsome` function returns the object passed as argument so that when debugging, you can print the value of an object without having to change a lot on your code

```javascript

    // instead of 
    
    var foo = {
      bar : obj
    }
    jsome (obj);
    
    // you can do this :
    
    var foo = {
      bar : jsome(obj)
    }
    
```

You can add some points to show levels of elements... very helpful when you are dealing with complex json objects

```javascript
    jsome.level.show = true;
```

![jsome](https://raw.githubusercontent.com/Javascipt/Jsome/master/examples/example2.png)

The object `jsome.level` has as default value the following json :

```javascript
  jsome.level = {
      'show'    : false
    , 'char'    : '.'
    , 'color'   : 'red'
    , 'spaces'  : 2
    , 'start'   : 0
  }
```

You can change the level char, its color ( [see chalk package](http://npmjs.org/package/chalk) ) and the number of spaces for each level.

You can also display your json starting from a specific level to avoid displaying your json starting from the extreme left. You can do that by changing the value `jsome.level.start`.

You can configure the colors of the displayed json by changing the values of the `jsome.colors` object which has as default these values.

```javascript
  jsome.colors = {
      'num'   : 'cyan'    // stands for numbers
    , 'str'   : 'magenta' // stands for strings
    , 'bool'  : 'red'     // stands for booleans
    , 'regex' : 'blue'    // stands for regular expressions
    , 'undef' : 'grey'    // stands for undefined
    , 'null'  : 'grey'    // stands for null
    , 'attr'  : 'green'   // objects attributes -> { attr : value }
    , 'quot'  : 'yellow'  // strings quotes -> "..."
    , 'punc'  : 'yellow'  // commas seperating arrays and objects values -> [ , , , ]
    , 'brack' : 'yellow'  // for both {} and []
  }
```

You can not only use the color value as string but also you can use an array to specify the background color or you can make things look bold  ( [see chalk package for more details](http://npmjs.org/package/chalk) )


```javascript
  jsome.colors.bool  = ['green' , 'bgRed']
  jsome.colors.attr  = ['green' , 'bold']
  jsome.colors.quot  = ['yellow', 'bold']
  jsome.colors.punc  = ['yellow', 'bold']
  jsome.colors.brack = ['yellow', 'bold']
```
![jsome](https://raw.githubusercontent.com/Javascipt/Jsome/master/examples/example3.png)


When you have a json as a string, instead of passing by `JSON.parse` function, you can just call the parse function of jsome

```javascript
  jsome(JSON.parse('[1,2,3]'));
```

becomes:

```javascript
  jsome.parse('[1,2,3]');
```

If you need to disable the colors:

```javascript
  jsome.params.colored = false;
```

If you need JSON which pases linting:

```javascript
  jsome.params.lintable = true;
```

When you have a very long json to display, don't make your code blocking... you can enable the asynchronous mode.

```javascript
  jsome.params.async = true;

  jsome(longJson, function () {
      /* Your code here */
  });
```

The default value of `params` is:

```javascript
  jsome.params = {
      'colored' : true
    , 'async'   : false
    , 'lintable': false
  }
```

In order to get the colored string without printing it on the console :

```javascript
   var coloredString = jsome.getColoredString(obj)
```

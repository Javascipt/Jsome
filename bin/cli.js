#!/usr/bin/env node

var path      = require("path")
  , fs        = require("fs")
  , jsome     = require("../script");

var argv = require('yargs')
  .usage('Usage: jsome [options] <file>')
  .option('c',{
    alias: 'colors',
    default: true,
    describe: 'color the output',
    type: 'boolean'
  })
  .option('l',{
    alias: 'levels',
    default: false,
    describe: 'show indentation levels',
    type: 'boolean'
  })
  .example('jsome -cl /some/dir/file.json', 'print out the content of file.json in color displaying indentation levels')
  .example('jsome -c false -l /some/dir/file.json', 'print out the content of file.json without color but with indentation levels')
  .help('h')
  .argv;

jsome.params.colored = argv.c;
jsome.level.show     = argv.l;

var filePath = argv._[0] || '';

fs.exists(path.resolve(filePath), function (exists) {
  if(!exists) return jsome({error : "File doesn't exists"});
  fs.readFile(path.resolve(filePath), function (error, jsonString) {
    if(error) return jsome ({error : error.message});
    jsome.parse(jsonString.toString());
  });
});

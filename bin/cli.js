#!/usr/bin/env node

var path      = require("path")
  , fs        = require("fs")
  , jsome     = require("../script")
  , filePath  = process.argv.slice(2).shift() || '';

jsome.params.colored = true;

fs.exists(path.resolve(filePath), function (exists) {
  if(!exists) return jsome({error : "File doesn't exists"});
  fs.readFile(path.resolve(filePath), function (error, jsonString) {
    if(error) return jsome ({error : error.message});
    jsome.parse(jsonString.toString());
  });
})
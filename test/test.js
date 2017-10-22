var assert = require('assert'),
  mJsome = require('../script.js'),
  escp = require('./helper').escp,
  chalk = require('chalk'),
  enc = require('jsesc'),
  y = chalk.yellow,
  g = chalk.green,
  m = chalk.magenta

describe('Jsome', function () {

  describe('integration', function () {
    describe('simple-colored', function () {
      var expected = y('{') +
        '\n  ' + g('string') + y(': ') + y('"') + m('value') + y('"') +
        y(',') +
        '\n  ' + g('list') + y(': ') + y('[') + y('"') + m('one') + y('"') +
        y(', ') + y('"') + m('two') +
        y('"') + y(']') +
        '\n' + y('}')
      var actual = mJsome.getColoredString(
        {'string': 'value', 'list': ['one', 'two']}
      )

      test('should return a simple json string', function () {
        assert.equal(actual, expected)
      })

      test('should return a simple ANSI escaped json string', function () {
        assert.equal(enc(actual), enc(expected))
      })

    })
  })

})
var assert = require('assert'),
  mJsome = require('../script.js'),
  chalk = require('chalk'),
  enc = require('jsesc'),
  y = chalk.yellow,
  g = chalk.green,
  m = chalk.magenta

describe('Jsome', function () {

  describe('run with', function () {
    describe('spec non-compliant coloured output', function () {
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

      test('should return a simple non-standard json string', function () {
        assert.equal(actual, expected)
      })

      test('should return a simple non-standard ANSI escaped, json string',
        function () {
          assert.equal(enc(actual), enc(expected))
        })

    })

    describe('spec compliant coloured output', function () {
      var expected = y('{') +
        '\n  ' + y('"') + g('string') + y('"') + y(': ') + y('"') + m('value') +
        y('"') +
        y(',') +
        '\n  ' + y('"') + g('list') + y('"') + y(': ') + y('[') + y('"') +
        m('one') + y('"') +
        y(', ') + y('"') + m('two') +
        y('"') + y(']') +
        '\n' + y('}')
      mJsome.params.lintable = true
      var actual = mJsome.getColoredString(
        {'string': 'value', 'list': ['one', 'two']}
      )

      test('should return a simple non-standard json string', function () {
        assert.equal(actual, expected)
      })

      test('should return a simple non-standard ANSI escaped, json string',
        function () {
          assert.equal(enc(actual), enc(expected))
        })
    })

  })

})
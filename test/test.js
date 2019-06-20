var assert = require('assert'),
  jsome = require('../script.js'),
  chalk = require('chalk'),
  enc = require('jsesc'),
  y = chalk.yellow,
  g = chalk.green,
  m = chalk.magenta

describe('Jsome run with', function () {

  beforeEach(function () {
    jsome.params.colored = true
    jsome.params.maxInlineLength = 80
  });

  describe('spec non-compliant coloured output', function () {
    var expected = y('{') +
      '\n  ' + g('string') + y(': ') + y('"') + m('value') + y('"') +
      y(',') +
      '\n  ' + g('list') + y(': ') + y('[') + y('"') + m('one') + y('"') +
      y(', ') + y('"') + m('two') +
      y('"') + y(']') +
      '\n' + y('}')
    var actual = jsome.getColoredString(
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
    jsome.params.lintable = true
    var actual = jsome.getColoredString(
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

  describe('decide the better array presentation', function () {

    test('should not line broke a small inline array', function () {
      jsome.params.colored = false
      assert.equal(
        jsome.getColoredString([1234567890, 'ABCDEFGHIJ']),
        '[1234567890, "ABCDEFGHIJ"]'
      )
    })

    test('should broke long inline in a multiline representation', function () {
      jsome.params.colored = false
      jsome.params.maxInlineLength = 20
      assert.equal(
        jsome.getColoredString([1234567890, 'ABCDEFGHIJ']),
        '[\n  1234567890,\n  "ABCDEFGHIJ"\n]'
      )
    })

  })

})

'use strict'
// **Github:** https://github.com/thunks/thunk-mocha
//
// **License:** MIT

/* global describe, it, before, after, beforeEach */

var assert = require('assert')
var thunk = require('thunks')()

describe('thunk-mocha', function () {
  var result = []

  // support generator
  before(function *() {
    yield thunk.delay(100)
    result.push('before')
  })

  // support simple sync test
  after(function () {
    assert.deepEqual(result, [
      'before',
      'beforeEach',
      'sync test',
      'beforeEach',
      'compatibility',
      'beforeEach',
      'generator',
      'beforeEach',
      'promise'
    ])
  })

  beforeEach(function *() {
    yield thunk.delay(100)
    result.push('beforeEach')
  })

  it('sync test', function () {
    result.push('sync test')
  })

  it('compatibility', function (done) {
    setTimeout(function () {
      result.push('compatibility')
      done()
    }, 100)
  })

  it('generator', function *() {
    yield thunk.delay(100)
    result.push('generator')
  })

  it('promise', function () {
    return new Promise(function (resolve, reject) {
      result.push('promise')
      resolve()
    })
  })
})

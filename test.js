/* global describe, it */

const assert = require('chai').assert
const hueExtras = require('./index')

describe('hue-extras', () => {
  it('should exist', done => {
    assert(hueExtras !== undefined)
    done()
  })
})

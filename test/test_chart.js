/*
 * biojs-vis-circular-bar-chart
 * https://github.com/jessica-jordan/biojs-vis-circular-bar-chart
 *
 * Copyright (c) 2015 Jessica Jordan
 * Licensed under the MIT license.
 */

// chai is an assertion library
var chai = require('chai');

// @see http://chaijs.com/api/assert/
var assert = chai.assert;

// register alternative styles
// @see http://chaijs.com/api/bdd/
chai.expect();
chai.should();

// requires your main app (specified in index.js)
var chart = require('../');

describe('biojs-vis-circular-bar-chart module', function(){
  describe('#hello()', function(){
    it('should return a hello', function(){

      assert.equal(chart.hello('biojs'), ("hello biojs"));
      
      // alternative styles
      chart.hello('biojs').should.equal("hello biojs");
    });
  });
});

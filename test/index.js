'use strict';

var expect = require('chai').expect;
var Plan = require('test-plan');
var loader = require('../lib');
var path = require('path');
var fs = require('fs');

describe('index', function() {

  it('should callback with valid controller files only', function(done) {
    var plan = new Plan(2, done);
    loader.load(path.join(__dirname, 'controllers'), function(controller) {
      fs.lstat(controller, function(error, stats) {
        expect(stats.isDirectory()).to.equal(false);
        plan.ok(true);
      });
    }, function(error) {
      expect(error).to.be.undefined;
    });
  });
});


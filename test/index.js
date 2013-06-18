var loader = require('../lib'),
  path = require('path'),
  fs = require('fs');

exports.testLoading = function(test) {
  test.expect(2);
  var controllerCount = 0,
    expectedControllerCount = 2;

  loader.load(path.join(__dirname, 'controllers'), function(controller) {
    controllerCount++;

    stats = fs.lstatSync(controller);
    test.equals(stats.isDirectory(), false, 'Controller should exist and be a file');

    if (expectedControllerCount == controllerCount) {
      test.done();
    }
  });
};

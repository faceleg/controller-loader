'use strict';

var path = require('path');

function controllers(directory, controllerCallback, completedCallback) {
  var filewalker = require('filewalker');

  filewalker(directory)
    .on('file', function(file) {
      controllerCallback(path.join(directory, file));
    })
    .on('error', function(error) {
      completedCallback && completedCallback(error);
    })
    .on('done', function() {
      completedCallback && completedCallback();
    })
    .walk();
}

module.exports.load = function(directory, controllerCallback, completedCallback) {
  controllers(directory, controllerCallback, completedCallback);
};

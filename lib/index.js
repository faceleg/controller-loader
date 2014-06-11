var filewalker = require('filewalker'),
path = require('path');

function controllers(directory, controllerCallback, completedCallback) {
  var filewalker = require('filewalker');

  filewalker(directory)
    .on('file', function(file, s) {
      controllerCallback(path.join(directory, file));
    })
    .on('error', function(error) {
      completedCallback(error);
    })
    .on('done', function() {
      completedCallback();
    })
    .walk();
}

module.exports.load = function(directory, controllerCallback, completedCallback) {
  controllers(directory, controllerCallback, completedCallback);
};

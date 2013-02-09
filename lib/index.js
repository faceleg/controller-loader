var fs = require('fs'),
    path = require('path');

function controllers(directory, app, config) {
    directory = process.cwd() + directory || '/app/controllers';
    fs.readdir(path.normalize(directory), function(error, files) {
        if (error) {
            return console.error(error);
        }
        files.forEach(function(file) {
            if (file.search(new RegExp(/DS_Store/)) !== -1) {
                return;
            }
            var controller = file.replace('.js', '');
            require(directory + '/' + controller)(app, config);
        });
    });
}

module.exports.load = function(directory, app, config) {
    controllers(directory, app, config);
};

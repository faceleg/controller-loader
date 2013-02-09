var fs = require('fs'),
    path = require('path'),
    async = require('async');

function requireFile(directory, file, app, config) {
    async.waterfall([
        function statFile(callback) {
            if (file.search(new RegExp(/DS_Store/)) !== -1) {
                return;
            }
            var filePath = path.join(directory, '/', file);
            fs.stat(filePath, function(error, stats) {
                callback(null, stats, filePath);
            });
        }
    ], function requireOrRecurse(error, stats, filePath) {
        if (error) {
            throw error;
        }
        if (stats.isDirectory()) {
            return controllers(filePath, app, config);
        }
        require(filePath)(app, config);
    });
}

function controllers(directory, app, config) {
    async.waterfall([
        function readdir(callback) {
            fs.readdir(path.normalize(directory), callback);
        }
    ], function iterateFiles(error, files) {
        if (error) throw error;
        files.forEach(function(file) {
            requireFile(directory, file, app, config);
        });
    });
}

module.exports.load = function(directory, app, config) {
    directory = process.cwd() + directory || '/app/controllers';
    controllers(directory, app, config);
};

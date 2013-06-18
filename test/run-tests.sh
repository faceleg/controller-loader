#!/usr/bin/env node
try {
    var reporter = require('nodeunit').reporters.default;
}
catch(e) {
    console.log("Cannot find nodeunit module.");
    console.log("You can install development dependencies for this project by doing:");
    console.log("");
    console.log("    npm install --dev");
    console.log("");
    process.exit();
}

process.chdir(__dirname);
reporter.run(['index.js']);

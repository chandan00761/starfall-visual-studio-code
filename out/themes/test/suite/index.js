"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const path = require("path");
const Mocha = require("mocha");
const glob = require("glob");
const vscode = require("vscode");
function run() {
    // Create the mocha test
    const mocha = new Mocha({
        ui: "tdd",
        color: true
    });
    const testsRoot = path.resolve(__dirname, "..");
    return new Promise(function (c, e) {
        glob("**/**.test.js", { cwd: testsRoot }, function (err, files) {
            if (err) {
                return e(err);
            }
            // Add files to the test suite
            files.forEach(function (f) { mocha.addFile(path.resolve(testsRoot, f)); });
            try {
                // Run the mocha test
                vscode.window.showInformationMessage("Start all tests.");
                mocha.run(function (failures) {
                    if (failures > 0) {
                        e(new Error(`${failures} tests failed.`));
                    }
                    else {
                        c();
                    }
                });
            }
            catch (err) {
                console.error(err);
                e(err);
            }
        });
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map
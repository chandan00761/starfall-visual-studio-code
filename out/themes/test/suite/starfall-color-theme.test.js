"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const path = require("path");
const vscode = require("vscode");
const logSymbols = require("log-symbols");
const c = require("ansi-colors");
const extensionDir = path.resolve(__dirname, '../../../..');
const themeDir = path.resolve(extensionDir, './themes');
const themeJson = path.normalize(path.resolve(themeDir, "./starfall-color-theme.json"));
suite(themeJson, function () {
    return __awaiter(this, void 0, void 0, function* () {
        let diagnostics;
        let errors;
        let warnings;
        suiteSetup(function (done) {
            this.timeout(8000);
            const workspaces = (vscode.workspace.workspaceFolders || []).length;
            const workspaceFoldersToAdd = { uri: vscode.Uri.file(themeDir) };
            vscode.workspace.updateWorkspaceFolders(workspaces, workspaces, workspaceFoldersToAdd);
            vscode.workspace.openTextDocument(themeJson).then(function (doc) {
                vscode.window.showTextDocument(doc.uri).then(function () {
                    setTimeout(function () {
                        diagnostics = vscode.languages.getDiagnostics(doc.uri) || [];
                        errors = diagnostics.filter(isDiagnosticError);
                        warnings = diagnostics.filter(isDiagnosticWarning);
                        done();
                    }, 4000);
                });
            });
        });
        test("Valid JSON", function (done) {
            let message = '\u001b[39m Errors present in color theme:';
            if (errors.length !== 0) {
                for (let i = 0; i < errors.length; i++) {
                    let error = errors[i];
                    let position = `${error.range.start.line + 1}:${error.range.start.character}`;
                    message += `\n`;
                    message += `        ${logSymbols.error} ${c.gray(`${error.message} (${position})`)}`;
                }
            }
            assert.strictEqual(errors.length, 0, message);
            done();
        });
        test("Valid VSC Theme", function (done) {
            let message = '\u001b[39m Warnings present in color theme:';
            if (warnings.length !== 0) {
                for (let i = 0; i < warnings.length; i++) {
                    let warning = warnings[i];
                    let position = `${warning.range.start.line + 1}:${warning.range.start.character}`;
                    message += `\n`;
                    message += `        ${logSymbols.warning} ${c.gray(`${warning.message} (${position})`)}`;
                }
            }
            assert.strictEqual(warnings.length, 0, message);
            done();
        });
    });
});
function isDiagnosticError(diagnostic) {
    return diagnostic.severity === vscode.DiagnosticSeverity.Error;
}
function isDiagnosticWarning(diagnostic) {
    return (diagnostic.severity === vscode.DiagnosticSeverity.Warning
        && !/ gitlens(?:\.\w+)+ /.test(diagnostic.message));
}
//# sourceMappingURL=starfall-color-theme.test.js.map
import * as assert from "assert";
import * as path from "path";
import * as vscode from "vscode";
import * as logSymbols from 'log-symbols';
import * as c from 'ansi-colors';

const extensionDir = path.resolve(__dirname, '../../../..');
const themeDir = path.resolve(extensionDir, './themes');
const themeJson = path.normalize(path.resolve(themeDir, "./starfall-color-theme-darker.json"));

suite(themeJson, async function() {
	let diagnostics: vscode.Diagnostic[];
	let errors: vscode.Diagnostic[];
	let warnings: vscode.Diagnostic[];

	suiteSetup(function(done) {
		this.timeout(8000);

		const workspaces = (vscode.workspace.workspaceFolders || []).length;
		const workspaceFoldersToAdd = { uri: vscode.Uri.file(themeDir) };
		vscode.workspace.updateWorkspaceFolders(workspaces, workspaces, workspaceFoldersToAdd);

		vscode.workspace.openTextDocument(themeJson).then(function(doc: vscode.TextDocument) {
			vscode.window.showTextDocument(doc.uri).then(function() {
				setTimeout(function() {
					diagnostics = vscode.languages.getDiagnostics(doc.uri) || [];
					errors = diagnostics.filter(isDiagnosticError);
					warnings = diagnostics.filter(isDiagnosticWarning);	
					done();
				}, 4000);
			});
		});
	});

	test("Valid JSON", function(done) {
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

	test("Valid VSC Theme", function(done) {
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

function isDiagnosticError(diagnostic: vscode.Diagnostic): boolean {
	return diagnostic.severity === vscode.DiagnosticSeverity.Error;
}

function isDiagnosticWarning(diagnostic: vscode.Diagnostic): boolean {
	return (
		diagnostic.severity === vscode.DiagnosticSeverity.Warning
		&& !/ gitlens(?:\.\w+)+ /.test(diagnostic.message)
	);
}

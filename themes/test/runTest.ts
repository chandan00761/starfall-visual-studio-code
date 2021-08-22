import * as path from "path";
import * as cp from "child_process";
import { downloadAndUnzipVSCode, resolveCliPathFromVSCodeExecutablePath, runTests } from "vscode-test";
import { quote } from "shell-quote";
import { workspace } from "vscode";

async function main() {
	try {
		const extensionDevelopmentPath = path.resolve(__dirname, "../../../");
		const extensionTestsPath = path.resolve(__dirname, "./suite/index");
		await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
			launchArgs: [
				"--disable-extensions",
				"--disable-workspace-trust"
			]
		});
	} catch (err) {
		console.error("Failed to run tests");
		process.exit(1);
	}
}

main();

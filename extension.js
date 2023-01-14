const vscode = require('vscode');
const {format} = require('./src/helper')

function activate(context) {
	console.log('Congratulations, your extension "elixir-formatter-vscode" is now active!');
	let disposable = vscode.commands.registerCommand('elixir-formatter-vscode.formatSingle', formatSingle);

	vscode.languages.registerDocumentFormattingEditProvider("elixir", {
		provideDocumentFormattingEdits: (document) => {
			return document.save().then(() => {
					return format(document);
			});
		}
	})
	context.subscriptions.push(disposable);
}

function formatSingle() {
		vscode.window.showInformationMessage('formatSingle!');
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

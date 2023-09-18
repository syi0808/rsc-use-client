"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('rsc-use-client.toggleSyntax', () => {
        const { activeTextEditor } = vscode.window;
        if (activeTextEditor) {
            const document = activeTextEditor.document;
            const text = document.getText();
            const modifiedText = toggleSyntaxInEditorCode(text);
            activeTextEditor
                .edit((editBuilder) => {
                const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
                editBuilder.replace(fullRange, modifiedText);
            })
                .then(() => activeTextEditor.document.save());
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function toggleSyntaxInEditorCode(text) {
    if (/\'use client\';?/.test(text)) {
        return text.replace(/\'use client\';?/, `'use server';`);
    }
    else if (/\'use server\';?/.test(text)) {
        return text.replace(/\'use server\';?/, `'use client';`);
    }
    else {
        return `'use client';\n\n` + text;
    }
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
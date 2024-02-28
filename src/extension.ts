import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
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

function toggleSyntaxInEditorCode(text: string) {
  if (/\'use client\';?/.test(text)) {
    return text.replace(/\'use client\';?/, '');
  } else if (/\'use server\';?/.test(text)) {
    return text.replace(/\'use server\';?/, `'use client';`);
  } else {
    return `'use client';\n\n` + text;
  }
}

export function deactivate() {}

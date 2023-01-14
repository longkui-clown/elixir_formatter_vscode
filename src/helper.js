"use strict";
const vscode = require("vscode");
const cp = require("child_process");
const path = require("path")

function format(document) {
  return new Promise((resolve, reject) => {
      const file_path = document.uri.path.split('\\').join('/');
      const fprmat_cmd = `mix format ${file_path}`;
      cp.exec(fprmat_cmd, {
          timeout: 30000
      }, function (error, stdout, stderr) {
          if (error !== null) {
              const message = `Cannot format due to syntax errors.: ${error}, stderr: ${stderr}`;
              vscode.window.showErrorMessage(message);
              return reject(message);
          } else {
              const message = `Format ${path.basename(document.fileName)} over~`
              vscode.window.showInformationMessage(message);
              return resolve(message);
          }
      });
  });
}
exports.format = format;
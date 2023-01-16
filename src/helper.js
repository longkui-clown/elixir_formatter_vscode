/* eslint-disable no-unused-vars */
"use strict";
const vscode = require("vscode");
const cp = require("child_process");
const path = require("path")

function format(document) {
    return new Promise((resolve, reject) => {
        const file_path = document.uri.path.split('\\').join('/');
        // eslint-disable-next-line no-unused-vars
        cp.exec(`mix format ${file_path}`, {
            timeout: 30000
        }, function (error, _stdout, _stderr) {
            if (error !== null) {
                cp.exec(`mix format ${document.fileName.split('\\').join('/')}`, {
                    timeout: 30000
                }, function (error2, _stdout2, stderr2) {
                    if (error2 !== null) {
                        cp.exec(`mix format ${document.fileName}`, {
                            timeout: 30000
                        }, function (error3, _stdout3, stderr3) {
                            if (error3 !== null) {
                                const message = `Cannot format due to syntax errors, stderr: ${stderr3}`;
                                vscode.window.showErrorMessage(message);
                                return reject(message);
                            } else {
                                const message = `Format ${path.basename(document.fileName)} over~`
                                vscode.window.showInformationMessage(message);
                                return resolve(message); 
                            }
                        })
                    } else {
                        const message = `Format ${path.basename(document.fileName)} over~`
                        vscode.window.showInformationMessage(message);
                        return resolve(message);
                    }
                })
            } else {
                const message = `Format ${path.basename(document.fileName)} over~`
                vscode.window.showInformationMessage(message);
                return resolve(message);
            }
        });
    });
}

exports.format = format;
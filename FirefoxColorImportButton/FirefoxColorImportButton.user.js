// ==UserScript==
// @name         FireFox Color Import Button
// @version      1.1.0
// @description  Import button for Firefox Color
// @author       Yazaar
// @include      *color.firefox.com*
// @downloadURL  https://raw.githubusercontent.com/Yazaar/tampermonkey-scripts/master/FirefoxColorImportButton/FirefoxColorImportButton.user.js
// @updateURL    https://raw.githubusercontent.com/Yazaar/tampermonkey-scripts/master/FirefoxColorImportButton/FirefoxColorImportButton.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var SESSION_STORAGE_IMPORTED_KEY = 'yazaar.ffx-color.imported';

    function loop() {
        if (changeQuote === true) {
            var quoteElement = document.querySelector('.app-loading-indicator__quote');
            var quoteAuthorElement = document.querySelector('.app-loading-indicator__attribution');
            if (quoteElement !== null && quoteAuthorElement !== null) {
                changeQuote = false;
                quoteElement.innerText = 'Importing themes should never have been a hassle.';
                quoteAuthorElement.innerText = '-Yazaar';
            }
        }

        var buttonControls = document.querySelector('.app-header__controls');
        var buttonControlsButton = buttonControls?.querySelector('.app-header__button');

        if (!buttonControls || !buttonControlsButton) {
            setTimeout(loop, 100);
            return;
        }

        var importBtn = buttonControlsButton.cloneNode(1);
        importBtn.title = 'Import';

        const importSpan = importBtn.querySelector('span');
        const importImg = importBtn.querySelector('img');

        if (importSpan) importSpan.innerText = 'Import';

        importBtn.addEventListener('click', function () {
            if (active === false) {
                active = true;
                importSect.style.display = 'flex';
            }
        });

        if (importImg) {
            importImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudz'
             + 'Mub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAyMkMxMiAyMi4yNjUyIDEyLjEwNTQgMjIuNTE5NiAxMi4yOTI5IDI'
             + 'yLjcwNzFDMTIuNDgwNCAyMi44OTQ2IDEyLjczNDggMjMgMTMgMjNDMTMuMjY1MiAyMyAxMy41MTk2IDIyLjg5NDYgMTMuNzA3MSAyMi43MDcxQzEzLjg5NDYgMjIuNTE5NiAxNCAyMi4yNjUy'
             + 'IDE0IDIyTDE0IDEwLjQxNEwxOC4yOTMgMTQuNzA3QzE4LjQ4MTYgMTQuODg5MiAxOC43MzQyIDE0Ljk5IDE4Ljk5NjQgMTQuOTg3N0MxOS4yNTg2IDE0Ljk4NTQgMTkuNTA5NCAxNC44ODAyI'
             + 'DE5LjY5NDggMTQuNjk0OEMxOS44ODAyIDE0LjUwOTQgMTkuOTg1NCAxNC4yNTg2IDE5Ljk4NzcgMTMuOTk2NEMxOS45OSAxMy43MzQyIDE5Ljg4OTIgMTMuNDgxNiAxOS43MDcgMTMuMjkzTD'
             + 'EzLjcwNyA3LjI5M0MxMy41MTk1IDcuMTA1NTMgMTMuMjY1MiA3LjAwMDIxIDEzIDcuMDAwMjFDMTIuNzM0OCA3LjAwMDIxIDEyLjQ4MDUgNy4xMDU1MyAxMi4yOTMgNy4yOTNMNi4yOTMgMTM'
             + 'uMjkzQzYuMTEwODQgMTMuNDgxNiA2LjAxMDA1IDEzLjczNDIgNi4wMTIzMyAxMy45OTY0QzYuMDE0NiAxNC4yNTg2IDYuMTE5NzcgMTQuNTA5NCA2LjMwNTE4IDE0LjY5NDhDNi40OTA1OSAx'
             + 'NC44ODAyIDYuNzQxNCAxNC45ODU0IDcuMDAzNiAxNC45ODc3QzcuMjY1OCAxNC45OSA3LjUxODQgMTQuODg5MiA3LjcwNyAxNC43MDdMMTIgMTAuNDE0TDEyIDIyWk0yMCA0QzIwIDQuMjY1M'
             + 'jIgMTkuODk0NiA0LjUxOTU3IDE5LjcwNzEgNC43MDcxMUMxOS41MTk2IDQuODk0NjQgMTkuMjY1MiA1IDE5IDVMNyA1QzYuNzM0NzkgNSA2LjQ4MDQzIDQuODk0NjQgNi4yOTI4OSA0LjcwNz'
             + 'ExQzYuMTA1MzYgNC41MTk1NyA2IDQuMjY1MjIgNiA0QzYgMy43MzQ3OCA2LjEwNTM2IDMuNDgwNDMgNi4yOTI4OSAzLjI5Mjg5QzYuNDgwNDMgMy4xMDUzNSA2LjczNDc5IDMgNyAzTDE5IDN'
             + 'DMTkuMjY1MiAzIDE5LjUxOTYgMy4xMDUzNiAxOS43MDcxIDMuMjkyODlDMTkuODk0NiAzLjQ4MDQzIDIwIDMuNzM0NzggMjAgNFoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=';
        }

        buttonControls.appendChild(importBtn);
    }

    function buildSect() {
        var e = document.createElement('section');
        e.style.display = 'none';
        e.style.flexDirection = 'column';
        e.style.position = 'absolute';
        e.style.transform = 'translate(-50%,-50%)';
        e.style.left = '50%';
        e.style.top = '50%';
        e.style.zIndex = '999999';
        e.style.background = 'rgba(0, 0, 0, .85)';
        e.style.borderRadius = '10px';
        e.style.border = '#000000 8px solid';
        e.style.maxWidth = '90vw';
        e.style.maxHeight = '90vh';
        e.style.padding = '15px';
        e.style.textAlign = 'center';
        var text = document.createElement('p');
        text.innerText = 'import manifest file';
        text.style.margin = '0';
        text.style.color = '#FFFFFF';
        e.appendChild(text);
        var textDescrition = document.createElement('p');
        textDescrition.innerText = 'The manifest.json file is located within theme.zip/xpi';
        textDescrition.style.margin = '5px 0';
        textDescrition.style.color = '#9E9E9E';
        textDescrition.style.textAlign = 'center';
        textDescrition.style.maxWidth = '30ch';
        textDescrition.style.fontSize = '0.8rem';
        e.appendChild(textDescrition);
        var text2 = document.createElement('p');
        text2.innerText = 'upload file or paste data';
        text2.style.margin = '2px 0 5px 0';
        text2.style.color = '#FFFFFF';
        e.appendChild(text2);
        var fr = new FileReader();
        fr.addEventListener('load', function () {
            var importData = validateImport(this.result);
            if (importData !== null) {
                localStorage.setItem('THEME-' + new Date().getTime() + '-' + Math.floor(Math.random() * 900 + 100), importData);
                sessionStorage.setItem(SESSION_STORAGE_IMPORTED_KEY, '1');
                e.style.display = 'none';
                window.location.reload();
            } else {
                freeze = true;
                var prev = uploadFileBtn.innerText;
                uploadFileBtn.innerText = 'invalid';
                setTimeout(function () {
                    uploadFileBtn.innerText = prev;
                    freeze = false;
                }, 2000);
            }
        });
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.addEventListener('input', function () {
            if (freeze === true) {
                return;
            }
            fr.readAsText(this.files[0]);
        });
        var uploadFileBtn = document.createElement('button');
        uploadFileBtn.innerText = 'upload manifest.json';
        uploadFileBtn.style.marginTop = '3px'
        uploadFileBtn.style.background = '#000000';
        uploadFileBtn.style.borderColor = 'rgb(100, 100, 100) rgb(50, 50, 50) rgb(50, 50, 50) rgb(100, 100, 100)';
        uploadFileBtn.style.borderStyle = 'solid';
        uploadFileBtn.style.borderWidth = '3px';
        uploadFileBtn.style.color = '#FFFFFF';
        uploadFileBtn.style.cursor = 'pointer';
        uploadFileBtn.addEventListener('click', function () {
            if (freeze === true) {
                return;
            }
            fileInput.click();
        });
        e.appendChild(uploadFileBtn);
        var text3 = document.createElement('p');
        text3.innerText = 'OR';
        text3.style.margin = '2px 0';
        text3.style.color = '#FFFFFF';
        e.appendChild(text3);
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.style.background = '#000000';
        inputField.style.border = 'rgba(255, 255, 255, .5) 3px solid';
        inputField.style.color = '#FFFFFF';
        inputField.style.borderRadius = '6px';
        e.appendChild(inputField);
        var importBtn = document.createElement('button');
        importBtn.addEventListener('click', function () {
            if (freeze === true) {
                return;
            }
            var importData = validateImport(inputField.value);
            if (importData !== null) {
                localStorage.setItem('THEME-' + new Date().getTime() + '-' + Math.floor(Math.random() * 900 + 100), importData);
                sessionStorage.setItem(SESSION_STORAGE_IMPORTED_KEY, '1');
                e.style.display = 'none';
                freeze = false;
                window.location.reload();
            } else {
                var prev = this.innerText;
                this.innerText = 'invalid';
                setTimeout(function () {
                    importBtn.innerText = prev;
                    freeze = false;
                }, 2000);
            }
        });
        importBtn.innerText = 'import';
        importBtn.style.marginTop = '8px'
        importBtn.style.background = '#000000';
        importBtn.style.borderColor = 'rgb(100, 100, 100) rgb(50, 50, 50) rgb(50, 50, 50) rgb(100, 100, 100)';
        importBtn.style.borderStyle = 'solid';
        importBtn.style.borderWidth = '3px';
        importBtn.style.color = '#FFFFFF';
        importBtn.style.cursor = 'pointer';
        e.appendChild(importBtn);
        var cancelBtn = document.createElement('button');
        cancelBtn.addEventListener('click', function () {
            if (active === true) {
                active = false;
                inputField.value = '';
                e.style.display = 'none';
            }
        });
        cancelBtn.innerText = 'cancel';
        cancelBtn.style.marginTop = '6px';
        cancelBtn.style.background = '#000000';
        cancelBtn.style.borderColor = 'rgb(100, 100, 100) rgb(50, 50, 50) rgb(50, 50, 50) rgb(100, 100, 100)';
        cancelBtn.style.borderStyle = 'solid';
        cancelBtn.style.borderWidth = '3px';
        cancelBtn.style.color = '#FFFFFF';
        cancelBtn.style.cursor = 'pointer';
        e.appendChild(cancelBtn);
        return e;
    }

    function validateImport(importData) {
        try {
            var data = JSON.parse(importData).theme;
        } catch (e) {
            return null;
        }
        if (data === undefined) {
            return null;
        }
        var dataKeys = Object.keys(data.colors);
        for (var i = 0; i < dataKeys.length; i++) {
            var r = data.colors[dataKeys[i]].match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
            if (r !== null) {
                data.colors[dataKeys[i]] = {
                    r: parseInt(r[1]),
                    g: parseInt(r[2]),
                    b: parseInt(r[3])
                };
            } else {
                r = data.colors[dataKeys[i]].match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.\d+|\d+)\s*\)$/);
                if (r !== null) {
                    data.colors[dataKeys[i]] = {
                        r: parseInt(r[1]),
                        g: parseInt(r[2]),
                        b: parseInt(r[3]),
                        a: parseInt(r[4])
                    };
                } else {
                    return null;
                }
            }
        }
        if (data === undefined) {
            return null;
        }
        return JSON.stringify({
            theme: data,
            modified: new Date().getTime()
        });
    }

    var changeQuote = sessionStorage.getItem(SESSION_STORAGE_IMPORTED_KEY) === '1';
    if (changeQuote) {
        sessionStorage.removeItem(SESSION_STORAGE_IMPORTED_KEY);
    }

    var active = false;
    var freeze = false;
    var importSect = buildSect();
    document.body.appendChild(importSect);
    loop();
})();
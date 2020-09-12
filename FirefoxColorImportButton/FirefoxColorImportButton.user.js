// ==UserScript==
// @name         FireFox Color Import Button
// @version      1.0.0
// @description  Import button for Firefox Color
// @author       Yazaar
// @include      *color.firefox.com*
// @downloadURL  https://raw.githubusercontent.com/Yazaar/tampermonkey-scripts/master/FirefoxColorImportButton/FirefoxColorImportButton.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

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
        var exportBtn = document.querySelector('.Export');
        if (exportBtn !== null) {
            var importBtn = exportBtn.cloneNode(1);
            importBtn.title = 'Import';
            importBtn.querySelector('img').style.transform = 'rotate(180deg)';
            importBtn.querySelector('span').innerText = 'Import';
            importBtn.addEventListener('click', function () {
                if (active === false) {
                    active = true;
                    importSect.style.display = 'flex';
                }
            });
            exportBtn.parentNode.appendChild(importBtn);
        } else {
            setTimeout(loop, 100);
        }
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
        e.style.background = 'rgba(0, 0, 0, .75)';
        e.style.borderRadius = '1rem';
        e.style.border = '#000000 .25rem solid';
        e.style.maxWidth = '90vw';
        e.style.maxHeight = '90vh';
        e.style.padding = '1rem';
        e.style.textAlign = 'center';
        var text = document.createElement('p');
        text.innerText = 'import manifest file';
        text.style.margin = '0';
        text.style.color = '#FFFFFF';
        e.appendChild(text);
        var text2 = document.createElement('p');
        text2.innerText = 'upload file or paste data';
        text2.style.margin = '.1rem 0 .5rem 0';
        text2.style.color = '#FFFFFF';
        e.appendChild(text2);
        var fr = new FileReader();
        fr.addEventListener('load', function () {
            var importData = validateImport(this.result);
            if (importData !== null) {
                localStorage.setItem('THEME-' + new Date().getTime() + '-' + Math.floor(Math.random() * 900 + 100), importData);
                window.location = location.origin + '?imported=1';
                e.style.display = 'none';
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
        uploadFileBtn.style.marginTop = '.2rem'
        uploadFileBtn.style.background = '#000000';
        uploadFileBtn.style.borderColor = 'rgb(100, 100, 100) rgb(50, 50, 50) rgb(50, 50, 50) rgb(100, 100, 100)';
        uploadFileBtn.style.borderStyle = 'solid';
        uploadFileBtn.style.borderWidth = '.2rem';
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
        text3.style.margin = '.1rem 0';
        text3.style.color = '#FFFFFF';
        e.appendChild(text3);
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.style.background = 'rgba(0, 0, 0, .2)';
        inputField.style.border = 'rgba(0, 0, 0, .5) .2rem solid';
        inputField.style.color = '#FFFFFF';
        inputField.style.borderRadius = '.5rem';
        e.appendChild(inputField);
        var importBtn = document.createElement('button');
        importBtn.addEventListener('click', function () {
            if (freeze === true) {
                return;
            }
            var importData = validateImport(inputField.value);
            if (importData !== null) {
                localStorage.setItem('THEME-' + new Date().getTime() + '-' + Math.floor(Math.random() * 900 + 100), importData);
                window.location = location.origin + '?imported=1';
                e.style.display = 'none';
                freeze = false;
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
        importBtn.style.marginTop = '.2rem'
        importBtn.style.background = '#000000';
        importBtn.style.borderColor = 'rgb(100, 100, 100) rgb(50, 50, 50) rgb(50, 50, 50) rgb(100, 100, 100)';
        importBtn.style.borderStyle = 'solid';
        importBtn.style.borderWidth = '.2rem';
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
        cancelBtn.style.marginTop = '.5rem';
        cancelBtn.style.background = '#000000';
        cancelBtn.style.borderColor = 'rgb(100, 100, 100) rgb(50, 50, 50) rgb(50, 50, 50) rgb(100, 100, 100)';
        cancelBtn.style.borderStyle = 'solid';
        cancelBtn.style.borderWidth = '.2rem';
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
    var changeQuote = new URLSearchParams(location.search).get('imported') === '1';
    var active = false;
    var freeze = false;
    var importSect = buildSect();
    document.body.appendChild(importSect);
    loop();
})();
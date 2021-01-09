/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
eval("(function(){\r\n    var input = $('#input'),\r\n        kanaContainer = $('#kana');\r\n\r\n    var kanaDic = null,\r\n        keybindingDic = null;\r\n\r\n    var charToInsert = null,\r\n        kanaGroupKeyMap = {},\r\n        activeKanaKey = null,\r\n        activeKanaGroup = null,\r\n        activeKanaType = 'h';\r\n\r\n    $.when($.get('data/kana.json'),$.get('data/keybinding.json')).done(function(pKanaDone, pKeyBindingDone){\r\n        kanaDic = restructDataToKey('r',pKanaDone[0]);\r\n        keybindingDic = pKeyBindingDone[0];\r\n\r\n        init();\r\n    })\r\n\r\n    function init(){\r\n        generateKeyBoard();\r\n\r\n        addListeners();\r\n\r\n        input.trigger('focus');\r\n    }\r\n\r\n    function generateKeyBoard(){\r\n        var _keyboard = [];\r\n        kanaContainer.html('');\r\n\r\n        kanaGroupKeyMap[keybindingDic['input'][0]['keyCode']] = [kanaDic['A'],kanaDic['U'],kanaDic['E'],kanaDic['O'],kanaDic['I']];\r\n        kanaGroupKeyMap[keybindingDic['input'][1]['keyCode']] = [kanaDic['Ka'],kanaDic['Ku'],kanaDic['Ke'],kanaDic['Ko'],kanaDic['Ki']];\r\n        kanaGroupKeyMap[keybindingDic['input'][2]['keyCode']] = [kanaDic['Sa'],kanaDic['Su'],kanaDic['Se'],kanaDic['So'],kanaDic['Shi']];\r\n        kanaGroupKeyMap[keybindingDic['input'][3]['keyCode']] = [kanaDic['Ta'],kanaDic['Tsu'],kanaDic['Te'],kanaDic['To'],kanaDic['Chi']];\r\n        kanaGroupKeyMap[keybindingDic['input'][4]['keyCode']] = [kanaDic['Na'],kanaDic['Nu'],kanaDic['Ne'],kanaDic['No'],kanaDic['Ni']];\r\n        kanaGroupKeyMap[keybindingDic['input'][5]['keyCode']] = [kanaDic['Ha'],kanaDic['Fu'],kanaDic['He'],kanaDic['Ho'],kanaDic['Hi']];\r\n        kanaGroupKeyMap[keybindingDic['input'][6]['keyCode']] = [kanaDic['Ma'],kanaDic['Mu'],kanaDic['Me'],kanaDic['Mo'],kanaDic['Mi']];\r\n        kanaGroupKeyMap[keybindingDic['input'][7]['keyCode']] = [kanaDic['Ya'],kanaDic['Yu'],kanaDic['klammer_zu'],kanaDic['Yo'],kanaDic['klammer_auf']];\r\n        kanaGroupKeyMap[keybindingDic['input'][8]['keyCode']] = [kanaDic['Ra'],kanaDic['Ru'],kanaDic['Re'],kanaDic['Ro'],kanaDic['Ri']];\r\n        kanaGroupKeyMap[keybindingDic['input'][9]['keyCode']] = [kanaDic['daku2'],kanaDic['handaku'],kanaDic['dot'],kanaDic['comma'],kanaDic['daku']];\r\n        kanaGroupKeyMap[keybindingDic['input'][10]['keyCode']] = [kanaDic['Wa'],kanaDic['N'],kanaDic['choonpu'],kanaDic['namidasshu'],kanaDic['Wo']];\r\n\r\n        // order as defined in keybinding-list\r\n        for(var _o = 0; _o < keybindingDic['input'].length; _o++){\r\n            var _kbdi = keybindingDic['input'][_o];\r\n\r\n            if(_o > 0 && _o % 3 === 0){\r\n                _keyboard.push($('<br>'));\r\n            }\r\n\r\n            _keyboard.push(generateButton(_kbdi.keyCode,'r',activeKanaType,kanaGroupKeyMap[_kbdi.keyCode]));\r\n        }\r\n\r\n        kanaContainer.append(_keyboard);\r\n    }\r\n\r\n    function generateButton(pKeyCode, pDataKey, pDataValue, pCharacters){\r\n        var _container = $('<div class=\"kana-key\"></div>'),\r\n            _poskanaDic = {\r\n                0: 'main',\r\n                1: 'top',\r\n                2: 'right',\r\n                3: 'bottom',\r\n                4: 'left'\r\n            };\r\n\r\n        for(var _i = 0; _i < pCharacters.length; _i++){\r\n            var _char = pCharacters[_i];\r\n            if(!_char){\r\n                continue;\r\n            }\r\n            var _button = $('<div class=\"'+_poskanaDic[_i]+'\" data-pos=\"'+_i+'\" data-keycode=\"'+pKeyCode+'\" data-data-key=\"'+_char[pDataKey]+'\" title=\"'+_char[pDataKey]+'\">'+_char[pDataValue]+'</div>');\r\n            _button.on('click', function(){onKanaClick(this); return false;});\r\n            _container.append(_button);\r\n        }\r\n            \r\n        return _container;\r\n    }\r\n\r\n    function onKanaClick(pKey){\r\n        insertKanaByDataKey($(pKey).data('data-key'));\r\n        input.trigger('focus');\r\n    }\r\n\r\n    function insertKanaByDataKey(pDataKey){\r\n        insert(kanaDic[pDataKey]);\r\n    }\r\n\r\n    function restructDataToKey(pKey, pData){\r\n        var _new = {};\r\n\r\n        for(var _i = 0; _i < pData.length; _i++){\r\n            var _key = pData[_i][pKey].replace(/\\s/,'_');\r\n            _new[_key] = pData[_i];\r\n        }\r\n\r\n        return _new;\r\n    }\r\n\r\n    function addListeners(){\r\n        var _inputHold = false,\r\n            _controlHold = false,\r\n            _configHold = false;\r\n\r\n        input.on('keydown', function(ev){\r\n            var _pressedKeyCode = ev.which;\r\n\r\n            if(pressedKeyIs('input',_pressedKeyCode)){\r\n                if(!_inputHold){\r\n                    _inputHold = _pressedKeyCode;\r\n                    startUseButton('input',_pressedKeyCode);\r\n                }\r\n                return false;\r\n            }\r\n            if(pressedKeyIs('control',_pressedKeyCode)){\r\n                if(!_inputHold){\r\n                    return;\r\n                }\r\n                if(!_controlHold){\r\n                    _controlHold = _pressedKeyCode;\r\n                    startUseButton('control',_pressedKeyCode);\r\n                }\r\n                return false;\r\n            }\r\n            if(pressedKeyIs('config',_pressedKeyCode)){\r\n                _configHold = _pressedKeyCode;\r\n                return false;\r\n            }\r\n        });\r\n\r\n        input.on('keyup', function(ev){\r\n            var _pressedKeyCode = ev.which;\r\n            \r\n            if(_inputHold === _pressedKeyCode){\r\n                stopUseButton('input', _pressedKeyCode);\r\n                _inputHold = false;\r\n            }\r\n            if(_controlHold === _pressedKeyCode){\r\n                stopUseButton('control', _pressedKeyCode);\r\n                _controlHold = false;\r\n            }\r\n            if(_configHold === _pressedKeyCode){\r\n                stopUseButton('config', _pressedKeyCode);\r\n                _configHold = false;\r\n            }\r\n\r\n        });\r\n    }\r\n\r\n    function pressedKeyIs(pType, pKeyCode){\r\n        var _list = keybindingDic[pType];\r\n        \r\n        if(_list){\r\n            for(var _i = 0; _i < _list.length; _i++){\r\n                var _item = _list[_i];\r\n                if(_item && _item.keyCode && parseInt(_item.keyCode) === pKeyCode){\r\n                    return true;\r\n                }\r\n            }\r\n        }\r\n\r\n        return false;\r\n    }\r\n\r\n    function startUseButton(pType, pKeyCode){\r\n        switch(pType){\r\n            case 'input': \r\n                activeKanaGroup = kanaGroupKeyMap[pKeyCode];\r\n                activeKanaKey = pKeyCode;\r\n                charToInsert = activeKanaGroup[0];\r\n                var _main = $('.kana-key').find('.main[data-keycode=\"'+pKeyCode+'\"]'),\r\n                    _buttonGroup = _main.parent();\r\n\r\n                _buttonGroup.addClass('in-use');\r\n                _main.addClass('in-use');\r\n                \r\n            break;\r\n\r\n            case 'control': \r\n                var _pressedKey = keybindingDic.control.filter(function(pKeyBinding) {\r\n                    return (parseInt(pKeyBinding.keyCode) === pKeyCode) ? true : false\r\n                });\r\n\r\n                if(_pressedKey.length > 0){\r\n                    _pressedKey = _pressedKey[0];\r\n                    var _highlight = false;\r\n                    switch(_pressedKey.keyValue){\r\n                        case 'top': \r\n                            charToInsert = activeKanaGroup[1];\r\n                            _highlight = true;\r\n                            break;\r\n                        case 'right': \r\n                            charToInsert = activeKanaGroup[2];\r\n                            _highlight = true;\r\n                            break;\r\n                        case 'bottom': \r\n                            charToInsert = activeKanaGroup[3];\r\n                            _highlight = true;\r\n                            break;\r\n                        case 'left': \r\n                            charToInsert = activeKanaGroup[4];\r\n                            _highlight = true;\r\n                        break;\r\n                    }\r\n                    if(_highlight){\r\n                        var _button = $('.kana-key').find('.'+_pressedKey.keyValue+'[data-keycode=\"'+activeKanaKey+'\"]'),\r\n                            _buttonGroup = _button.parent();\r\n\r\n                        _buttonGroup.find('.in-use').removeClass('in-use');\r\n                        _button.addClass('in-use');\r\n                    }\r\n                }\r\n                \r\n            break;\r\n        }\r\n    }\r\n\r\n    function stopUseButton(pType, pKeyCode){\r\n        switch(pType){\r\n            case 'input': \r\n                var _buttonGroup = $('.kana-key').find('[data-keycode=\"'+pKeyCode+'\"]').parent(); // wtf, TODO\r\n                _buttonGroup.removeClass('in-use');\r\n                _buttonGroup.find('.in-use').removeClass('in-use');\r\n\r\n                if(charToInsert){\r\n                    insert(charToInsert);\r\n                    \r\n                    charToInsert = null;\r\n                    activeKanaKey = null;\r\n                    activeKanaGroup = null;\r\n                }else{\r\n\r\n                }\r\n            break;\r\n            case 'control': \r\n                var _pressedKey = keybindingDic.control.filter(function(pKeyBinding) {\r\n                    return (parseInt(pKeyBinding.keyCode) === pKeyCode) ? true : false\r\n                });\r\n                if(_pressedKey.length > 0){\r\n                    _pressedKey = _pressedKey[0];\r\n                    \r\n                    if(['top', 'right', 'bottom', 'left'].indexOf(_pressedKey.keyValue) !== -1){\r\n                        if(!activeKanaGroup){\r\n                            break;\r\n                        }\r\n                        charToInsert = activeKanaGroup[0];\r\n\r\n                        var _button = $('.kana-key').find('.main[data-keycode=\"'+activeKanaKey+'\"]'),\r\n                            _buttonGroup = _button.parent();\r\n                        _buttonGroup.find('.in-use').removeClass('in-use');\r\n                        _button.addClass('in-use');\r\n                    }\r\n                }\r\n            break;\r\n            case 'config': \r\n                var _pressedKey = keybindingDic.config.filter(function(pKeyBinding) {\r\n                    return (parseInt(pKeyBinding.keyCode) === pKeyCode) ? true : false\r\n                });\r\n                if(_pressedKey.length > 0){\r\n                    _pressedKey = _pressedKey[0];\r\n\r\n                    switch(_pressedKey.keyValue){\r\n                        case 'change_kana': \r\n                            activeKanaType = (activeKanaType === 'h') ? 'k' : 'h';\r\n                            generateKeyBoard();\r\n                        break;\r\n                    }\r\n                }\r\n            break;\r\n        }\r\n    }\r\n\r\n    function insert(pInsertChar){\r\n        switch(pInsertChar.r){\r\n            case 'daku': \r\n            case 'daku2': \r\n                var _cursorPos = input.prop('selectionStart');\r\n                if(_cursorPos <= 0){\r\n                    break;\r\n                }\r\n                var _char = input.val()[_cursorPos-1];\r\n                \r\n                for(var _r in kanaDic){\r\n                    var _k = kanaDic[_r];\r\n                    var _daku = (pInsertChar.r === 'daku2' && _k['daku2']) ? 'daku2' : 'daku';\r\n\r\n                    if(_k[activeKanaType] === _char && _k[_daku] && kanaDic[_k[_daku]]){\r\n                        deleteAtCursor(input[0]);\r\n                        insertAtCursor(input[0], kanaDic[_k[_daku]][activeKanaType]);\r\n                    }\r\n                }\r\n            break;\r\n            case 'handaku': \r\n                var _cursorPos = input.prop('selectionStart');\r\n                if(_cursorPos <= 0){\r\n                    break;\r\n                }\r\n                var _char = input.val()[_cursorPos-1];\r\n                \r\n                for(var _r in kanaDic){\r\n                    var _k = kanaDic[_r];\r\n                    if(_k[activeKanaType] === _char && _k['handaku'] && kanaDic[_k['handaku']]){\r\n                        deleteAtCursor(input[0]);\r\n                        insertAtCursor(input[0], kanaDic[_k['handaku']][activeKanaType]);\r\n                    }\r\n                }\r\n            break;\r\n            default:\r\n                insertAtCursor(input[0], pInsertChar[activeKanaType]);\r\n        }\r\n    }\r\n\r\n    function insertAtCursor(myField, myValue) {\r\n        //IE support\r\n        if (document.selection) {\r\n            myField.focus();\r\n            sel = document.selection.createRange();\r\n            sel.text = myValue;\r\n        }\r\n        //MOZILLA and others\r\n        else if (myField.selectionStart || myField.selectionStart == '0') {\r\n            var startPos = myField.selectionStart;\r\n            var endPos = myField.selectionEnd;\r\n            myField.value = myField.value.substring(0, startPos)\r\n                + myValue\r\n                + myField.value.substring(endPos, myField.value.length);\r\n            myField.selectionStart = startPos + myValue.length;\r\n            myField.selectionEnd = startPos + myValue.length;\r\n        } else {\r\n            myField.value += myValue;\r\n        }\r\n    }\r\n\r\n    function deleteAtCursor(myField) {\r\n        if (myField.selectionStart > '0') {\r\n            var startPos = myField.selectionStart - 1;\r\n            var endPos = myField.selectionEnd;\r\n            myField.value = myField.value.substring(0, startPos)\r\n                + myField.value.substring(endPos, myField.value.length);\r\n            myField.selectionStart = startPos;\r\n            myField.selectionEnd = startPos;\r\n        }\r\n    }\r\n})();\n\n//# sourceURL=webpack://kana-helper/./src/js/main.js?");
/******/ })()
;
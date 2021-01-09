(function(){
    var input = $('#input'),
        kanaContainer = $('#kana');

    var kanaDic = null,
        keybindingDic = null;

    var charToInsert = null,
        kanaGroupKeyMap = {},
        activeKanaKey = null,
        activeKanaGroup = null,
        activeKanaType = 'h';

    $.when($.get('data/kana.json'),$.get('data/keybinding.json')).done(function(pKanaDone, pKeyBindingDone){
        kanaDic = restructDataToKey('r',pKanaDone[0]);
        keybindingDic = pKeyBindingDone[0];

        init();
    })

    function init(){
        generateKeyBoard();

        addListeners();

        input.trigger('focus');
    }

    function generateKeyBoard(){
        var _keyboard = [];
        kanaContainer.html('');

        kanaGroupKeyMap[keybindingDic['input'][0]['keyCode']] = [kanaDic['A'],kanaDic['U'],kanaDic['E'],kanaDic['O'],kanaDic['I']];
        kanaGroupKeyMap[keybindingDic['input'][1]['keyCode']] = [kanaDic['Ka'],kanaDic['Ku'],kanaDic['Ke'],kanaDic['Ko'],kanaDic['Ki']];
        kanaGroupKeyMap[keybindingDic['input'][2]['keyCode']] = [kanaDic['Sa'],kanaDic['Su'],kanaDic['Se'],kanaDic['So'],kanaDic['Shi']];
        kanaGroupKeyMap[keybindingDic['input'][3]['keyCode']] = [kanaDic['Ta'],kanaDic['Tsu'],kanaDic['Te'],kanaDic['To'],kanaDic['Chi']];
        kanaGroupKeyMap[keybindingDic['input'][4]['keyCode']] = [kanaDic['Na'],kanaDic['Nu'],kanaDic['Ne'],kanaDic['No'],kanaDic['Ni']];
        kanaGroupKeyMap[keybindingDic['input'][5]['keyCode']] = [kanaDic['Ha'],kanaDic['Fu'],kanaDic['He'],kanaDic['Ho'],kanaDic['Hi']];
        kanaGroupKeyMap[keybindingDic['input'][6]['keyCode']] = [kanaDic['Ma'],kanaDic['Mu'],kanaDic['Me'],kanaDic['Mo'],kanaDic['Mi']];
        kanaGroupKeyMap[keybindingDic['input'][7]['keyCode']] = [kanaDic['Ya'],kanaDic['Yu'],kanaDic['klammer_zu'],kanaDic['Yo'],kanaDic['klammer_auf']];
        kanaGroupKeyMap[keybindingDic['input'][8]['keyCode']] = [kanaDic['Ra'],kanaDic['Ru'],kanaDic['Re'],kanaDic['Ro'],kanaDic['Ri']];
        kanaGroupKeyMap[keybindingDic['input'][9]['keyCode']] = [kanaDic['daku2'],kanaDic['handaku'],kanaDic['dot'],kanaDic['comma'],kanaDic['daku']];
        kanaGroupKeyMap[keybindingDic['input'][10]['keyCode']] = [kanaDic['Wa'],kanaDic['N'],kanaDic['choonpu'],kanaDic['namidasshu'],kanaDic['Wo']];

        // order as defined in keybinding-list
        for(var _o = 0; _o < keybindingDic['input'].length; _o++){
            var _kbdi = keybindingDic['input'][_o];

            if(_o > 0 && _o % 3 === 0){
                _keyboard.push($('<br>'));
            }

            _keyboard.push(generateButton(_kbdi.keyCode,'r',activeKanaType,kanaGroupKeyMap[_kbdi.keyCode]));
        }

        kanaContainer.append(_keyboard);
    }

    function generateButton(pKeyCode, pDataKey, pDataValue, pCharacters){
        var _container = $('<div class="kana-key"></div>'),
            _poskanaDic = {
                0: 'main',
                1: 'top',
                2: 'right',
                3: 'bottom',
                4: 'left'
            };

        for(var _i = 0; _i < pCharacters.length; _i++){
            var _char = pCharacters[_i];
            if(!_char){
                continue;
            }
            var _button = $('<div class="'+_poskanaDic[_i]+'" data-pos="'+_i+'" data-keycode="'+pKeyCode+'" data-data-key="'+_char[pDataKey]+'" title="'+_char[pDataKey]+'">'+_char[pDataValue]+'</div>');
            _button.on('click', function(){onKanaClick(this); return false;});
            _container.append(_button);
        }
            
        return _container;
    }

    function onKanaClick(pKey){
        insertKanaByDataKey($(pKey).data('data-key'));
        input.trigger('focus');
    }

    function insertKanaByDataKey(pDataKey){
        insert(kanaDic[pDataKey]);
    }

    function restructDataToKey(pKey, pData){
        var _new = {};

        for(var _i = 0; _i < pData.length; _i++){
            var _key = pData[_i][pKey].replace(/\s/,'_');
            _new[_key] = pData[_i];
        }

        return _new;
    }

    function addListeners(){
        var _inputHold = false,
            _controlHold = false,
            _configHold = false;

        input.on('keydown', function(ev){
            var _pressedKeyCode = ev.which;

            if(pressedKeyIs('input',_pressedKeyCode)){
                if(!_inputHold){
                    _inputHold = _pressedKeyCode;
                    startUseButton('input',_pressedKeyCode);
                }
                return false;
            }
            if(pressedKeyIs('control',_pressedKeyCode)){
                if(!_inputHold){
                    return;
                }
                if(!_controlHold){
                    _controlHold = _pressedKeyCode;
                    startUseButton('control',_pressedKeyCode);
                }
                return false;
            }
            if(pressedKeyIs('config',_pressedKeyCode)){
                _configHold = _pressedKeyCode;
                return false;
            }
        });

        input.on('keyup', function(ev){
            var _pressedKeyCode = ev.which;
            
            if(_inputHold === _pressedKeyCode){
                stopUseButton('input', _pressedKeyCode);
                _inputHold = false;
            }
            if(_controlHold === _pressedKeyCode){
                stopUseButton('control', _pressedKeyCode);
                _controlHold = false;
            }
            if(_configHold === _pressedKeyCode){
                stopUseButton('config', _pressedKeyCode);
                _configHold = false;
            }

        });
    }

    function pressedKeyIs(pType, pKeyCode){
        var _list = keybindingDic[pType];
        
        if(_list){
            for(var _i = 0; _i < _list.length; _i++){
                var _item = _list[_i];
                if(_item && _item.keyCode && parseInt(_item.keyCode) === pKeyCode){
                    return true;
                }
            }
        }

        return false;
    }

    function startUseButton(pType, pKeyCode){
        switch(pType){
            case 'input': 
                activeKanaGroup = kanaGroupKeyMap[pKeyCode];
                activeKanaKey = pKeyCode;
                charToInsert = activeKanaGroup[0];
                var _main = $('.kana-key').find('.main[data-keycode="'+pKeyCode+'"]'),
                    _buttonGroup = _main.parent();

                _buttonGroup.addClass('in-use');
                _main.addClass('in-use');
                
            break;

            case 'control': 
                var _pressedKey = keybindingDic.control.filter(function(pKeyBinding) {
                    return (parseInt(pKeyBinding.keyCode) === pKeyCode) ? true : false
                });

                if(_pressedKey.length > 0){
                    _pressedKey = _pressedKey[0];
                    var _highlight = false;
                    switch(_pressedKey.keyValue){
                        case 'top': 
                            charToInsert = activeKanaGroup[1];
                            _highlight = true;
                            break;
                        case 'right': 
                            charToInsert = activeKanaGroup[2];
                            _highlight = true;
                            break;
                        case 'bottom': 
                            charToInsert = activeKanaGroup[3];
                            _highlight = true;
                            break;
                        case 'left': 
                            charToInsert = activeKanaGroup[4];
                            _highlight = true;
                        break;
                    }
                    if(_highlight){
                        var _button = $('.kana-key').find('.'+_pressedKey.keyValue+'[data-keycode="'+activeKanaKey+'"]'),
                            _buttonGroup = _button.parent();

                        _buttonGroup.find('.in-use').removeClass('in-use');
                        _button.addClass('in-use');
                    }
                }
                
            break;
        }
    }

    function stopUseButton(pType, pKeyCode){
        switch(pType){
            case 'input': 
                var _buttonGroup = $('.kana-key').find('[data-keycode="'+pKeyCode+'"]').parent(); // wtf, TODO
                _buttonGroup.removeClass('in-use');
                _buttonGroup.find('.in-use').removeClass('in-use');

                if(charToInsert){
                    insert(charToInsert);
                    
                    charToInsert = null;
                    activeKanaKey = null;
                    activeKanaGroup = null;
                }else{

                }
            break;
            case 'control': 
                var _pressedKey = keybindingDic.control.filter(function(pKeyBinding) {
                    return (parseInt(pKeyBinding.keyCode) === pKeyCode) ? true : false
                });
                if(_pressedKey.length > 0){
                    _pressedKey = _pressedKey[0];
                    
                    if(['top', 'right', 'bottom', 'left'].indexOf(_pressedKey.keyValue) !== -1){
                        if(!activeKanaGroup){
                            break;
                        }
                        charToInsert = activeKanaGroup[0];

                        var _button = $('.kana-key').find('.main[data-keycode="'+activeKanaKey+'"]'),
                            _buttonGroup = _button.parent();
                        _buttonGroup.find('.in-use').removeClass('in-use');
                        _button.addClass('in-use');
                    }
                }
            break;
            case 'config': 
                var _pressedKey = keybindingDic.config.filter(function(pKeyBinding) {
                    return (parseInt(pKeyBinding.keyCode) === pKeyCode) ? true : false
                });
                if(_pressedKey.length > 0){
                    _pressedKey = _pressedKey[0];

                    switch(_pressedKey.keyValue){
                        case 'change_kana': 
                            activeKanaType = (activeKanaType === 'h') ? 'k' : 'h';
                            generateKeyBoard();
                        break;
                    }
                }
            break;
        }
    }

    function insert(pInsertChar){
        switch(pInsertChar.r){
            case 'daku': 
            case 'daku2': 
                var _cursorPos = input.prop('selectionStart');
                if(_cursorPos <= 0){
                    break;
                }
                var _char = input.val()[_cursorPos-1];
                
                for(var _r in kanaDic){
                    var _k = kanaDic[_r];
                    var _daku = (pInsertChar.r === 'daku2' && _k['daku2']) ? 'daku2' : 'daku';

                    if(_k[activeKanaType] === _char && _k[_daku] && kanaDic[_k[_daku]]){
                        deleteAtCursor(input[0]);
                        insertAtCursor(input[0], kanaDic[_k[_daku]][activeKanaType]);
                    }
                }
            break;
            case 'handaku': 
                var _cursorPos = input.prop('selectionStart');
                if(_cursorPos <= 0){
                    break;
                }
                var _char = input.val()[_cursorPos-1];
                
                for(var _r in kanaDic){
                    var _k = kanaDic[_r];
                    if(_k[activeKanaType] === _char && _k['handaku'] && kanaDic[_k['handaku']]){
                        deleteAtCursor(input[0]);
                        insertAtCursor(input[0], kanaDic[_k['handaku']][activeKanaType]);
                    }
                }
            break;
            default:
                insertAtCursor(input[0], pInsertChar[activeKanaType]);
        }
    }

    function insertAtCursor(myField, myValue) {
        //IE support
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
        }
        //MOZILLA and others
        else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                + myValue
                + myField.value.substring(endPos, myField.value.length);
            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length;
        } else {
            myField.value += myValue;
        }
    }

    function deleteAtCursor(myField) {
        if (myField.selectionStart > '0') {
            var startPos = myField.selectionStart - 1;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                + myField.value.substring(endPos, myField.value.length);
            myField.selectionStart = startPos;
            myField.selectionEnd = startPos;
        }
    }
})();
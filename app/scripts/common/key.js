import 'es6-promise'
import { getItem, setItem } from './storage';
const KEY_CTRL = 'Ctrl';
const KEY_SHIFT = 'Shift';
const KEY_ALT = 'Alt';
const PLUS   = ' + ';
const PREFIX = 'KEY_';

export function keyName2Key(keyName) {
  var key = {};
  if (typeof keyName !== 'string') {
    throw  new TypeError(keyName + ' is not a string');
  }
  keyName.replace(/\s+/, '').split('+').forEach(keyName => {
    if (/^[A-Z]$/.test(keyName)) {
      key.keyCode = keyName.charCodeAt(0);
      return;
    }
    switch (keyName) {
      case KEY_ALT:
        key.altKey = true;
        break;
      case KEY_SHIFT:
        key.shiftKey = true;
        break;
      case KEY_CTRL:
        key.ctrlKey = true;
        break;
    }
  });
  return key;
}

export function key2KeyName(key) {
  var keyArr = [];
  if (key.ctrlKey) {
    keyArr.push(KEY_CTRL, PLUS)
  }
  if (key.shiftKey) {
    keyArr.push(KEY_SHIFT, PLUS)
  }
  if (key.altKey) {
    keyArr.push(KEY_ALT, PLUS)
  }
  keyArr.push(String.fromCharCode(key.keyCode));
  console.log('key2keyName', keyArr);
  return keyArr.join('');
}

export function findKeyFromStorage(name) {
  return getItem(PREFIX + name).then(keyName => keyName2Key(keyName));
}

export function saveKey2Storage(name, key) {
  var keyName = key2KeyName(key);
  return setItem(PREFIX + name, keyName);
}

export function isTheKey(name, key) {
  return findKeyFromStorage(name).then(storedKey => {
    storedKey.ctrlKey = storedKey.ctrlKey || false;
    storedKey.shiftKey = storedKey.shiftKey || false;
    storedKey.altKey = storedKey.altKey || false;
    if(key && storedKey                 &&
      storedKey.keyCode === key.keyCode &&
      storedKey.ctrlKey === key.ctrlKey &&
      storedKey.altKey === key.altKey   &&
      storedKey.shiftKey === key.shiftKey) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  });
}

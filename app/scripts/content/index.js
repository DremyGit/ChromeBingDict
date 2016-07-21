import search from '../search'
import { isTheKey, saveKey2Storage, findKeyFromStorage, key2KeyName } from '../common/key'

function getSelectText() {
  var select = window.getSelection();
  if (select.type !== 'Range') {
    return '';
  }
  return select.toString();
}

function insertResult(result, text) {
  var select = window.getSelection();
  if (select.type !== 'Range') {
    return;
  }
  var rightNode = select.focusNode.splitText(select.focusOffset);
  var span = window.document.createElement('span');
  span.style.color = '#1db34f';
  span.setAttribute('class', 'chrome-dict');
  span.innerText = ' [ ' + result + ' ] ';
  if (text) {
    span.setAttribute('id', 'chrome-dict-' + text.replace(/\s+/, '-'));
  }
  span.ondblclick = function () {
    span.remove();
  };
  select.focusNode.parentNode.insertBefore(span, rightNode);
  return span;
}

function removeResult(span) {
  if (typeof span === 'object') {
    span.remove();
  } else if (typeof span === 'string') {
    var text = span;
    span = document.getElementById('chrome-dict-' + text.replace(/\s+/, '-'));
    span.parentNode.removeChild(span);
  }
}

function removeAllResult() {
  var elements = document.querySelectorAll('span.chrome-dict');
  for (let i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i]);
  }
}

window.addEventListener('keyup', e => {
  isTheKey('SHOW', e).then(() => {
    var text = getSelectText();
    var span = insertResult('Loading...');
    search(text).then(result => {
      removeResult(span);
      span = insertResult(result.result.join(', '), text)
    }).catch(err => {
      if (err === '未找到') {
        removeResult(span);
        span = insertResult(err);
        return
      }
      throw err
    });
  }).catch(function() {});
  isTheKey('CLEAN', e).then(() => {
      removeAllResult();
  }).catch(function() {});
});

findKeyFromStorage('SHOW').catch(() => {
  saveKey2Storage('SHOW', {keyCode: 86})
});
findKeyFromStorage('CLEAN').catch(() => {
  saveKey2Storage('CLEAN', {keyCode: 67})
});


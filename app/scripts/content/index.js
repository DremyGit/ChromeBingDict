import search from '../search'

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
  if (e.altKey) {
    if (e.keyCode === 70) {     // Press 'F'
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
    } else if (e.keyCode === 67) {  // Press 'C'
      removeAllResult();
    }
  }
});

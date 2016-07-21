import search from '../search'

function getSelectText() {
  var select = window.getSelection();
  if (select.type !== 'Range') {
    return '';
  }
  return select.toString();
}

function insertResult(text, result) {
  var select = window.getSelection();
  if (select.type !== 'Range') {
    return;
  }
  var rightNode = select.focusNode.splitText(select.focusOffset);
  var span = window.document.createElement('span');
  span.style.color = '#1db34f';
  span.setAttribute('class', 'chrome-dict');
  span.setAttribute('id', 'chrome-dict-' + text.replace('\s+', '-'));
  span.innerText = ' [ ' + result + ' ] ';
  span.ondblclick = function () {
    span.remove();
  };
  select.focusNode.parentNode.insertBefore(span, rightNode);
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
      search(text).then(result => {
        insertResult(text, result.result.join(', '))
      }).catch(err => {
        if (err === '未找到') {
          insertResult(err);
          return
        }
        throw err
      });
    } else if (e.keyCode === 67) {  // Press 'C'
      removeAllResult();
    }
  }
});

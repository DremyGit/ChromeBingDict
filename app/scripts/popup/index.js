import search from '../search'

var input = document.getElementById('text');

function buildResultHtml(result) {
  var html = '';
  Object.getOwnPropertyNames(result).forEach(key => {
    if (key !== 'result') {
      html += `<h3>${key}</h3><ul>`;
      result[key].forEach(item => {
        html += `<li>${item}</li>`
      });
      html += '</ul>';
    }
  });
  return html;
}

input.onkeydown = function (e) {
  if (e.keyCode === 13) {
    var word = input.value;
    search(word).then(res => {
      var html = buildResultHtml(res);
      document.getElementById('result').innerHTML = html;
    }).catch(err => {
      if (err === '未找到') {
        document.getElementById('result').innerHTML = '未找到';
        return
      }
      throw err
    })
  }
};


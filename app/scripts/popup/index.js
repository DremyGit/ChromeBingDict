import search from '../search'

var input = document.getElementById('text');

function buildResultHtml(result) {
  var html = '';
  Object.getOwnPropertyNames(result).forEach(key => {
    if (key !== 'result') {
      html += `<div class="card result"><h3>${key}：</h3><ol>`;
      result[key].forEach(item => {
        html += `<li>${item}</li>`
      });
      html += '</ol></div>';
    }
  });
  return html;
}

function buildStatusHtml(text) {
  var html = '';
  return '<div class="card" id="status">' + text + '</div>';
}


input.onkeydown = function (e) {
  if (e.keyCode === 13) {
    var resultDiv = document.getElementById('result');
    var word = input.value;
    resultDiv.innerHTML = buildStatusHtml('努力查找中...');
    search(word).then(res => {
      resultDiv.innerHTML = buildResultHtml(res);
    }).catch(err => {
      if (err === '未找到') {
        resultDiv.innerHTML = buildStatusHtml('未找到... 换个词试试 ^_^');
        return
      }
      throw err
    })
  }
};

document.getElementById('about').onclick = function about() {
  alert('开发: Dremy\n版本: 0.2.0');
}
document.getElementById('setting').onclick = function setting() {
  alert('快捷查询: 在页面上选中要查询的文字后, 按v键可将查询结果显示到文字后方, 按c键清空')
}


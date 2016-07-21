import 'es6-promise';
import search from '../search';
import { saveKey2Storage, findKeyFromStorage, key2KeyName, keyName2Key} from '../common/key';

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

function setStateHtml(text) {
  document.getElementById('result').innerHTML = '<div class="card" id="status">' + text + '</div>';
}


input.onkeydown = function (e) {
  if (e.keyCode === 13) {
    var word = input.value;
    setStateHtml("努力查找中...");
    search(word).then(res => {
      document.getElementById('result').innerHTML = buildResultHtml(res);
    }).catch(err => {
      if (err === '未找到') {
        setStateHtml('未找到... 换个词试试 ^_^')
        return
      }
      throw err
    })
  }
};

document.getElementById('about').onclick = function about() {
  setStateHtml('<ul><li>开发: Dremy</li><li>版本: v0.2.0</li></ul>');
};
document.getElementById('setting').onclick = function setting() {
  var settingHtml = '' +
    '<div class="input-group"><label>即时显示</label><input value="" readonly id="key-show" data-name="SHOW"></div><br>' +
    '<div class="input-group"><label>全部清除</label><input value="" readonly id="key-clean" data-name="CLEAN"></div>';
  setStateHtml(settingHtml);

  var keyShow = '';
  var keyClean = '';
  var inputShow, inputClean;
  Promise.all([
    findKeyFromStorage('SHOW').then(key2KeyName).then(keyName => keyShow = keyName),
    findKeyFromStorage('CLEAN').then(key2KeyName).then(keyName => keyClean = keyName)
  ]).then(() => {
    inputShow = document.getElementById('key-show');
    inputClean = document.getElementById('key-clean');
    inputShow.value = keyShow;
    inputClean.value = keyClean;
    inputShow.onclick = inputClean.onclick = function () {
      this.select();
    };
    inputShow.onkeydown = inputClean.onkeydown = function (e) {
      this.value = key2KeyName(e);
      this.select();
      if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57)) {
        saveKey2Storage(this.getAttribute('data-name'), e);
      }
    }
  });
};

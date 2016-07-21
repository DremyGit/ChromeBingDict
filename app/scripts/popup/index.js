import search from '../search'
!(function (undefined) {
  var input = document.getElementById('text');
  input.onkeydown = function (e) {
    if (e.keyCode === 13) {
      var word = input.value;
      search(word).then(res => {
        var string = '';
        Object.getOwnPropertyNames(res).forEach(key => {
          if (key !== 'result') {
            string += `<h3>${key}</h3><ul>`;
            res[key].forEach(item => {
              string += `<li>${item}</li>`
            });
            string += '</ul>';
          }
        });
        document.getElementById('result').innerHTML = string;
      }).catch(err => {
        if (err === '未找到') {
          document.getElementById('result').innerHTML = '未找到';
          return
        }
        throw err
      })
    }
  };
})();


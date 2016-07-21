import "es6-promise"
import "whatwg-fetch"

export function doSearch(word) {
  const url = `https://cn.bing.com/dict/search?mkt=zh-cn&q=${encodeURIComponent(word)}`;
  return fetch(url).then(res => res.text())
}

export default function (text) {
  return doSearch(text).then(html => {
    const description = parseDescription(html);
    if (isPhrase(description)) {
      return Promise.resolve(parsePhrase(description));
    } else {
      return Promise.reject("未找到");
    }
  });
}


export function parseDescription(html) {
  const descReg = /<meta name="description" content="([^"]+?)" \/>/;
  const desc = html.match(descReg)[1];
  return desc;
}

export function isPhrase(description) {
  return !!description && description.indexOf('释义') !== -1
}

export function parsePhrase(description) {
  const contentArr = description.split(/(释义|])，/);
  var arrLength = contentArr.length;
  const info = contentArr[arrLength - 1];

  function parseInfo(infoStr) {
    const partReg = /(.+?\.|网络释义：) (.*?)； /g;
    let part;
    const info = {};
    while (part = partReg.exec(infoStr)) {
      for (let i = 1; i < part.length; i++) {
        const key = part[1].replace(/\.|：/g, '');
        info[key] = part[2].split(/; |；/);
      }
    }
    return info;
  }

  const phrase = parseInfo(info);

  function merge(phrase) {
    var values = [];
    for (let key in phrase) {
      //values.push(phrase[key].map(x => x));
      phrase[key].map(x => values.push(x))
    }
    phrase.result = unique(values);
  }

  merge(phrase);
  return phrase;
}


export function unique(arr) {
  var Set = {};
  var newArr = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!Set[item]) {
      Set[item] = true;
      newArr.push(item);
    }
  }
  return newArr;
}


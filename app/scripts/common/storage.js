import 'es6-promise'

function isInExtension() {
  return window.location.href.indexOf('chrome-extension://') !== -1;
}
export function getItem(key) {
  return new Promise((resolve, reject) => {
    //if (!isInExtension()) {
      window.chrome.storage.sync.get(key,  res => {
        //resolve(JSON.parse(value));
        if (!res[key]) {
          reject();
        }
        console.log('Get', key, res[key]);
        resolve(res[key])
      });
    //} else {
    //  resolve(JSON.parse(window.localStorage.getItem(key)));
    //}
  })
}

export function setItem(key, value) {
  return new Promise((resolve, reject) => {
    //if (typeof value === 'object') {
    //  value = JSON.stringify(value);
    //}
    //if (!isInExtension()) {
      window.chrome.storage.sync.set({[key]: value}, function () {
        console.log('Save', key, value);
        resolve();
      });
    //} else {
    //  window.localStorage.setItem(key, value);
    //  resolve();
    //}
  })
}
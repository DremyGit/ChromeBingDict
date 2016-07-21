import 'es6-promise'

function isInExtension() {
  return window.location.href.indexOf('chrome-extension://') !== -1;
}
export function getItem(key) {
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.get(key,  res => {
      if (!res[key]) {
        reject();
      }
      resolve(res[key])
    });
  })
}

export function setItem(key, value) {
  return new Promise((resolve, reject) => {
      window.chrome.storage.sync.set({[key]: value}, function () {
        resolve();
      });
  })
}
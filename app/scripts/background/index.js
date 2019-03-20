chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      var url = `https://cn.bing.com/dict/search?mkt=zh-cn&q=${encodeURIComponent(request.word)}`
      fetch(url)
          .then(response => response.text())
          .then(text => sendResponse(text))
          .catch(error => sendResponse('未找到'))
      return true;  // Will respond asynchronously.
  }
);
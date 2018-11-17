function removeQueryParams(requestDetails) {
  const url = new URL(requestDetails.url);
  if(url.search.length === 0) return {};
  const trimmed = url.origin + url.pathname;
  return {
    redirectUrl: trimmed
  };
}

browser.webRequest.onBeforeRequest.addListener(
  removeQueryParams,
  {
    urls: ["*://www.aliexpress.com/item/*", "*://www.aliexpress.com/store/product/*"]
  },
  ["blocking"]
);

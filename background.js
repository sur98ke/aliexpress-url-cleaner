function removeQueryParams(requestDetails) {
    console.log("removeQueryParams");
  const url = requestDetails.url;

  const re_good = new RegExp(
    "^\\w+://\\w+\\.aliexpress\\.com/item/[^/?]+/\\d+\\.html$"
    );
  if (url.match(re_good)){
    return {};
    }

  const re_bad = new RegExp(
    "^(\\w+://\\w+\\.aliexpress\\.com)/.+[/_](\\d+)\\.html(?:\\?[^/]+)?$"
    );
  const res = re_bad.exec(url);
  if (res === null) {
    return {};
    }
  const protohost = res[1];
  const productID = res[2];
  const cleanurl = protohost + "/item/_/" + productID + ".html";
  return {
    redirectUrl: cleanurl
  };
}

browser.webRequest.onBeforeRequest.addListener(
  removeQueryParams,
  {
    urls: ["*://*.aliexpress.com/item/*", "*://*.aliexpress.com/store/product/*"]
  },
  ["blocking"]
);

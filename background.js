function removeQueryParams(requestDetails) {
    console.log("removeQueryParams");
  const url = requestDetails.url;

  const re_good_old = new RegExp(
    "^\\w+://\\w+\\.aliexpress\\.com/item/[^/?]+/\\d+\\.html$"
    );
  if (url.match(re_good_old)){
    return {};
    }

  const re_good_new = new RegExp(
    "^\\w+://\\w+\\.aliexpress\\.com/item/\\d+\\.html$"
    );
  if (url.match(re_good_new)){
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
  const cleanurl = protohost + "/item/" + productID + ".html";
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

const PROXY_USERNAME = "Your_Proxymesh_Username";
const PROXY_PASSWORD = "Your_Proxymesh_Password";

const config = {
  mode: "fixed_servers",
  rules: {
    singleProxy: {
      scheme: "http",
      host: "in.proxymesh.com", // Proxy server address
      port: parseInt(31280)      // Proxy port
    },
    bypassList: ["foobar.com"]
  }
};

chrome.proxy.settings.set({ value: config, scope: "regular" }, function() {});

chrome.webRequest.onAuthRequired.addListener(
  function(details) {
    return {
      authCredentials: {
        username: PROXY_USERNAME,
        password: PROXY_PASSWORD
      }
    };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

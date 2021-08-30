var files = [
    chrome.runtime.getURL("waext.js"),
    chrome.runtime.getURL("index.js")
];

files.forEach(e => {
    var el = document.createElement("script");
    el.src = e;
    (document.head || document.documentElement).appendChild(el);
});

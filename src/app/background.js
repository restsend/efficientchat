var rules = [/web.whatsapp.com/i, /wa\/whatsapp.html/i, /wa\/whatsapp_chat.html/i]

function hintUrlIsWhatspp(url) {
    for (let index = 0; index < rules.length; index++) {
        const element = rules[index];
        if (url.search(element) >= 0) {
            return true
        }
    }
    return false
}

chrome.webNavigation.onCompleted.addListener((tab) => {
    if (hintUrlIsWhatspp(tab.url)) {
        chrome.scripting.executeScript({
            target: {
                tabId: tab.tabId
            },
            files: ["content.js"],
        });
    }
});

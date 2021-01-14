chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection") {
        sendResponse({data: window.getSelection().toString()});
    }
    else {
        sendResponse({});
    }
});

// https://stackoverflow.com/questions/19164474/chrome-extension-get-selected-text
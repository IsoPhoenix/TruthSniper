chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
        let text = document.getElementById('text'); 
        text.innerHTML = response.data;
    });
});
// https://stackoverflow.com/questions/14349263/creating-a-chrome-extension-which-takes-highlighted-text-on-the-page-and-inserts#answer-14351458

// Add event listeners for popup buttons
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("snopes").addEventListener("click", snopes);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("politifact").addEventListener("click", politifact);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("google").addEventListener("click", google);
});

function google() {
    // Grab text in textarea
    let text = document.querySelector('#text').value;
    
    // Check if textarea empty
    if (text == '') {
        alert("No text submitted");
        return false;
    }
    
    // Remove linebreaks
    text = remove_linebreaks(text);

    // Produce URL encoded output
    let output = "";
    for (let i = 0; i < text.length; i++) {
        output += encode(text[i]);
    }

    // Open window with concatenated URL
    window.open("https://toolbox.google.com/factcheck/explorer/search/" + output + ";hl=en");
}

function snopes() {
    let text = document.querySelector('#text').value;
    if (text == '') {
        alert("No text submitted");
        return false;
    }

    text = remove_linebreaks(text);

    let split = text.split(" ");
    let output = "";
    split.forEach((element) => {
        for (let i = 0; i < element.length; i++) {
            output += encode(element[i])
        }
        output += "+" 
    })
    
    let final = output.slice(0, -1);
    window.open("https://www.snopes.com/?s=" + final);
}

function politifact() {
    let text = document.querySelector('#text').value;
    if (text == '') {
        alert("No text submitted");
        return false;
    }

    text = remove_linebreaks(text);
    
    let split = text.split(" ");
    let output = "";
    split.forEach((element) => {
        for (let i = 0; i < element.length; i++) {
            output += encode(element[i])
        }
        output += "+" 
    })
    
    let final = output.slice(0, -1);
    window.open("https://www.politifact.com/search/?q=" + final);
}

// Custom encoding function to address issues with native encodeURIComponent function
function encode(char) {
    if (char == "(") {
        return "%28";
    }
    else if (char == ")") {
        return "%29";
    }
    else if (char == "=") {
        return "%3D";
    }
    else {
        return encodeURIComponent(char);
    }
}

// Remove linebreaks from string and replaces with space
function remove_linebreaks(str) { 
    return str.replace(/[\r\n]+/gm, " "); 
} 
// https://www.geeksforgeeks.org/how-to-remove-all-line-breaks-from-a-string-using-javascript/
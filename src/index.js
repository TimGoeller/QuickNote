var ipcRenderer = require('electron').ipcRenderer;

document.getElementById("quit-application-button").addEventListener("click", function quitAppListener() {
    ipcRenderer.send('close-application');
})

document.getElementById("addNoteButton").addEventListener('click', function addNoteButtonListener() {
    ipcRenderer.send('open-notedit-window', null)
})
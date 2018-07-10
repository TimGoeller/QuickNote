var ipcRenderer = require('electron').ipcRenderer;

document.getElementById("quit-application-button").addEventListener("click", function quitAppButtonClickListener() {
    ipcRenderer.send('close-application')
})

document.getElementById("add-note-button").addEventListener('click', function addNoteButtonClickListener() {
    ipcRenderer.send('open-noteedit-window')
})

ipcRenderer.on('attach-new-note', function attachNewNoteIPC(event, arg) {
    let p = document.createElement("p")
    p.innerHTML = arg.title
    document.getElementById('note-display').appendChild(p)
})
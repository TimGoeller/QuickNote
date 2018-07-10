var ipcRenderer = require('electron').ipcRenderer;

document.getElementById("quit-application-button").addEventListener("click", function quitAppButtonClickListener() {
    ipcRenderer.send('close-application')
})

document.getElementById("add-note-button").addEventListener('click', function addNoteButtonClickListener() {
    ipcRenderer.send('open-noteedit-window')
})

ipcRenderer.on('attach-new-note', function attachNewNoteIPC(event, arg) {
    let noteEntryDiv = document.createElement("div")
    let noteTitleDiv = document.createElement('div')
    let noteOptionsDiv = document.createElement('div')
    let noteTitleParagraph = document.createElement('p')

    noteTitleParagraph.innerHTML = arg.title;
    noteEntryDiv.setAttribute('id', 'note-entry')
    noteTitleDiv.setAttribute('id', 'note-title')
    noteOptionsDiv.setAttribute('id', 'note-options')

    noteTitleDiv.appendChild(noteTitleParagraph);
    noteEntryDiv.appendChild(noteTitleDiv);
    noteEntryDiv.appendChild(noteOptionsDiv);

    document.getElementById('note-sidebar').appendChild(noteEntryDiv)
})
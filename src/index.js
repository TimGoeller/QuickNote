var ipcRenderer = require('electron').ipcRenderer;
var Mousetrap = require('mousetrap');

document.getElementById("quit-application-button").addEventListener("click", function quitAppButtonClickListener() {
    ipcRenderer.send('close-application')
})

document.getElementById("add-note-button").addEventListener('click', function addNoteButtonClickListener() {
    ipcRenderer.send('open-noteedit-window')
})

ipcRenderer.on('attach-new-note', function attachNewNoteIPC(event, arg) {
    let noteEntryDiv = document.createElement("div")
    let noteTitleDiv = document.createElement('div')
    let noteTitleParagraph = document.createElement('p')

    noteTitleParagraph.innerHTML = arg.title;
    noteEntryDiv.setAttribute('id', 'note-entry')
    noteTitleDiv.setAttribute('id', 'note-title')

    noteTitleDiv.appendChild(noteTitleParagraph);
    noteEntryDiv.appendChild(noteTitleDiv);

    noteEntryDiv.addEventListener('click', function loadNote() {
        let loadedNoteTitle = document.getElementById('note-display-title').querySelector('h1');
        let noteDisplayContent = document.getElementById('note-display-content').querySelector('p');

        loadedNoteTitle.innerHTML = arg.title;
        noteDisplayContent.innerHTML = arg.text;
    })

    document.getElementById('note-sidebar').appendChild(noteEntryDiv)
})

Mousetrap.bind(['command+alt+d', 'ctrl+alt+d'], () => {
     ipcRenderer.send('open-dev-tools', 'main-window') 
})

document.getElementById('edit-button').addEventListener('click', function openEditWindow() {
    /*alert('Test');*/
})
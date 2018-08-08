let ipcRenderer = require('electron').ipcRenderer;
var Mousetrap = require('mousetrap');

document.getElementById('close-button').addEventListener('click', function closeButtonClickListener() {
    ipcRenderer.send('close-noteedit-window')
})

document.getElementById('save-button').addEventListener('click', function saveButtonClickListener() {
    let titleInput = document.getElementById('note-title').querySelector('#note-title-input')
    let noteContentArea = document.getElementById('note-content').querySelector('#note-content-textarea')
    let note = {
        title: titleInput.value,
        text: noteContentArea.value
    }
    ipcRenderer.send('store-note', note)
})

Mousetrap.bind(['command+alt+d', 'ctrl+alt+d'], () => {
    ipcRenderer.send('open-dev-tools', 'add-note-window') 
})

ipcRenderer.on('initialize-with-note', function initializeWithNoteIPC(event, note) {
    document.getElementById('note-title').querySelector('#note-title-input').value = note.title
    document.getElementById('note-content').querySelector('#note-content-textarea').value = note.text
})
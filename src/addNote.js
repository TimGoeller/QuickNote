let ipcRenderer = require('electron').ipcRenderer;

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
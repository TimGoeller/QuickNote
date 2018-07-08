const remote = require('electron').remote;
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow

document.getElementById("quit-application-button").addEventListener("click", function quitAppListener() {
    remote.getCurrentWindow().close();
})

document.getElementById("addNoteButton").addEventListener('click', function addNoteButtonListener() {
    //var addNoteWindow = window.open("addNote.html");
    var win = new BrowserWindow({ parent:remote.getCurrentWindow(), modal: true, width: 350, height: 500 , frame: false});
    win.on('close', function() {win = null});
    
    win.loadURL('file://' + __dirname + '/addNote.html');
    win.isResizable = false;
    win.show();
    //win.openDevTools();
})
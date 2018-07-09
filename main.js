const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const shell = require('electron').shell

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600, frame:false})
  
    // and load the index.html of the app.
    win.loadFile('src/index.html')
  
    // Open the DevTools.
    //win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })

  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here

  var noteManager = (function noteManagerIIFE() {
      var storedNotes = new Map();

      function Note(title, text, creationDate) {
        this.title = title;
        this.text = text;
        this.creationDate = creationDate;
        this.id;
      }

      function storeNewNote(note) {
        note.id = obtainHighestIDFromNotes() + 1;
        storedNotes.set(note.id, note);

        return note.id;
      }

      function obtainHighestIDFromNotes() {
        let highestID = 0;

        for (var id of storedNotes.keys()) {
          if(id > highestID) {
            highestID = id;
          }
        }

        return highestID;
      }
    
      return {
        Note: Note,
        storeNewNote: storeNewNote
      }

  })();

  let createNoteWin

  function createNoteEditWindow() {
    createNoteWin = new BrowserWindow({ parent:win, modal: true, width: 350, height: 500 , frame: false, show: false})
    createNoteWin.on('close', function() {win = null})
    createNoteWin.loadFile('src/addNote.html')
    createNoteWin.isResizable = false
  }

  ipcMain.on('close-application', function closeApplicationIPC(event, arg) {  
    win.close()     
  })

  ipcMain.on('open-noteedit-window', function newNoteWindowIPC(event, arg) {  
    if(createNoteWin === undefined) {
      createNoteEditWindow()
    }
    if(arg === null) {
      createNoteWin.show()
    } 
  })

  ipcMain.on('close-note')

  
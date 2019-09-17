const {app, BrowserWindow, dialog, shell} = require('electron')
const path = require("path");

app.showExitPrompt = true

let win;

function createWindow () {  
win = new BrowserWindow({width: 800, height: 600})
win.setMenu(null)
const url = `file://${path.join(__dirname, '../build/index.html')}`
console.log(url)
// win.loadURL(url)
  win.loadURL('http://localhost:3000/')

win.on('close', (e) => {
        if (app.showExitPrompt) {
            e.preventDefault()
            dialog.showMessageBox({
                type: 'question',
                defaultId: 2,
                buttons: ['Yes', 'No'],
                title: 'Confirm',
                message: 'Are you sure you want to quit?'
            }, function (response) {
                if (response === 0) {
                    app.showExitPrompt = false

                    // shell.openExternal('notepad.exe')
                    win.close()
                }
            })
        }
    })
}

app.on('ready', createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
  });

app.on("activate", () => {
if (win === null) {    
    createWindow();
}

});

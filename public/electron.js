const { app, BrowserWindow, dialog, shell } = require('electron')
const path = require("path");

app.showExitPrompt = true

let win;
let loading;
function createLoading() {
    loading = new BrowserWindow({
        width: 500, height: 300, parent: null,
      
        icon: path.join(__dirname, '../build/logo.png'),
        modal: true, 
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    })

    loading.setMenu(null);
    const url = `file://${path.join(__dirname, '../build/loading.html')}`
    loading.loadURL(url)
    // loading.webContents.openDevTools()

    loading.on('close', (e) => {
        createWindow();
    })
}

function createWindow() {
    win = new BrowserWindow({
        width: 800, height: 600, parent: null,
        icon: path.join(__dirname, '../build/logo.png'),
        modal: true, webPreferences: {
            nodeIntegration: true
        }
    })

    win.setMenu(null)
    // win.webContents.openDevTools()

    const url = `file://${path.join(__dirname, '../build/index.html')}`    
    win.loadURL(url)
    // win.loadURL('http://localhost:3000/')

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

                    //  shell.openExternal('notepad.exe')

                    win.close()
                }
            })
        }
    })
}

app.on('ready', () => {
        createLoading();
        setTimeout(()=>{
            loading.close();
            loading=null;
    }, 5000)

});

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

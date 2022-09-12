const {app, BrowserWindow, ipcMain, ipcRenderer} = require('electron');
const Authentification = require('./bin/Module/Authentification')
app.whenReady().then(() => createWindow())

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 575,
        height: 708,
        resizable: false,
        transparent: true,
        center: false,
        frame: false,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadFile('bin/Render/index.html');
    Authentification.setWindow(win)


    setTimeout(async () => {
        win.send('receive', 'Application.Ready')
    }, 2500)

}


ipcMain.on("execute", async (event, data) => {
    if(data === "Authentification.GetAccount") Authentification.GetAccount();
    if(data === "Authentification.OpenLogin") Authentification.OpenLogin();
})



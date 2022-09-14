const {app, BrowserWindow, ipcMain, ipcRenderer} = require('electron');
const Authentification = require("./Module/Authentification");
const Caching = require("./Module/Caching");

let mangas;
exports.start = () => {
    app.whenReady().then(() => createWindow())
}

const createWindow = async () => {

    const win = new BrowserWindow({
        width: 500,
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
    Caching.setWindow(win)

    Caching.loadImages(); // Download image from servers

    setTimeout(async () => {
        win.send('receive', 'Application.Ready')
    }, 1500)

}

ipcMain.on("execute", async (event, data) => {
    if(data === "Authentification.GetAccount") Authentification.GetAccount();
    if(data === "Authentification.OpenLogin") Authentification.OpenLogin();
    if(data === "Caching.GetCatalogs") Caching.GetCatalogs();
})

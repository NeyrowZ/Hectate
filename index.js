const {app, BrowserWindow, ipcMain, ipcRenderer} = require('electron');
const open = require('open');

const createWindow = () => {
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

    win.loadFile('bin/render/index.html');
}
ipcMain.on("btn_openlink_login", async (event, type) => {
    open('https://accounts.google.com/o/oauth2/v2/auth?client_id=38861859963-d6nei5cmat3vb1ltkgmq7phnn3qnhdrs.apps.googleusercontent.com&response_type=code&scope=email%20profile&redirect_uri=https://api.hugochilemme.com&access_type=offline&prompt=consent')
})



app.whenReady().then(() => {
    createWindow();
})
const open = require('open');
const {app, BrowserWindow, ipcMain, ipcRenderer} = require('electron');


let Authentification = {
    status: true,
    profile: {
        pseudo: "Axios.js",
        uuid: "657d71fe-554e-43d9-bbb7-2420b92739a6",
        avatar: "https://cdn.discordapp.com/avatars/270604640536625153/547a5b491a63e2fbe6f8201ae7c40067.webp"
    },
    reading_list: [
        {manga_uuid: "f78c884e-f657-47bc-88f6-af57ad43c526", chapter: 920, page: 2},
        {manga_uuid: "bbaf88df-d92b-40e6-8ee6-e56a742563c2", chapter:1200, page: 2},
        {manga_uuid: "2a46ded0-c1fb-4c84-a69b-6a6250d6ae5b", chapter: 38, page: 2},
    ]
}

let browseApp;
exports.setWindow = (window) => {
    browseApp = window
    console.log("bin/Module/Authentification.js")
}


exports.GetAccount = function () {
    browseApp.send('receive', 'Authentification.GetAccount', Authentification)
}
exports.OpenLogin = function () {
    open('https://accounts.google.com/o/oauth2/v2/auth?client_id=38861859963-d6nei5cmat3vb1ltkgmq7phnn3qnhdrs.apps.googleusercontent.com&response_type=code&scope=email%20profile&redirect_uri=https://api.hugochilemme.com&access_type=offline&prompt=consent')
}

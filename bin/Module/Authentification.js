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
        {
            name: "One Piece",
            image: "http://pm1.narvii.com/6538/ab1e252b9b45b9e1bb64a2a60a3d5dc3250357ec_00.jpg",
            manga_uuid: "f78c884e-f657-47bc-88f6-af57ad43c526",
            resume: {
                chapter: 512,
                page: 5
            },
            chapter_available: 1200,
            new_release: false,
            next_release: "2022-06-16",
            pre_download: true,

        },
        {
            name: "Naruto",
            image: "http://ekladata.com/XpaCa4uZX_yUUTOTSNpoSf6sf5c@550x413.jpg",
            manga_uuid: "bbaf88df-d92b-40e6-8ee6-e56a742563c2",
            resume: {
                chapter: 1050,
                page: 1
            },
            chapter_available: 1500,
            new_release: true,
            pre_download: false,
        },
        {
            name: "Dragon Ball",
            image: "https://img-31.ccm2.net/T8_e--_W4hryEUQ8D8WAksy4sFs=/910x/smart/f4dca47766374ab683aced205bbb6531/ccmcms-hugo/20294519.jpg",
            manga_uuid: "2a46ded0-c1fb-4c84-a69b-6a6250d6ae5b",
            resume: {
                chapter: 1,
                page: 1
            },
            chapter_available: 42,
            new_release: true,
            pre_download: false,
        },
        {
            name: "Demon Slayer",
            image: "https://demonslayer.fr/wp-content/uploads/2021/09/Tanjiro.jpeg",
            manga_uuid: "2a46ded0-c1fb-4c84-a69b-6a6250d6ae5b",
            resume: {
                chapter: 23,
                page: 1
            },
            chapter_available: 23,
            new_release: true,
            pre_download: false,
        }
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

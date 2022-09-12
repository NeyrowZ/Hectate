const {app, BrowserWindow, ipcMain, ipcRenderer} = require('electron');

const mangasList = [
    {
        name: "One Piece",
        image: "https://pm1.narvii.com/6538/ab1e252b9b45b9e1bb64a2a60a3d5dc3250357ec_00.jpg",
        manga_uuid: "f78c884e-f657-47bc-88f6-af57ad43c526",
        resume: {
            chapter: 512,
            page: 5
        },
        description: "L'histoire de One Piece se déroule dans un monde océanique où des pirates aspirent à une ère de liberté et d'aventure connue sous le nom de « l'âge d'or de la piraterie ». Cette époque fut inaugurée par l'exécution de Gol D. Roger, le légendaire Roi des Pirates, à Loguetown, sa ville natale.",
        chapter_available: 1200,
        new_release: false,
        next_release: "2022-06-16",
        pre_download: true,

    },
    {
        name: "Naruto",
        image: "https://ekladata.com/XpaCa4uZX_yUUTOTSNpoSf6sf5c@550x413.jpg",
        manga_uuid: "bbaf88df-d92b-40e6-8ee6-e56a742563c2",
        resume: {
            chapter: 1050,
            page: 1
        },
        description: "Naruto est un garçon qui vit dans le village de Konoha. Il rêve de devenir Hokage (un grand chef qui protège son village et qui est très puissant). Mais il est détesté de tout le monde, car il a un démon scellé en lui: le démon renard à neuf queues (Kyubi).",
        chapter_available: 1500,
        new_release: true,
        pre_download: false,
    },
    {
        name: "Dragon Ball",
        image: "https://www.global-esports.news/wp-content/uploads/2022/07/Fortnite-Could-Be-Getting-a-Dragon-Ball-Z.jpg",
        manga_uuid: "2a46ded0-c1fb-4c84-a69b-6a6250d6ae5b",
        resume: {
            chapter: 1,
            page: 1
        },
        description: "L'histoire de Dragon Ball suit la vie de Son Goku, un garçon à la queue de singe inspiré du conte traditionnel chinois La Pérégrination vers l'Ouest. Son Goku est un jeune garçon simple d'esprit et pur doté d'une queue de singe et d'une force extraordinaire.",
        chapter_available: 42,
        new_release: true,
        pre_download: false,
    },
    {
        name: "Demon Slayer",
        image: "https://demonslayer.fr/wp-content/uploads/2021/09/Tanjiro.jpeg",
        manga_uuid: "2b46ded0-c1fb-4c84-a69b-6a6250d6ae5b",
        resume: {
            chapter: 23,
            page: 1
        },
        description: "Le Japon, au début du XXe siecle. Un petit marchand de charbon nommé Tanjiro vit une vie sans histoire dans les montagnes. Jusqu'au jour tragique où, après une courte absence, il retrouve son village et sa famille massacrés par un ogre ! La seule survivante de cette tragédie est sa jeune sœur Nezuko.",
        chapter_available: 23,
        new_release: true,
        pre_download: false,
    }
];
let mangas = {};

const download = require('image-downloader');

let browseApp;
exports.setWindow = (window) => {
    browseApp = window
    console.log("bin/Module/Caching.js")
}



let index = 0;
const loadImages = () => {
    if(index < mangasList.length) {
        const element = mangasList[index];
        const options = {
            url: element.image,
            dest: process.cwd() + "\\bin\\Render\\Caching\\Catalog\\"+element.manga_uuid+".png",               // will be saved to /path/to/dest/image.jpg
        };
        download.image(options)
            .then(({ filename }) => {
                mangasList[index].image = "Caching\\Catalog\\" + element.manga_uuid +".png";
                console.log( mangasList[index].image); // saved to /path/to/dest/image.jpg

                mangas[element.manga_uuid] = element;
                index+=1;
                loadImages()
            })
            .catch((err) => console.error(err));

    }
}
exports.GetCatalogs = () => {
    browseApp.send('receive', 'Caching.GetCatalogs', mangas)
}
exports.loadImages = loadImages;

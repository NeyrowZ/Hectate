const doc = document;
const {ipcRenderer} = require('electron');
let mangas;

const MessageSend = (type) => {
    ipcRenderer.send("execute", type)
}
ipcRenderer.send("execute", "Caching.GetCatalogs");
ipcRenderer.on('receive', async (event, type, data) => {
    if (type === "Authentification.GetAccount") return Authentification_GetAccount(data);
    if (type === "Application.Ready") return onReady();
    if(type === "Caching.GetCatalogs") return mangas = data;
})

const onReady = () => {
    ipcRenderer.send("execute", "Authentification.GetAccount");
}
onReady()

let loaded = false;
const load_interface_account = (account) => {
    if (loaded) return;
    loaded = true;
    doc.querySelectorAll('[data="account-pseudo"]').forEach((e) => e.innerText = account.profile.pseudo);
    doc.querySelectorAll('[data="account-avatar"]').forEach((e) => e.setAttribute('src', account.profile.avatar));

    doc.querySelector('[list="reading_list"]').innerHTML.length = 0;

    for (let i = 0; i < account.reading_list.length; i++) {
        const element = account.reading_list[i];
        const manga = mangas[element.manga_uuid];
        if (element.chapter !== manga.chapter_available) {
            let div = doc.createElement('div');
            div.classList.add('item');
            let div_image = doc.createElement('div');
            let div_image_img = doc.createElement('img');

            let div_text = doc.createElement('div');
            let div_text_h5 = doc.createElement('h5');
            let div_text_p = doc.createElement('p');

            let div_progression = doc.createElement('div');
            div_progression.classList.add('progression');
            let div_progression_text = doc.createElement('p');
            div_progression_text.innerHTML = (100 / manga.chapter_available * element.chapter).toFixed(0) + "% <span>terminé</span>";

            div_progression.appendChild(div_progression_text);

            div_image_img.setAttribute('src', manga.image);
            div_text_h5.innerText = manga.name;
            div_text_p.innerHTML = `Reprendre Chapitre ${element.chapter}`;
            div_text.appendChild(div_text_h5);
            div_text.appendChild(div_text_p);
            div_image.appendChild(div_image_img);
            div.appendChild(div_image);
            div.appendChild(div_text);
            div.appendChild(div_progression);
            div.addEventListener('click', () => {
                view_manga(manga.manga_uuid);
            })


            doc.querySelector('[list="reading_list"]').appendChild(div);
        }

    }


}


const imagePresentation = [
    'https://media.discordapp.net/attachments/993956704519729262/1018617024072658974/06720e6d14ec776c55302795c174df5a.jpg',
    'https://images5.alphacoders.com/606/606284.jpg',
    'https://media.discordapp.net/attachments/993956704519729262/1018625033658187848/0651a3b374e740a52a89a16761502746.jpg'
]
const doc = document;
const {ipcRenderer} = require('electron');

const MessageSend = (type) => {
    ipcRenderer.send("execute", type)
}

ipcRenderer.on('receive', async (event, type, data) => {
    if(type === "Authentification.GetAccount") return Authentification_GetAccount(data);
    if(type === "Application.Ready") return onReady();
})

let DateDiff = {

    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return Math.floor((t2-t1)/(24*3600*1000));
    },

    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    },

    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}
const onReady = () => {
    ipcRenderer.send("execute", "Authentification.GetAccount");
}
onReady()

let loaded = false;
const load_interface_account = (account) => {
    if(loaded) return;
    loaded = true;
    doc.querySelectorAll('[data="account-pseudo"]').forEach((e) => e.innerText = account.profile.pseudo);
    doc.querySelectorAll('[data="account-avatar"]').forEach((e) => e.setAttribute('src', account.profile.avatar));

    doc.querySelector('[list="reading_list"]').innerHTML.length = 0;
    doc.querySelector('[list="next_list"]').innerHTML.length = 0;


    for(let i = 0; i < account.reading_list.length; i++) {
        const element = account.reading_list[i];

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
        div_progression_text.innerHTML = (100 / element.chapter_available * element.resume.chapter).toFixed(0)+"% <span>terminé</span>";

        div_progression.appendChild(div_progression_text);

        div_image_img.setAttribute('src', element.image);
        div_text_h5.innerText = element.name;
        div_text_p.innerHTML = `Reprendre Chapitre ${element.resume.chapter}`;
        div_text.appendChild(div_text_h5);
        div_text.appendChild(div_text_p);
        div_image.appendChild(div_image_img);
        div.appendChild(div_image);
        div.appendChild(div_text);
        div.appendChild(div_progression);

        doc.querySelector('[list="reading_list"]').appendChild(div);

    }


    for(let i = 0; i < account.reading_list.length; i++) {
        const element = account.reading_list[i];
        if(element.next_release) {
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
            div_progression_text.innerHTML = `Vendredi`;

            div_progression.appendChild(div_progression_text);

            div_image_img.setAttribute('src', element.image);
            div_text_h5.innerText = element.name;
            console.log(new Date(element.new_release))
            div_text_p.innerHTML = `Chapitre ${element.chapter_available+1}`;
            div_text.appendChild(div_text_h5);
            div_text.appendChild(div_text_p);
            div_image.appendChild(div_image_img);
            div.appendChild(div_image);
            div.appendChild(div_text);
            div.appendChild(div_progression);

            doc.querySelector('[list="next_list"]').appendChild(div);
        }

    }

}


const imagePresentation = [
    'https://media.discordapp.net/attachments/993956704519729262/1018617024072658974/06720e6d14ec776c55302795c174df5a.jpg',
    'https://images5.alphacoders.com/606/606284.jpg',
    'https://media.discordapp.net/attachments/993956704519729262/1018625033658187848/0651a3b374e740a52a89a16761502746.jpg'
]
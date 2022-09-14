let cfi = new ColorsfromImage({});

const view_manga = (uuid) => {
    const element = mangas[uuid];

    doc.querySelector('.viewManga').classList.remove('hide');
    doc.querySelector('.viewManga .main img').setAttribute('src', element.image);
    doc.querySelector('.reader').setAttribute('target-manga', element.manga_uuid);

    doc.querySelector('.viewManga h2').innerText = element.name;
    doc.querySelector('.viewManga .chapters').innerText = `${element.chapter_available} chapitres disponible`;
    doc.querySelector('.viewManga .description').innerText = element.description;
    if(reading_list[uuid]) doc.querySelector('.viewManga .btn.resume').innerText = "Reprendre";
    else doc.querySelector('.viewManga .btn.resume').innerText = "Commencer";


    cfi.getColors(element.image, function (data) {
        const highPresenceColor = data.highPresenceColor;
        doc.querySelector('.viewManga .btn.resume').style.background = highPresenceColor;
    }, function (msg) {
       console.error(msg)
    });
}

doc.querySelector('.viewManga').addEventListener('click', (e) => {
    if (e.target.classList.contains('voile'))
        doc.querySelector('.viewManga').classList.add('hide');

})



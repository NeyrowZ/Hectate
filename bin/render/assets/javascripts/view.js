const view_manga = (uuid) => {
    const element = mangas[uuid];

    doc.querySelector('.viewManga').classList.remove('hide');
    doc.querySelector('.viewManga .main img').setAttribute('src', element.image);


    doc.querySelector('.viewManga h2').innerText = element.name;
    doc.querySelector('.viewManga .chapters').innerText = `${element.chapter_available} chapitres disponible`;
    doc.querySelector('.viewManga .description').innerText = element.description;


}
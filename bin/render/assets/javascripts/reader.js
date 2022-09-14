let prc = 0;
doc.querySelector('.viewManga .btn.resume').addEventListener('click', () => {

    const uuid = doc.querySelector('.reader').getAttribute('target-manga');
    if (!uuid) return;
    if(!mangas[uuid]) return;

    doc.querySelector('.reader .main').style.transform = "translateY(50%)";
    doc.querySelector('.reader .loading').style.height = "300px";

    doc.querySelector('.reader').classList.remove('hide');
    doc.querySelector('.viewManga').classList.add('hide');
    doc.querySelector('.reader .log').innerText = "Hécate n'héberge aucun contenu";
    if(reading_list[uuid])
        doc.querySelector('.reader .title').innerText = mangas[uuid].name + " • Chapitre " + reading_list[uuid].chapter;
    else
        doc.querySelector('.reader .title').innerText = mangas[uuid].name + " • Chapitre 1";
    doc.querySelector('.reader .loading img').setAttribute('src', mangas[uuid].image);

    if (!doc.querySelector('.search').classList.contains('hide'))
        displaySearchMenu()

    setTimeout(() => {
        prc = 0
        doc.querySelector('.reader .log').innerText = "Préparation du contenu";
        fakeLoad();
    }, 2500)

})

doc.querySelector('.reader').addEventListener('click', (e) => {
    if (e.target.classList.contains('voile')) {
        doc.querySelector('.reader').classList.add('hide');
        console.log('--> Cancel load image')
        // CANCEL LOAD IMAGE
    }

})


const fakeLoad = () => {
    if(100 < prc) {
        doc.querySelector('.reader .main').style.transform = "translateY(7.5%)";
        doc.querySelector('.reader .loading').style.height = "625px";
        doc.querySelector('.reader .log').innerText = "Bonne lecture";


        return;
    }
    prc += Math.random() * (2 - 0.005) + 0.005;
    doc.querySelector('.reader .log').innerText = prc.toFixed(2)+"% ";
    setTimeout(() => fakeLoad(), 50)

}


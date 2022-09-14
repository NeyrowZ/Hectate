let search_menu = false;

doc.querySelectorAll('[action="btn_opensearch"]').forEach((e) => {
    e.addEventListener('click', () => {
        displaySearchMenu()
    })

});

doc.querySelector('[action="btn_closesearch"]').addEventListener('click', () => {
    if(doc.querySelector('.search input').value.trim().length > 0) {
        doc.querySelector('.search input').value = "";
        doc.querySelector('.search .main').style.transform = "translateY(50%)";
        doc.querySelector(".search .result").style.display = "none";
        doc.querySelector(".search .filter").style.display = "inherit";
        return;
    }
    return displaySearchMenu()
})


function checkInternet(cb) {
    require('dns').lookup('google.com', function (err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}


let ratelimit_search = null;
const displaySearchMenu = async () => {
    search_menu = !search_menu;
    if(ratelimit_search && ratelimit_search > new Date().getTime()) return;
    ratelimit_search = new Date().getTime() + 500;

    if (!search_menu) {
        doc.querySelector('.search').classList.add('hide');
        resetSelectedTags()
        return
    }

    doc.querySelector('.search .noInternet').classList.add('hide')
    checkInternet(function (isConnected) {

        doc.querySelector('.search').classList.remove('hide');
        if (!isConnected) {
            doc.querySelector('.search .main').style.transform = "translateY(80%)";
            return doc.querySelector('.search .noInternet').classList.remove('hide')
        }
        doc.querySelector('.search input').value = "";
        doc.querySelector('.search .main').style.transform = "translateY(50%)";
        doc.querySelector(".search .result").style.display = "none";
        doc.querySelector(".search .filter").style.display = "inherit";
        setTimeout(async () => {
            doc.querySelector('.search input').focus();
        }, 250)
    });


}
const resetSelectedTags = () => {
    doc.querySelectorAll('.search .tags span').forEach((span) => {
        span.classList.remove('selected');
    });
}


doc.querySelector('.search input').addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if(query.length < 2) {
        doc.querySelector('.search .main').style.transform = "translateY(50%)";
        doc.querySelector(".search .result").style.display = "none";
        return doc.querySelector(".search .filter").style.display = "inherit";
    }

    doc.querySelector('.search .main').style.transform = "translateY(30%)";

    doc.querySelector(".search .filter").style.display = "none";
    doc.querySelector(".search .result").style.display = "flex";
    doc.querySelector(".search .result").innerHTML = '<div class="error">Nous avons rien trouvé</div>';

    let results = 0;
    for (const [key, value] of Object.entries(mangas)) {
        if(value.name.toLowerCase().includes(query.toLowerCase())) {
            let div = doc.createElement('div');
            div.classList.add('item');
            let div_icon = doc.createElement('div');
            let div_icon_img = doc.createElement('img');
            div_icon_img.setAttribute('src', value.image);
            div_icon.appendChild(div_icon_img);
            let div_text = doc.createElement('div');
            let div_text_h2 = doc.createElement('h2');
            div_text_h2.innerText = value.name;
            let div_text_p = doc.createElement('p');
            div_text_p.innerText = `${value.chapter_available} chapitres`;
            div_text.appendChild(div_text_h2)
            div_text.appendChild(div_text_p)

            let div_click = doc.createElement('div');
            let div_click_icon = doc.createElement('i');
            div_click_icon.classList.add('bx')
            div_click_icon.classList.add('bx-right-arrow-alt')
            div_click.appendChild(div_click_icon);
            div.appendChild(div_icon)
            div.appendChild(div_text)
            div.appendChild(div_click)

            div.addEventListener('click', () => {
                view_manga(value.manga_uuid);
            })
            results+=1;
            doc.querySelector(".search .result").appendChild(div);
        }
    }
    if(results > 0) {
        doc.querySelector(".search .result .error").remove();
    }

})


doc.querySelector('.search').addEventListener('click', (e) => {
    if (e.target.classList.contains('voile'))
        displaySearchMenu()

})


doc.querySelectorAll('.search .tags span').forEach((e) => {
    e.addEventListener('click', () => {


        if(e.classList.contains('selected')) {
            resetSelectedTags();
            doc.querySelector('.search .main').style.transform = "translateY(50%)";
            return
        }

        resetSelectedTags();
        e.classList.add('selected');
        doc.querySelector('.search .main').style.transform = "translateY(10%)";
    })
})

doc.querySelectorAll('[list="manga_more_views"] span').forEach((e) => {
    e.addEventListener('click', () => {
        const uuid = e.getAttribute('uuid');
        if(!mangas[uuid]) return;
        view_manga(uuid);
    })
})
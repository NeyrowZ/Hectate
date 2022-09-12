let search_menu = false;

doc.querySelectorAll('[action="btn_opensearch"]').forEach((e) => {
    e.addEventListener('click', () => {
        displaySearchMenu()
    })

});


function checkInternet(cb) {
    require('dns').lookup('google.com', function (err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}


const displaySearchMenu = async () => {
    search_menu = !search_menu;
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
        doc.querySelector('.search .main').style.transform = "translateY(55%)";
        setTimeout(async () => {
            doc.querySelector('.search input').focus();
        }, 500)
    });


}
const resetSelectedTags = () => {
    doc.querySelectorAll('.search .tags span').forEach((span) => {
        span.classList.remove('selected');
    });
}


doc.querySelector('.search').addEventListener('click', (e) => {
    if (e.target.classList.contains('voile'))
        displaySearchMenu()

})


doc.querySelectorAll('.search .tags span').forEach((e) => {
    e.addEventListener('click', () => {
        resetSelectedTags();
        e.classList.add('selected');

        doc.querySelector('.search .main').style.transform = "translateY(10%)";
    })
})
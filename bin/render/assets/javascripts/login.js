const btn_login = doc.querySelector('.btn-login-about');
const login_menu_main = doc.querySelector('.login_main');

let presentation_display = false;
btn_login.addEventListener('click', () => {
    presentation_display = !presentation_display;

    btn_login.style.opacity = 0;
    login_menu_main.style.marginTop = presentation_display ? "-113.5%" : "0";
    if(presentation_display) btn_login.classList.add('inverse');
    else btn_login.classList.remove('inverse');

    setTimeout(() => {
        btn_login.style.opacity = 1;
        btn_login.innerText = presentation_display ? "Revenir à la connexion" : "Découvrir les fonctionnalités";
    }, 150)

});

doc.querySelectorAll('.btn_openlink_login').forEach((element) => {
    element.addEventListener('click', () => {
        console.log('send')
        ipcRenderer.send("btn_openlink_login", true);
    })
})


const setImage = imagePresentation[Math.floor(Math.random() * (imagePresentation.length - 0)) + 0];
doc.querySelector('.login .head').style.background = `linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),url(${setImage})no-repeat`;
doc.querySelector('.login .head').style.backgroundSize = "cover";
doc.querySelector('.login .head').style.backgroundPosition = "center center";
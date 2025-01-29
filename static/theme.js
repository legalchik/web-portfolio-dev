function themeDark() {
    window.materialPrimaryColor = 0x00ff88;
    window.materialSecondaryColor = 0xff941a; 
    window.particlesAnimate = true;
}

function themeLight() {
    window.materialPrimaryColor = 0xffffff;
    window.materialSecondaryColor = 0xff941a;
    window.particlesAnimate = false;
}

function theme() {
    let select_theme = localStorage.getItem('theme');
    const element = document.body;
    if (select_theme=="light") {
        localStorage.setItem("theme", 'dark');
        element.classList.replace("light", "dark");
        themeDark();
    } else if (select_theme=="dark") {
        localStorage.setItem("theme", 'light')
        element.classList.replace("dark", "light");
        themeLight();
    }
}


const themeSwitcher = document.querySelector('.theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
  theme()
});


// theme initialization 
const storageTheme = localStorage.getItem('theme');
if (!storageTheme) {
    console.log("Init theme.js")
    document.body.classList.add("dark")
    localStorage.setItem("theme", 'dark')
    themeDark()
} else {
    if (storageTheme=="dark") {
        document.body.classList.add("dark");
        themeDark();
    } else if (storageTheme=="light") {
        document.body.classList.add("light");
        themeLight();
    }
}

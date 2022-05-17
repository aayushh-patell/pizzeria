const overlay = document.getElementById("overlay");

const openModal = document.getElementById('open-modal');
const preferencesModal = document.getElementById('preferences-modal');

const acceptCookies = document.getElementById('open-accept');
const managePreferences = document.getElementById('open-preferences');

const savePreferences = document.getElementById('preferences-save');

const widthCookie = document.getElementById('width-cookie');
const heightCookie = document.getElementById('height-cookie');
const browserCookie = document.getElementById('browser-cookie');
const osCookie = document.getElementById('os-cookie');

function getCookie(name) {
    let cookieName = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    let regex = new RegExp(`(?:^|;)\\s?${cookieName}=(.*?)(?:;|$)`, 'i');
    let match = document.cookie.match(regex);
    return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        sameSite: 'lax',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let cookies = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
        cookies += '; ' + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            cookies += '=' + optionValue;
        }
    }

    document.cookie = cookies;
}

function deleteCookie(name) {
    setCookie(name, '', {
        'max-age': -1
    });
}

function saveCookies(widthCookie, heightCookie, browserCookie, osCookie){
    widthCookie ? setCookie('Width', window.innerWidth) : deleteCookie('Width');
    heightCookie ? setCookie('Height', window.innerHeight) : deleteCookie('Height');
    browserCookie ? setCookie('Browser', navigator.userAgent) : deleteCookie('Browser');
    osCookie ? setCookie('OS', navigator.userAgent) : deleteCookie('OS');

    if (!(widthCookie || heightCookie || browserCookie || osCookie)) {
        setCookie('rejected', true, {expires: new Date(Date.now() + 15 * 1000)});
    } else {
        deleteCookie('rejected');
    }

    console.log(document.cookie);
}

if (navigator.cookieEnabled && !document.cookie) {
    setTimeout(() => {
        openModal.style.display = "block";
        overlay.style.display = "grid";
    }, 2000);
}

acceptCookies.addEventListener('click', () => {
    openModal.style.display = "none";
    overlay.style.display = "none";
    saveCookies(true, true, true, true);
});

savePreferences.addEventListener('click', () => {
    preferencesModal.style.display = "none";
    overlay.style.display = "none";
    saveCookies(widthCookie.checked, heightCookie.checked, browserCookie.checked, osCookie.checked);
});

managePreferences.addEventListener('click', () => {
    openModal.style.display = "none";
    preferencesModal.style.display = "block";
});
import { showToast } from "./toast.js";

export const devMode = false

const dsName = "bumer32"

document.getElementById("discord-button-input").addEventListener("click", function(event) {
    event.preventDefault();

    navigator.clipboard.writeText(dsName);
    showToast("Copied to clipboard");
})

const login_info = document.getElementById("login-info")

function getAllCookies() {
    const cookiesString = document.cookie;
    const cookiesArray = cookiesString.split("; ");
    const cookies = {};
    
    cookiesArray.forEach(cookie => {
        const [key, value] = cookie.split("=");
        cookies[key] = decodeURIComponent(value);
    });
    
    return cookies;
}

const cookies = getAllCookies()

if (cookies["username"]) {
    login_info.innerText = `Username: ${cookies["username"]}`
}

login_info.addEventListener("click", function(event) {
    const cookies = document.cookie.split("; ");
    cookies.forEach(cookie => {
        const [name, _] = cookie.split("=");
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    });
    location.reload()
})

import { showToast, showErrorToast } from "../toast.js";

const url = "https://api.lumivoid.pp.ua/login";

const loader = document.getElementById("loader");

const email = document.getElementById("email");
const password = document.getElementById("password");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById("login-button-input").addEventListener("click", function(event) {
    event.preventDefault();

    if (email.value == "") {
        showErrorToast("Enter email!");
        return;
    }
    if (password.value == "") {
        showErrorToast("Enter password!");
        return;
    }

    loader.hidden = false

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(response => {
        console.log(response.status);
        if (response.status == 200) {
            loader.hidden = true;
            return response.text();
        } else if (response.status == 401) {
            showErrorToast("Wrong password!");
        } else if (response.status == 404) {
            showErrorToast("Not found!");
        }
        loader.hidden = true;
    })
    .then(async text => {
        const data = JSON.parse(text)
        showToast(`Hello ${data.username}`)

        const cookies = document.cookie.split("; ");
    
        cookies.forEach(cookie => {
            const [name, _] = cookie.split("=");
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        });
    
        document.cookie = `username = ${data.username}`
        document.cookie = `password = ${data.password}`

        await sleep(2500)

        location.reload()
    })
    .catch(error => {
        console.error("Error:", error);
        showErrorToast(error);
        loader.hidden = true;
    });
});

email.addEventListener("input", function(event) {
    email.value = email.value.replace(" ", "");
});

password.addEventListener("input", function(event) {
    password.value = password.value.replace(" ", "");
});

    
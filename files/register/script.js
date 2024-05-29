import { showToast, showErrorToast } from "../toast.js";

const url = "https://api.lumivoid.pp.ua/registerUser";

const loader = document.getElementById("loader");

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("register-button-input").addEventListener("click", function(event) {
    event.preventDefault();

    if (username.value == "") {
        showErrorToast("Enter username!");
        return;
    }
    if (email.value == "") {
        showErrorToast("Enter email!");
        return;
    }
    if (password.value == "") {
        showErrorToast("Enter password!");
        return;
    }

    loader.hidden = false;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
        })
    })
    .then(response => {
        console.log(response.status);
        if (response.status == 200) {
            showToast("Check your email!");
        } else if (response.status == 409) {
            showErrorToast("Account with same username or email already exists!");
        } else if (response.status == 400) {
            showErrorToast("Wrong email!");
        }
        loader.hidden = true;
    })
    .catch(error => {
        console.error("Error:", error);
        showErrorToast(error);
        loader.hidden = true;
    });
});

username.addEventListener("input", function(event) {
    username.value = username.value.replace(" ", "");
});

email.addEventListener("input", function(event) {
    email.value = email.value.replace(" ", "");
});

password.addEventListener("input", function(event) {
    password.value = password.value.replace(" ", "");
});

    
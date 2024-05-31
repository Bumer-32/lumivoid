import { showErrorToast, showToast } from "../toast.js";
import { devMode } from "../base.js";

const eyeLeft = document.getElementById("eyeLeft");
const eyeRight = document.getElementById("eyeRight");
const ballLeft = document.getElementById("ballLeft");
const ballRight = document.getElementById("ballRight");

let eyeLeftCoordX = eyeLeft.offsetLeft;
let eyeLeftCoordY = eyeLeft.offsetTop;
let eyeLeftCalcX = eyeLeft.getBoundingClientRect().left + 150;
let eyeLeftCalcY = eyeLeft.getBoundingClientRect().top + 150;

let eyeRightCoordX = eyeRight.offsetLeft;
let eyeRightCoordY = eyeRight.offsetTop;
let eyeRightCalcX = eyeRight.getBoundingClientRect().left + 150;
let eyeRightCalcY = eyeRight.getBoundingClientRect().top + 150;

let timeOutFunctionId;

ballLeft.style.transform = `translate(${75}px, ${75}px)`;
ballRight.style.transform = `translate(${75}px, ${75}px)`;

let isMobile;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log("Mobile detected!");
    isMobile = true;
} else {
    console.log("Computer detected!");
    isMobile == false;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//check for confirm
const params = new URLSearchParams(document.location.search)
let url = "https://api.lumivoid.pp.ua/confirm";
if (devMode) {
    url = "http://localhost:8080/confirm"
}

if (params.size != 0) {
    console.log("params finded");

    const registrationKey = params.get("confirmCode")
    if (registrationKey != null) {
        console.log("confirm code finded! ");
        console.log("tring to confirm account");

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                registrationKey: registrationKey
            })
        })
        .then(async response => {
            console.log(response.status);
            if (response.status == 200) {
                showToast("Succesful confirm!")
                await sleep(2500)
                showToast("Redirecting")
                await sleep(1000)
                window.location.replace("/")
            } else if (response.status == 404) {
                showErrorToast("Confirm failed!")
            }
        })
        .catch(error => {
            console.log(error);
            showErrorToast(error)
        })
    }
}


document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    //Left ball
    let ballLeftNewCoordX;
    let ballLeftNewCoordY;

    if ((mouseX-eyeLeftCalcX)**2 + (mouseY-eyeLeftCalcY)**2 <= 70**2) {
        ballLeftNewCoordX = mouseX - 150;
        ballLeftNewCoordY = mouseY - 150;
    } else {
        const leftAngle = Math.atan2(mouseY-eyeLeftCalcY, mouseX-eyeLeftCalcX);
        ballLeftNewCoordX = Math.round(eyeLeftCoordX + Math.cos(leftAngle) * 70);
        ballLeftNewCoordY = Math.round(eyeLeftCoordY + Math.sin(leftAngle) * 70);
    }
    ballLeft.style.left = ballLeftNewCoordX + "px";
    ballLeft.style.top = ballLeftNewCoordY + "px";

    //Right ball
    let ballRightNewCoordX;
    let ballRightNewCoordY;

    if ((mouseX-eyeRightCalcX)**2 + (mouseY-eyeRightCalcY)**2 <= 70**2) {
        ballRightNewCoordX = mouseX - 150;
        ballRightNewCoordY = mouseY - 150;
    } else {
        const rightAngle = Math.atan2(mouseY-eyeRightCalcY, mouseX-eyeRightCalcX);
        ballRightNewCoordX = Math.round(eyeRightCoordX + Math.cos(rightAngle) * 70);
        ballRightNewCoordY = Math.round(eyeRightCoordY + Math.sin(rightAngle) * 70);
    }
    ballRight.style.left = ballRightNewCoordX + "px";
    ballRight.style.top = ballRightNewCoordY + "px";
})


window.addEventListener("resize", (event) => {
    clearTimeout(timeOutFunctionId);

    timeOutFunctionId = window.setTimeout(() => {
        eyeLeftCoordX = eyeLeft.offsetLeft;
        eyeLeftCoordY = eyeLeft.offsetTop;
        eyeLeftCalcX = eyeLeft.getBoundingClientRect().left + 150;
        eyeLeftCalcY = eyeLeft.getBoundingClientRect().top + 150;

        eyeRightCoordX = eyeRight.offsetLeft;
        eyeRightCoordY = eyeRight.offsetTop;
        eyeRightCalcX = eyeRight.getBoundingClientRect().left + 150;
        eyeRightCalcY = eyeRight.getBoundingClientRect().top + 150;
    });
})
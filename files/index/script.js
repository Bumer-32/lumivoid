const eyeLeft = document.getElementById("eyeLeft")
const eyeRight = document.getElementById("eyeRight")
const ballLeft = document.getElementById("ballLeft")
const ballRight = document.getElementById("ballRight")

let eyeLeftCoordX = eyeLeft.offsetLeft
let eyeLeftCoordY = eyeLeft.offsetTop
let eyeLeftCalcX = eyeLeft.getBoundingClientRect().left + 150
let eyeLeftCalcY = eyeLeft.getBoundingClientRect().top + 150

let eyeRightCoordX = eyeRight.offsetLeft
let eyeRightCoordY = eyeRight.offsetTop
let eyeRightCalcX = eyeRight.getBoundingClientRect().left + 150
let eyeRightCalcY = eyeRight.getBoundingClientRect().top + 150

let timeOutFunctionId

ballLeft.style.transform = `translate(${75}px, ${75}px)`
ballRight.style.transform = `translate(${75}px, ${75}px)`


document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX
    const mouseY = event.clientY

    //Left ball
    let ballLeftNewCoordX
    let ballLeftNewCoordY

    if ((mouseX-eyeLeftCalcX)**2 + (mouseY-eyeLeftCalcY)**2 <= 70**2) {
        ballLeftNewCoordX = mouseX - 150
        ballLeftNewCoordY = mouseY - 150
    } else {
        const leftAngle = Math.atan2(mouseY-eyeLeftCalcY, mouseX-eyeLeftCalcX)
        ballLeftNewCoordX = Math.round(eyeLeftCoordX + Math.cos(leftAngle) * 70)
        ballLeftNewCoordY = Math.round(eyeLeftCoordY + Math.sin(leftAngle) * 70)
    }
    ballLeft.style.left = ballLeftNewCoordX + "px"
    ballLeft.style.top = ballLeftNewCoordY + "px"

    //Right ball
    let ballRightNewCoordX
    let ballRightNewCoordY

    if ((mouseX-eyeRightCalcX)**2 + (mouseY-eyeRightCalcY)**2 <= 70**2) {
        ballRightNewCoordX = mouseX - 150
        ballRightNewCoordY = mouseY - 150
    } else {
        const rightAngle = Math.atan2(mouseY-eyeRightCalcY, mouseX-eyeRightCalcX)
        ballRightNewCoordX = Math.round(eyeRightCoordX + Math.cos(rightAngle) * 70)
        ballRightNewCoordY = Math.round(eyeRightCoordY + Math.sin(rightAngle) * 70)
    }
    ballRight.style.left = ballRightNewCoordX + "px"
    ballRight.style.top = ballRightNewCoordY + "px"
})

window.addEventListener("resize", (event) => {
    clearTimeout(timeOutFunctionId)

    timeOutFunctionId = window.setTimeout(() => {
        eyeLeftCoordX = eyeLeft.offsetLeft
        eyeLeftCoordY = eyeLeft.offsetTop
        eyeLeftCalcX = eyeLeft.getBoundingClientRect().left + 150
        eyeLeftCalcY = eyeLeft.getBoundingClientRect().top + 150

        eyeRightCoordX = eyeRight.offsetLeft
        eyeRightCoordY = eyeRight.offsetTop
        eyeRightCalcX = eyeRight.getBoundingClientRect().left + 150
        eyeRightCalcY = eyeRight.getBoundingClientRect().top + 150
    })
})
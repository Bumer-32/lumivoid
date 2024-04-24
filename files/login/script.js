const dsName = "bumer32"

function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000);
}

function ds() {
    navigator.clipboard.writeText(dsName)
    showToast("Copied to clipboard")
}
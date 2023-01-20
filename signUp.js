document.querySelector(".sign-in-container-enter").addEventListener("click", createAccount)
function createAccount() {
    var usernameInp = document.querySelector(".sign-up-container-username-input").value
    if (usernameInp != "") {
        localStorage.setItem("username", usernameInp)
        window.open("index.html", "_self")
    }
}
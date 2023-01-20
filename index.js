var username = localStorage.getItem("username") || false

function checkIfAccountMade() {
    if (username != false) {
        //this means they have an account.
        document.querySelector(".continue-button").textContent = "Continue as " + username
        document.querySelector(".continue-button").addEventListener("click", function() {
            window.open("chatPage.html", "_self")
        })
    }
    else {
        //removes the continue button when there is nothing to continue
        document.querySelector(".continue-button").remove()
    }
}
window.onload = function() {
    checkIfAccountMade()
}
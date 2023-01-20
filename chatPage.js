const firebaseConfig = {
    apiKey: "AIzaSyAEx_E2P8t7H8T2hZLprLIool78GhBLF-o",
    authDomain: "chatin-4fd00.firebaseapp.com",
    databaseURL: "https://chatin-4fd00-default-rtdb.firebaseio.com",
    projectId: "chatin-4fd00",
    storageBucket: "chatin-4fd00.appspot.com",
    messagingSenderId: "904224484953",
    appId: "1:904224484953:web:f98afb06e479f8e24bcb48",
    measurementId: "G-0QQWCH3GRX"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database()

var messageList = {
    name: "",
    timeInDate: "",
    timeInTime: "",
    text: ""
}

document.querySelector(".message-send").addEventListener("click", sendMessage)
function sendMessage() {
    messageList.name = localStorage.getItem("username")

    var today = new Date();
    var date = today.toLocaleDateString();
    messageList.timeInDate = date.split("/").reverse().join("-");

    var today = new Date();
    var time = today.toLocaleTimeString();
    messageList.timeInTime = time.slice(0,5)

    messageList.text = document.querySelector(".message-input").value

    console.log(messageList)
    db.ref("messages").push(messageList)
    document.querySelector(".message-input").value = ""
}

function createMessage(name, timeDate, timeTime, text) {
    var messageOuter = document.createElement("div")
    messageOuter.classList.add("chat-message")

    document.querySelector(".chat-background").appendChild(messageOuter)

    var messageName = document.createElement("div")
    messageName.classList.add("chat-message-name")
    messageName.textContent = name

    var messageTime = document.createElement("div")
    messageTime.classList.add("chat-message-time")
    messageTime.textContent = "( " + timeDate + " ) " + "( " + timeTime + " )"

    var br = document.createElement("br")

    var messageText = document.createElement("div")
    messageText.classList.add("chat-message-text")
    messageText.textContent = text

    messageOuter.appendChild(messageName)
    messageOuter.appendChild(messageTime)
    messageOuter.appendChild(br)
    messageOuter.appendChild(messageText)
}


window.onload = function() {
    db.ref("messages").on("value", function(snapshot) {
        document.querySelector(".chat-background").innerHTML = "" // Clear the chat-background div
        snapshot.forEach(function(childSnapshot) {
          var message = childSnapshot.val();
          createMessage(message.name, message.timeInDate, message.timeInTime, message.text)
        });
    });
    setTimeout(()=>{
        var lastMessage = document.querySelector(".chat-background").lastElementChild;
        lastMessage.scrollIntoView();
    },500)
}

document.querySelector(".message-input").addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        sendMessage()
    }
})
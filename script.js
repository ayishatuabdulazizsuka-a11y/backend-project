// Get the Send Money button
const sendButton = document.getElementById("sendMoneyBtn");

// Get the Send Money form
const sendForm = document.getElementById("sendForm");
let currentBalance = 100;
    const balanceDisplay = document.getElementById("balance");
//when the button is clicked 
const transactionList = document.getElementById("transactionList");
function addTransaction(type, person, amount,balance) {
    if (transactionList.children.length === 1 && transactionList.firstElementChild.textContent === "No transaction yet.") {
        transactionList.replaceChildren();
    }
    const transaction = document.createElement("li");
    const date = new Date();
    const transactionDate = date.toLocaleDateString();
    const transactionTime = date.toLocaleTimeString();
    transaction.textContent = type + "| " + person + " | GHS " + amount.toFixed(2) + " | Balance: GHS " + balance.toFixed(2) + "\nDate: " + transactionDate + "\nTime: " + transactionTime;
    transactionList.prepend(transaction);
} 
sendButton.addEventListener("click", function() {
    sendForm.style.display = "block";
});
//Get receive money button
const receiveButton =document.getElementById("receiveMoneyBtn");
const receiveForm = document.getElementById("receiveForm");
// Display Receive Money form when clicked
receiveButton.addEventListener("click", function() {
    receiveForm.style.display = "block";
})
    const receiveMoneyForm = document.getElementById("receiveMoneyForm");
receiveMoneyForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const sender = document.getElementById("senderName").value.trim();
    const phone = document.getElementById("senderPhone").value.trim();
    const amountInput = document.getElementById("receiveAmount").value;
    const amount = Number(amountInput);
    const receiveMessage = document.getElementById("receiveMessage");

    if (sender === "" || phone === "" || amountInput === "") {
        alert("Please fill in all fields.");
        return;
    }
    if (!/^\d{10}$/.test(phone)) {
        alert("Enter a valid 10-digit phone number.");
        return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Enter a valid amount.");
        return;
    }
    currentBalance += amount;
    balanceDisplay.textContent = "GHS " + currentBalance.toFixed(2);
    addTransaction("Received", sender, amount, currentBalance);
     receiveMessage.textContent = "RECEIVE MONEY RECIEPT\n" + "sender: " + sender + "\n" + "Phone Number: " + phone + "\n" + "Amount Recieved: GHS " + amount.toFixed(2) + "\n" + "New Balance: GHS" + currentBalance.toFixed(2) + "\n" + "Status: SIMULATED";

});


const moneyForm = document.getElementById("moneyForm");
moneyForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name =document.getElementById("recipientName").value;
    const phone = document.getElementById("phoneNumber").value;
    const amount = document.getElementById("amount").value;
    console.log(name);
    console.log(phone);
    console.log(amount);
    if(name === "" || phone === "" || amount === "") {
        alert("Please fill in all fields.");
        return;
    }
    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter valid 10-digit phone number.");
        return;
    }
    if (Number(amount) <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    const message = document.getElementById("message");

    message.textContent = "TRANSACTION RECEIPT" + "\nRecipient: " + name + "\nPhone Number: " + phone + "\nAmount: GHS " + Number(amount).toFixed(2) + "\nStatus: DEMO SUCCESSFUL";
    if (Number(amount) <= 0) {
        alert("please enter a valid amount");
        return;
    }
    if (Number(amount) > currentBalance) {
        alert("Insufficient balance!");
        return;
    }
    currentBalance -= Number(amount);
    console.log("New balance:", currentBalance);
    balanceDisplay.textContent = "GHS " + currentBalance.toFixed(2);
    addTransaction("Sent", name, Number(amount), currentBalance);
   
});
// Get Transaction History elements
const historyButton = document.getElementById("historyBtn");
const historySection = document.getElementById("historySection");
//Display Transaction History
historyButton.addEventListener("click", function() {
    if (historySection.style.display === "none") {
        historySection.style.display = "block";
    } else {
        historySection.style.display = "none";
    }
});
 function clearHistory() {
  
    const answer = confirm("Are you sure you want to clear your transaction history?");
    if (answer) {
        const list = document.getElementById("transactionList");
        list.innerHTML = "<li>No transactions yet.</li>";
    }
}
const clearBtn = document.getElementById("clearHistoryBtn");
clearBtn.addEventListener("click", clearHistory);
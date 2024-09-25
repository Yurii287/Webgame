// TODO:
// change the way that elements are gotten so that they only activate once the page is fully loaded 
//      and only load on the page that they are related too
//          just use if statements to see what page is loaded in html
// Add way of checking if account already exists
// Add way to delete account

// User Data
let userData = [];

// Leaderboard Page Elements
const leaderboardEl = document.getElementById("leaderboard-el");

// Create an Account Elements
const accountUsernameEL = document.getElementById("accountUsername-el");
const accountPasswordEl = document.getElementById("accountPassword-el");
const accountPasswordCheckEl = document.getElementById("accountPasswordCheck-el");
const accountInputBtn = document.getElementById("accountInput-btn");
// Homepage Elements

// Login Page Elements
const loginUsernameEl = document.getElementById("loginUsername-el");
const loginPasswordEl = document.getElementById("loginPassword-el");
const loginInputBtn = document.getElementById("login-btn");

// Create an Account Functions
accountInputBtn.addEventListener("click", function() {
    if (accountPasswordEl.value != accountPasswordCheckEl.value) {
        console.log("Error: Passwords do not match.");
        return false;
    }
    else if (typeof accountUsernameEL.value === "string" && accountUsernameEL.value.length === 0) {
        console.log("Error: Please enter a username.");
    }
    else if (typeof accountPasswordEl.value === "string" && accountPasswordEl.value.length === 0) {
        console.log("Error: Please enter a password.");
    }
    else {
        console.log("Account Created");
        createUserAccount(accountUsernameEL.value, accountPasswordEl.value)
    }
    accountUsernameEL.value = "";
    accountPasswordEl.value = "";
    accountPasswordCheckEl.value = "";
})

function createUserAccount(username, password) {
    userData.push([username, password, 0]);
    localStorage.setItem("userData",JSON.stringify(userData));
}

// Login Page Functions
loginInputBtn.addEventListener("click", function() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = JSON.parse(localStorage.getItem(key));
        console.log(item[0][0]);
    }

})

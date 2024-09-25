// TODO:
// change the way that elements are gotten so that they only activate once the page is fully loaded
// Add way of checking if account already exists
// Add way to delete account

// User Data
let userData = [];

// Leaderboard Page Elements
const leaderboardEl = document.getElementById("leaderboard-el");

// Create an Account Elements
const usernameAccountEL = document.getElementById("usernameAccount-el");
const passwordAccountEl = document.getElementById("passwordAccount-el");
const passwordCheckAccountEl = document.getElementById("passwordCheckAccount-el");
const inputButtonAccountEl = document.getElementById("inputButtonAccount-el");
// Homepage Elements

// Login Page Elements

// Create an Account Functions
inputButtonAccountEl.addEventListener("click", function() {
    if (passwordAccountEl.value != passwordCheckAccountEl.value) {
        console.log("Error: Passwords do not match.");
        return false;
    }
    else if (typeof usernameAccountEL.value === "string" && usernameAccountEL.value.length === 0) {
        console.log("Error: Please enter a username.");
    }
    else if (typeof passwordAccountEl.value === "string" && passwordAccountEl.value.length === 0) {
        console.log("Error: Please enter a password.");
    }
    else {
        console.log("Account Created");
        createUserAccount(usernameAccountEL.value, passwordAccountEl.value)
    }
    usernameAccountEL.value = "";
    passwordAccountEl.value = "";
    passwordCheckAccountEl.value = "";
})

function createUserAccount(username, password) {
    userData.push([username, password, 0]);
    localStorage.setItem("userData",JSON.stringify(userData));
}

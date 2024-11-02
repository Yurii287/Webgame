import {errorInputAnimation, errorInputBorder, setDefaultColour, setSuccessColour} from './utilModules/animationUtil.js';
import {loggedInUser, setLoggedInUser, getLoggedInUser, saveLoggedInUser, checkLoggedIn, setUserData} from './utilModules/userUtil.js';

const loginUsernameDiv = document.getElementById("username-input-box");
const loginPasswordDiv = document.getElementById("password-input-box");

const loginUsernameEl = document.getElementById("loginUsername-el");
const loginPasswordEl = document.getElementById("loginPassword-el");
const loginInputBtn = document.getElementById("login-btn");
let loginMessage = document.getElementById("accountMessage");

let loginInputElements = [loginUsernameDiv, loginPasswordDiv];

setLoggedInUser();
setUserData();
checkLoggedIn();

// Login Page Functions
loginInputBtn.addEventListener("click", function () {

// set input element default colours
loginInputElements.forEach((element) => setDefaultColour(element));

// Check if any accounts have been made
if (localStorage.length === 0) {
    loginMessage.innerHTML = "Error: No Accounts Created";
    loginUsernameDiv.style.borderBottom = errorInputBorder;
    loginUsernameDiv.animate(errorInputAnimation, 200);

    loginPasswordDiv.style.borderBottom = errorInputBorder;
    loginPasswordDiv.animate(errorInputAnimation, 200);  
}
else if (getLoggedInUser() != null) {
    loginMessage.innerHTML = "Error: Already Logged in as different User";
    loginUsernameDiv.style.borderBottom = errorInputBorder;
    loginUsernameDiv.animate(errorInputAnimation, 200);

    loginPasswordDiv.style.borderBottom = errorInputBorder;
    loginPasswordDiv.animate(errorInputAnimation, 200);  
}
// If there are accounts, iterate through to check what username and password matches
else {
    for (let i = 0; i < JSON.parse(localStorage.getItem("userData")).length; i++) {
        
    let item = JSON.parse(localStorage.getItem("userData"));
    console.log(item[i]);
    // check username
    if (loginUsernameEl.value === item[i].username) {
        // check password
        if (loginPasswordEl.value === item[i].password) {
        loginMessage.innerHTML = "Logging in user";
        loginMessage.style.color = "rgb(23, 228, 40)"
        // set input element success colours
        loginInputElements.forEach((element) => setSuccessColour(element));
        // set the logged in user
        saveLoggedInUser(item[i].username);
        sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        location.reload();
        break;
        } 
        //password doesn't match
        else if (loginPasswordEl.value != item[i].password) {
        loginMessage.innerHTML = "Error: Account with that password does not exist";
        loginPasswordDiv.style.borderBottom = errorInputBorder;
        loginPasswordDiv.animate(errorInputAnimation, 200);
        }
    }
    // username doesn't match
    else if (loginUsernameEl.value != item[i].username) {
        loginMessage.innerHTML = "Error: Account with that username does not exist";
        loginUsernameDiv.style.borderBottom = errorInputBorder;
        loginUsernameDiv.animate(errorInputAnimation, 200);
    }
    }
}
// Clearing the input
loginUsernameEl.value = "";
loginPasswordEl.value = "";
});
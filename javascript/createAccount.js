import {errorInputAnimation, errorInputBorder, setDefaultColour, setSuccessColour} from './utilModules/animationUtil.js';
import {userData, getUserData, setUserData, saveUserData,User, accountUsernameTest, accountPasswordTest, accountEmailTest, accountPhoneTest, checkLoggedIn, setLoggedInUser} from "./utilModules/userUtil.js";

// HTML elements
const accountUsernameDiv = document.getElementById("username-input-box");
const accountPasswordDiv = document.getElementById("password-input-box");
const accountEmailDiv = document.getElementById("email-input-box");
const accountPhoneDiv = document.getElementById("phone-input-box");
const accountMessage = document.getElementById("accountMessage");
const accountInputElements = [accountUsernameDiv, accountPasswordDiv, accountEmailDiv, accountPhoneDiv];

/* HTML inputs */
const accountUsernameEl = document.getElementById("accountUsername-el");
const accountPasswordEl = document.getElementById("accountPassword-el");
const accountEmailEl = document.getElementById("accountEmail");
const accountPhoneEl = document.getElementById("accountNumber");
const accountInputBtn = document.getElementById("accountInput-btn");

setUserData();
setLoggedInUser();
checkLoggedIn();

accountInputBtn.addEventListener("click", function () {

    // set input element default colours
    accountInputElements.forEach((element) => setDefaultColour(element));

    // Check if username already exists
    let accountCheck = checkUserDetails(accountUsernameEl.value);

    // check if username is valid 
    if (accountUsernameTest.test(accountUsernameEl.value) == false){
        accountMessage.innerHTML = "Error: Please enter a valid username";
        accountUsernameDiv.style.borderBottom = errorInputBorder;
        accountUsernameDiv.animate(errorInputAnimation, 200);
    }
    // check if email is valid
    else if (accountEmailTest.test(accountEmailEl.value) == false) {
        console.log(accountEmailTest.test(accountEmailEl.value));
        accountMessage.innerHTML = "Error: Please enter a valid email";
        accountEmailDiv.style.borderBottom = errorInputBorder;
        accountEmailDiv.animate(errorInputAnimation, 200);
    }
    // check if password is valid
    else if (accountPasswordTest.test(accountPasswordEl.value) == false) {
        accountMessage.innerHTML = "Error: Please enter a valid password";
        accountPasswordDiv.style.borderBottom = errorInputBorder;
        accountPasswordDiv.animate(errorInputAnimation, 200);
    }
    // check if phone number is valid
    else if (accountPhoneTest.test(accountPhoneEl.value) == false) {
        accountMessage.innerHTML = "Error: Please enter a valid phone number";
        accountPhoneDiv.style.borderBottom = errorInputBorder;
        accountPhoneDiv.animate(errorInputAnimation, 200);
    }
    // true if all information is valid
    else if (accountCheck === true) {
        saveUserData(accountUsernameEl.value, accountPasswordEl.value, accountEmailEl.value, accountPhoneEl.value);
        console.log(localStorage.length);
        accountMessage.innerHTML = "Account created";
        accountMessage.style.color = "rgb(23, 228, 40)";
        accountInputElements.forEach((element) => setSuccessColour(element));
    }
    // check if username exists
    else if (accountCheck === false) {
        accountMessage.innerHTML = "Error: Account with that username already exists";
        accountUsernameDiv.style.borderBottom = errorInputBorder;
        accountUsernameDiv.animate(errorInputAnimation, 200);
    }
});

// function to check if input username already exists
function checkUserDetails(username) {
    if (localStorage.length === 0) {
      return true;
    }
    else {
      for (let i = 0; i < JSON.parse(localStorage.getItem("userData")).length; i++) {
        let item = JSON.parse(localStorage.getItem("userData"));
        console.log(item);
        if (username === item[i].username) {
          return false;
        }
        else {
            return true;
        }
      }
    }
  }
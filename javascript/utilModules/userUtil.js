/* User and Login Data */

// Creating User Data
export let userData;


// function define userData so that it is not reset on each new page load
export function setUserData() {
    // if no userData set, it is just empty array
    if (localStorage.length === 0) {
        userData = [];
    }
    else {
        // if there is data in local storage, it copies that data into a new array and resaves it
        userData = [];
        for (let i = 0; i < JSON.parse(localStorage.getItem("userData")).length; i++) {
            let item = JSON.parse(localStorage.getItem("userData"));
            userData.push(new User(item[i].username, item[i].password, item[i].email, item[i].phoneNumber, item[i].score, item[i].highScore));
        }
    }
}
// save a new user to the userData array to be saved in local storage
export function saveUserData(username, email, password, phone) {
    userData.push(new User(username, email, password, phone, 0, 0));
    localStorage.setItem("userData", JSON.stringify(userData)); 
}

export function getUserData() {
    return userData;
}

// constructor for a user object
export function User(username, password, email, phoneNumber, score, highScore) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.score = score;
    this.highScore = highScore;
};

// Logged in User 

// set logged in user between pages
export let loggedInUser;

export function setLoggedInUser() {
    loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
}

export function saveLoggedInUser(value) {
    loggedInUser = value;
}
export function getLoggedInUser() {
    return loggedInUser;
}

// clear sessionStorage and refresh the page
export function logout() {
    sessionStorage.removeItem("loggedInUser");
    loggedInUser = null;
    location.reload();
}
// changes the navbar so that the user can logout if they are already logged in as a user
export function checkLoggedIn() {
    if (getLoggedInUser() != null) {
        document.getElementById("loginNav").innerHTML = "Logout";
        document.getElementById("loginIcon").classList.replace("fa-user", "fa-right-from-bracket");
        document.getElementById("loginButton").href="#";
        document.getElementById("loginButton").addEventListener("click", function () {
            logout();
        })
    }
}

// Setting User Score

export function setUserScore(username, userScore) {
    for (let i = 0; i < JSON.parse(localStorage.getItem("userData")).length; i++) {
        let item = JSON.parse(localStorage.getItem("userData"));
        if (username === item[i].username) {
            // compare score to highScore
            setHighScore(item[i], userScore);

            item[i].score = userScore;
            // initialize userData to be modified
            setUserData();
            // push new object with updated score
            userData.push(item[i]);

            // remove the old object from userData array
            userData.splice(i, 1);
            // replace with new object with updated score in local Storage
            localStorage.setItem("userData", JSON.stringify(userData)); 

        }
   }
}

function setHighScore(player, userScore) {
    if (userScore >= player.highScore) {
        player.highScore = userScore;
    }
}



// Regex:

// Must have at least one uppercase character
// Must have at least one digit
// must be longer than 8 characters
export const accountUsernameTest = /^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/;

// Must have at least one uppercase character
// Must have at least one digit
// Must be longer than 8 characters
// Must have at least one special character: ! @ # $ % ^ & *
export const accountPasswordTest = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*[!@#$%^&*]).{8,}$/;

// Allows characters that are not whitespace or @ before and after an @ has been typed
// Requires a . for the .com part of the email
// allows for optional .co.uk or similar ending
export const accountEmailTest = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;

// Allows 11 digit phone numbers, including the 0 at the start, e.g: 07954652918
export const accountPhoneTest = /^[(]{0,1}[0-9]{4}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
// TODO:
// Add way of checking if account already exists
// Add way to delete account

// ------------------------------------------------------------------------------
// User Data
let userData = [];

function User(username, password) {
  this.username = username;
  this.password = password
  this.score = 0;
}

// ------------------------------------------------------------------------------
// Leaderboard Page Elements
if (document.URL.includes("leaderboards.html")) {
}

// ------------------------------------------------------------------------------
// Create an Account Elements
if (document.URL.includes("createAccount.html")) {
  const accountUsernameEL = document.getElementById("accountUsername-el");
  const accountPasswordEl = document.getElementById("accountPassword-el");
  const accountPasswordCheckEl = document.getElementById(
    "accountPasswordCheck-el"
  );
  const accountInputBtn = document.getElementById("accountInput-btn");

  // Create an Account Functions
  accountInputBtn.addEventListener("click", function () {
    // Regex to test that only allows alphabetic characters
    let createAccountTest = /^[a-zA-Z]+$/;

    let accountMessageText = "";
    let accountMessage = document.getElementById("welcomeMessage");
    let accountDiv = document.getElementById("createAccountInput");

    if (accountPasswordEl.value != accountPasswordCheckEl.value) {
      accountMessageText = "Error: Passwords do not match";
    }
    else if (createAccountTest.test(accountUsernameEL.value) == false){
      accountMessageText = "Error: Please enter a valid username";
    }
    else if (createAccountTest.test(accountPasswordEl.value) == false) {
      accountMessageText = "Error: Please enter a valid password";
    } 
    else {
      accountMessageText = "Account Created";
      createUserAccount(accountUsernameEL.value, accountPasswordEl.value);
    }
    accountMessageNode = document.createTextNode(accountMessageText);
    accountMessage.appendChild(accountMessageNode);
    accountDiv.appendChild(accountMessage);

    // Clearing the input
    accountUsernameEL.value = "";
    accountPasswordEl.value = "";
    accountPasswordCheckEl.value = "";
    
  });

  function createUserAccount(username, password) {
    userData.push(new User(username, password));
    localStorage.setItem("userData", JSON.stringify(userData));

    
  }
}
// ------------------------------------------------------------------------------
// Homepage Elements
if (document.URL.includes("homepage.html")) {
}
// ------------------------------------------------------------------------------
// Login Page Elements
if (document.URL.includes("login.html")) {
  const loginUsernameEl = document.getElementById("loginUsername-el");
  const loginPasswordEl = document.getElementById("loginPassword-el");
  const loginInputBtn = document.getElementById("login-btn");

  // Login Page Functions
  loginInputBtn.addEventListener("click", function () {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let item = JSON.parse(localStorage.getItem(key));

      if (loginUsernameEl.value == item[i].username) {
        if (loginPasswordEl.value == item[i].password) {
          console.log("Logging in user");
        } 
        else {
          console.log("Account password does not exist");
        }
      } 
      else {
        console.log("Account username does not exist");
      }
    }
    // Clearing the input
    loginUsernameEl.value = "";
    loginPasswordEl.value = "";
  });
}
// ------------------------------------------------------------------------------
// Manage Account Elements
if (document.URL.includes("manageAccount.html")) {
}

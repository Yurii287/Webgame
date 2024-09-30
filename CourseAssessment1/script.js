// TODO:
// have a different regex for username and password
// need a regex for email and phone number as well
// add a default value to the create account and login pages
// add a way to pause the game with escape
// add difficulty levels for the game, create a menu for selection, different difficulties will affect enemy speed and/or dmg
// ask for email and phone number
// use different modules for the game
// Add way to delete account/Log out
// If someone is logged in replace "Create an Account" with "Manage Account"
// For the leaderboard use a template string to display the scores and names
// For leaderboard use a table to display the data
// create a seperate function for accessing the local storage so that the code is not repeated too much

// ------------------------------------------------------------------------------
// User Data
let userData = [];
let loggedInUser = null;

// Regex:
// Must have AT LEAST ONE uppercase character
// Must have AT LEAST ONE digit
// must be longer than 8 characters
let accountTest = /^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/;  

function User(username, password, email, phoneNumber) {
  this.username = username;
  this.password = password
  this.email = email;
  this.phoneNumber = phoneNumber;
  this.score = 0;
  this.ranking = 0;
}

// ------------------------------------------------------------------------------
// Leaderboard Page Elements
if (document.URL.includes("leaderboards.html")) {
  // get currently logged in user
  loggedInUser = localStorage.getItem("loggedInUser");

  const leaderboardLoggedInScore = document.getElementById("loggedInScore-el");
  const leaderboardLoggedInPosition = document.getElementById("loggedinPosition-el")

  getUserRanking();

  function getUserRanking() {
    if (loggedInUser === null) {
      leaderboardLoggedInScore.innerHTML = "Score: Not currently logged in ";
      leaderboardLoggedInPosition.innerHTML = "Ranking: Not currently logged in: ";
    }
    else {
      leaderboardLoggedInScore.innerHTML = "Your Score is : ";
      leaderboardLoggedInPosition.innerHTML = "Your Global Position is : ";
    }
  }

  function loggedInRankingCheck() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let item = JSON.parse(localStorage.getItem(key));

      console.log(item[i]);
    }
  }
}

// ------------------------------------------------------------------------------
// Create an Account Elements
if (document.URL.includes("createAccount.html")) {
  const accountUsernameEl = document.getElementById("accountUsername-el");
  const accountPasswordEl = document.getElementById("accountPassword-el");
  const accountPasswordCheckEl = document.getElementById("accountPasswordCheck-el");
  const accountInputBtn = document.getElementById("accountInput-btn");



  // Create an Account Functions
  accountInputBtn.addEventListener("click", function () {

    // Account creation message
    let accountMessageText = "";
    let accountMessage = document.getElementById("welcomeMessage");

    // Check if username already exists
    let accountCheck = checkUserDetails(accountUsernameEl.value);

    if (accountPasswordEl.value != accountPasswordCheckEl.value) {
      accountMessage.innerHTML = "";
      accountMessageText = "Error: Passwords do not match";
    }
    else if (accountTest.test(accountUsernameEl.value) == false){
      accountMessage.innerHTML = "";
      accountMessageText = "Error: Please enter a valid username";
    }
    else if (accountTest.test(accountPasswordEl.value) == false) {
      accountMessage.innerHTML = "";
      accountMessageText = "Error: Please enter a valid password";
    } 
    else if (accountCheck === true) {
      createUserAccount(accountUsernameEl.value, accountPasswordEl.value);
      accountMessageText = "Account created";
    }
    else if (accountCheck === false) {
      accountMessage.innerHTML = "";
      accountMessageText = "Error: Account with that username already exists";
    }

    let accountMessageNode = document.createTextNode(accountMessageText);
    accountMessage.appendChild(accountMessageNode);

    // Clearing the input
    accountUsernameEl.value = "";
    accountPasswordEl.value = "";
    accountPasswordCheckEl.value = "";
  });

  function checkUserDetails(username) {
    if (localStorage.length === 0) {
      return true;
    }
    else {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = JSON.parse(localStorage.getItem(key));
        if (username === item[i].username) {
          return false;
        }
      }
    }
  }

  function createUserAccount(username, password) {
    userData.push(new User(username, password));
    localStorage.setItem("userData", JSON.stringify(userData)); 
  }
}
// ------------------------------------------------------------------------------
// Homepage Elements
if (document.URL.includes("homepage.html")) {
// Game data
  const canvas = document.getElementById("gameCanvas");
  const context = canvas.getContext("2d");

  let gameObjects = [];
  let directions = {
    left : 0,
    up : 0,
    down : 0,
    right : 0
  };

// Classes
  class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.speed = 10;
      this.level = 1;
      this.health = 100;
      this.type = "player";
      this.score = 0;
    }

    move() {
      if (directions.up === 1) {
        this.y -= this.speed;
      }
      if (directions.left === 1) {
        this.x -= this.speed;
      }
      if (directions.down === 1) {
        this.y += this.speed;
      }
      if (directions.right === 1) {
        this.x += this.speed;
      }
    }

    reDraw() {
      context.fillStyle = "lightblue";
      context.fillRect(this.x,this.y, 25, 25);
    }
  }

  class Weapon {
    constructor(attackSpeed, attackDmg) {
      this.attackSpeed = attackSpeed;
      this.attackDmg = attackDmg;
      this.type = "weapon";
    }
  }

  class Enemy {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.speed = 0.01;
      this.damage = 25;
      this.health = 100;
      this.type = "enemy";
      this.xDifference = 0;
      this.yDifference = 0;
    }

    move() {
      this.x += ((player.x - this.x) * this.speed);
      this.y += ((player.y - this.y) * this.speed);
    }

    reDraw() {
      context.fillStyle = "red";
      context.fillRect(this.x, this.y, 25, 25);
    }
  }

  let player = new Player(canvas.width / 2, canvas.height / 2);
  let defaultWeapon = new Weapon(30, 25);

// Game Functions
  function reDrawObjects() {
    context.fillStyle = "black";
    context.fillRect(0,0, canvas.width, canvas.height);
    
    for (let item of gameObjects) {
      item.reDraw();
    }
  }

  function spawnEnemy() {
    let randomX = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0;
    let randomY = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0;
    gameObjects.push(new Enemy(randomX, randomY));
  }

  function moveEnemy() {
    for (let item of gameObjects) {
      if (item.type === "enemy") {
        item.move();
      }
    }
  }

  function startGame() {
    document.getElementById("start-btn").disabled = true;

    reDrawObjects();

    setInterval(runGame, 10);
    setInterval(spawnEnemy, 2000);

    gameObjects.push(player);
  }

// Helper functions

  function setBounds() {

  }

  function checkCollision() {

  }

  function pauseGame() {

  }

// Key bindings
  window.addEventListener("keydown", (event) => {
    if (event.code === "KeyA") {
      directions.left = 1;
      player.move();
    }
    if (event.code === "KeyS") {
      directions.down = 1;
      player.move("S");
    }
    if (event.code === "KeyW") {
      directions.up = 1;
      player.move("W");
    }
    if (event.code === "KeyD") {
      directions.right = 1;
      player.move("D");
    }
    if (event.code === "Escape") {

    }
  })

  window.addEventListener("keyup", (event) => {
    if (event.code === "KeyA") {
      directions.left = 0;
    }
    if (event.code === "KeyS") {
      directions.down = 0;
    }
    if (event.code === "KeyW") {
      directions.up = 0;
    }
    if (event.code === "KeyD") {
      directions.right = 0;
    }
  })

// Render UI
  function renderUI() {
    context.fillStyle = "white";
    context.font = "bold 16px Arial";
    context.textAlign = "start";
    context.textBaseline = "middle";
    context.fillText("Health : " + player.health, 0, 10);
    context.fillText("Score : " + player.score, 0, 30);
  }

// Game
  function runGame() {
    reDrawObjects();
    renderUI();
    moveEnemy();
  }

}
// ------------------------------------------------------------------------------
// Login Page Elements
if (document.URL.includes("login.html")) {
  const loginUsernameEl = document.getElementById("loginUsername-el");
  const loginPasswordEl = document.getElementById("loginPassword-el");
  const loginInputBtn = document.getElementById("login-btn");
  let loginMessage = document.getElementById("loginMessage");


  // Login Page Functions
  loginInputBtn.addEventListener("click", function () {
    // Check if any accounts have been made
    if (localStorage.length === 0) {
      loginMessage.innerHTML = "Error: No Accounts Created";
    }
    // If there are accounts, iterate through to check what username and password matches
    else {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = JSON.parse(localStorage.getItem(key));
        // check username
        if (loginUsernameEl.value == item[i].username) {
          // check password
          if (loginPasswordEl.value == item[i].password) {
            loginMessage.innerHTML = "Logging in user " + item[i].username;
            loggedInUser = item[i].username
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
          } 
          //password doesn't match
          else {
            loginMessage.innerHTML = "Error: Account with that password does not exist";
          }
        }
        // username doesn't match
        else {
          loginMessage.innerHTML = "Error: Account with that username does not exist";
        }
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

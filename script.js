// TODO:
// Add way of checking if account already exists
// Add way to delete account/Log out
// If someone is logged in replace "Create an Account" with "Manage Account"
// To log in the user, after checking through local storage of what user object matches those credentials, get the index of that object 
//    and have that object defined in a "loggedInUser" variable
// For the leaderboard use a template string to display the scores and names
// For leaderboard use a table to display the data
// For game, create classes for: player, enemy and weapons/upgrades

// ------------------------------------------------------------------------------
// User Data
let userData = [];
let loggedIn = false;
let loggedInUser = null;

function User(username, password) {
  this.username = username;
  this.password = password
  this.score = 0;
  this.ranking = 0;
}

// ------------------------------------------------------------------------------
// Leaderboard Page Elements
if (document.URL.includes("leaderboards.html")) {
  const leaderboardLoggedInScore = document.getElementById("loggedInScore-el");
  const leaderboardLoggedInPosition = document.getElementById("loggedinPosition-el")
  leaderboardLoggedInScore.innerHTML = "Your Score is : ";
  leaderboardLoggedInPosition.innerHTML = "Your Global Position is : ";
  getUserRanking();
  getLeaderboardRanking();

  function getUserRanking() {
    if (loggedInUser == null) {
      leaderboardLoggedInScore.innerHTML = "You are not currently logged in." + "<a href='login.html'>"+ "  Login "+"</a>" +"here to see your score.";
      leaderboardLoggedInPosition.innerHTML = "";
    }
  }

  function getLeaderboardRanking() {

  }

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
      this.speed = 5;
      this.level = 1;
      this.health = 100;
    }

    move(direction) {
      context.fillStyle = "black";
      context.fillRect(0,0, canvas.width, canvas.height);
      console.log(this.x);
      console.log(this.y); 
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
      this.reDraw()
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
    }
  }

  class Enemy {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.speed = 0.25;
      this.damage = 25;
      this.health = 100;
    }

    move() {
      this.y = player.y - this.y;
      this.x = player.x - this.x;
    }

    reDraw() {
      context.fillStyle = "red";
      context.fillRect(this.x, this.y, 25, 25);
    }
  }

  let player = new Player(100, 100);
  let defaultWeapon = new Weapon(30, 25);

  function reDrawObjects() {
    context.fillStyle = "black";
    context.fillRect(0,0, canvas.width, canvas.height);

    player.reDraw()
  }

  function startGame() {
    console.log(player.x);
    console.log(player.y); 

    context.fillStyle = "black";
    context.fillRect(0,0, canvas.width, canvas.height);

    setInterval(runGame, 500);

    gameObjects.push(player, defaultWeapon);
    console.log(gameObjects);
  }

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

  function runGame() {

    spawnEnemy();

  }

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
          loggedIn = true;
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

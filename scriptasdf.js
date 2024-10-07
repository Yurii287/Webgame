// TODO:
// add collision for game
// add a way to pause the game with escape or spacebar
// add difficulty levels for the game, create a menu for selection, different difficulties will affect enemy speed and/or dmg
// use different modules for the game
// Add way to delete account/Log out
// If someone is logged in replace "Create an Account" with "Manage Account"
// Add logout button
//    - this replaces the "loggedInUser" data with an empty string
// For the leaderboard use a template string to display the scores and names
// For leaderboard use a table to display the data
// create a seperate function for accessing the local storage so that the code is not repeated too much

// ------------------------------------------------------------------------------








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
// Homepage Elements
if (document.URL.includes("homepage.html")) {
// Game data
  const canvas = document.getElementById("gameCanvas");
  const context = canvas.getContext("2d");
  const maxEnemy = 50;
  
  let spawnRate = 2000;
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
    constructor(attackSpeed, attackDmg, attackRange) {
      this.attackSpeed = attackSpeed;
      this.attackDmg = attackDmg;
      this.attackRange = attackRange;
      this.type = "weapon";
    }

    moveDamageRadius() {

    }

    damageCollision() {

    }

    reDraw() {
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
    }

    move() {
      this.x += ((player.x - this.x) * this.speed);
      this.y += ((player.y - this.y) * this.speed);
    }

    reDraw() {
      context.fillStyle = "red";
      context.fillRect(this.x, this.y, 25, 25);
    }
  
    checkEnemyCollision() {
      for (let item of gameObjects) {
        if (item.type === "enemy") {
          // does not compare its own position with itself
          // compares this enemy position with all other enemy positions
          if (item != this && (Math.abs(item.x - this.x) <= 20) && (Math.abs(item.y - this.y) <= 20)) {
            console.log("Enemy Collision");
          }
        }
      }
    }

    checkPlayerCollision() {
      let xPlayerDifference = player.x - this.x;
      let yPlayerDifference = player.y - this.y;

      // get absolute value, otherwise some differences will be negative based on the x and y spawn position
      if (Math.abs(xPlayerDifference) <= 20 && Math.abs(yPlayerDifference) <= 20) {
        console.log("Player Collision");
        player.health -= this.damage;
      }
    }
  }
  
  // Instance player and weapon 
  let player = new Player(canvas.width / 2, canvas.height / 2);
  let defaultWeapon = new Weapon(30, 25, 50);


// Game Functions
  function reDrawObjects() {
    // redraw background
    context.fillStyle = "black";
    context.fillRect(0,0, canvas.width, canvas.height);

    // redraw all objects within the scene
    for (let item of gameObjects) {
      item.reDraw();
    }
  }

  function spawnEnemy() {
    // Sets a spawn limit for the game
    if (gameObjects.length <= maxEnemy) {
      // gets a random x & y to spawn the enemy at
      let randomX = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0;
      let randomY = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0;
      gameObjects.push(new Enemy(randomX, randomY));
    }
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

    canvas.style.borderColor = "white";
    canvas.style.visibility = "visible";

    reDrawObjects();

    setInterval(runGame, 10);
    setInterval(spawnEnemy, spawnRate);

    gameObjects.push(player,defaultWeapon);
  }

// Helper functions

  function setBounds() {

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

    // Check collision for all enemies on screen
    for (let item of gameObjects) {
      if (item.type === "enemy") {
        item.checkPlayerCollision();
        item.checkEnemyCollision();
      }
    }
  }

}
// ------------------------------------------------------------------------------
// Login Page Elements
if (document.URL.includes("login.html")) {
  const loginUsernameEl = document.getElementById("loginUsername-el");
  const loginPasswordEl = document.getElementById("loginPassword-el");
  const loginInputBtn = document.getElementById("login-btn");
  let loginMessage = document.getElementById("loginMessage");
  let loginInputElements = [loginUsernameEl, loginPasswordEl];

  // Login Page Functions
  loginInputBtn.addEventListener("click", function () {

    // set input element default colours
    loginInputElements.forEach((element) => setDefaultColour(element));

    // Check if any accounts have been made
    if (localStorage.length === 0) {
      loginMessage.innerHTML = "Error: No Accounts Created";
      loginUsernameEl.style.border = errorInputBorder;
      loginUsernameEl.animate(errorInputAnimation, 200)

      loginPasswordEl.style.border = errorInputBorder;
      loginPasswordEl.animate(errorInputAnimation, 200);
      
    }
    // If there are accounts, iterate through to check what username and password matches
    else {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = JSON.parse(localStorage.getItem(key));
        // check username
        if (loginUsernameEl.value === item[i].username) {
          // check password
          if (loginPasswordEl.value == item[i].password) {
            loginMessage.innerHTML = "Logging in user";
            loginMessage.style.color = "rgb(23, 228, 40)"
            loginUsernameEl.style.border = successInputBorder;
            loginPasswordEl.style.border = successInputBorder;
            loggedInUser = item[i].username
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            break;
          } 
          //password doesn't match
          else {
            loginMessage.innerHTML = "Error: Account with that password does not exist";
            loginPasswordEl.style.border = errorInputBorder;
            loginPasswordEl.animate(errorInputAnimation, 200);
          }
        }
        // username doesn't match
        else if (loginUsernameEl.value != item[i].username) {
          console.log("Error")
          loginMessage.innerHTML = "Error: Account with that username does not exist";
          loginUsernameEl.style.border = errorInputBorder;
          loginUsernameEl.animate(errorInputAnimation, 200);
        }
      }
    }

    // Clearing the input
    loginUsernameEl.value = "";
    loginPasswordEl.value = "";
  });
}

// General Function //

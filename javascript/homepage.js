import { setUserData, getLoggedInUser, setLoggedInUser, setUserScore, checkLoggedIn} from "./utilModules/userUtil.js";
import { Game } from "./gameModules/Game.js";
import { Player } from "./gameModules/Player.js";
import { Weapon } from "./gameModules/Weapon.js";

const canvas = document.getElementById("gameCanvas");
export const context = canvas.getContext("2d");
export let game = new Game(getLoggedInUser(), canvas, canvas.width, canvas.height);
export let currentWeapon;
let player;


// HTML Elements
const easyButton = document.getElementById("easy");
const medButton = document.getElementById("med");
const hardButton = document.getElementById("hard");

// Call to set the value of what user is logged in so that the score is allocated properly
setUserData();
setLoggedInUser();
checkLoggedIn();

easyButton.addEventListener("click", function() {
  if (game.gameRunning === false) {
    game.setDifficulty("Easy");
  }
});

medButton.addEventListener("click", function() {
  if (game.gameRunning === false) {
  game.setDifficulty("Normal");
  }
});
hardButton.addEventListener("click", function() {
  if (game.gameRunning === false) {
    game.setDifficulty("Hard");
  }
});

document.getElementById("start-btn").addEventListener("click", function () {

// Make sure that players must be logged in to play the game and have their score saved
  if (getLoggedInUser() === undefined || getLoggedInUser() == null) {
    canvas.style = "visible";
    drawNotLoggedIn();
    
  }
  else {
    document.getElementById("start-btn").disabled = true;

    canvas.style.borderColor = "white";
    canvas.style.visibility = "visible";

    game = new Game(getLoggedInUser(), canvas, canvas.width, canvas.height);
    game.gameRunning = true;
    player = new Player(getLoggedInUser(), canvas.width/2, canvas.height/2);


    currentWeapon = new Weapon(30, 100, 70, 7500);

    game.gameObjects.push(game, player, currentWeapon);

    game.gameInterval = setInterval(runGame, 1000/120);

  }
})

function drawNotLoggedIn() {
  context.fillStyle = "white";
  context.font = "bold 28px Game-Font";
  context.textAlign = "start";
  context.textBaseline = "middle";

  context.fillText("You must be logged in to play the game", 300, canvas.height/2);

}

export function runGame() {
    // Check for a game over state
    if (player.health <= 0) {
        game.gameOver(player, context);
        setUserScore(player.username, player.score);
    }

    else {
    // Tick down for when an enemy is spawned
    game.spawnEnemyTimer();

    // move the weapon area with the player
    currentWeapon.update(player);

    // Redraw and check collision for all elements within the gameObjects array
    for (let item of game.gameObjects) {
        item.reDraw(context);
        // Find objects that are enemies only
        if (item.type === "enemy") {
            item.move(player.x, player.y);
            item.checkPlayerCollision(player);
            if (item.health <= 0) {
                item.kill(player, currentWeapon);
                item.erase(context);
            }
        }
    }

    // UI
    game.renderUI(player, context);

    // Attack Speed
    currentWeapon.attackFrames -= 250;
    if (currentWeapon.attackFrames <= 0) {
      // play animation for attacking
      player.reDrawAttack();
      // check collision within the area of the weapon circle
      currentWeapon.checkCollision(game.gameObjects ,player);

      // reset the countdown until attacking again
      currentWeapon.attackFrames = 75000;

      // reset the frameY and frameMax so that the attack animation isn't always playing
      setTimeout(function() {player.frameY = 0; player.frameMax = 6;}, 500);
    }
  }

}

// Key bindings
window.addEventListener("keydown", (event) => {
    if (event.code === "KeyA") {
      player.directions.moveLeft = true;
    }
    if (event.code === "KeyS") {
      player.directions.moveDown = true;
    }
    if (event.code === "KeyW") {
      player.directions.moveUp = true;
    }
    if (event.code === "KeyD") {
      player.directions.moveRight = true;
    }
    player.move();
    if (event.code === "Space") {
      game.pauseGame();
    }
    if (event.code === "KeyR" && game.gameRunning === false) {
      location.reload();
    }
  })
  
  window.addEventListener("keyup", (event) => {
    if (event.code === "KeyA") {
      player.directions.moveLeft = false;
    }
    if (event.code === "KeyS") {
      player.directions.moveDown = false;
    }
    if (event.code === "KeyW") {
      player.directions.moveUp = false;
    }
    if (event.code === "KeyD") {
      player.directions.moveRight = false;
    }
    player.move();
  })


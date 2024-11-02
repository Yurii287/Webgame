import { Enemy } from "./Enemy.js";
import { runGame } from "../homepage.js";
import { context } from "../homepage.js";

export class Game {
    constructor(loggedUser ,canvas, width, height) {
        this.loggedUser = loggedUser;
        this.canvas = canvas
        this.width = width;
        this.height = height;
        this.gameRunning = false;
        this.difficulty = "Normal";
        this.gameObjects = [];
        this.maxObjects = 2500;
        this.gameInterval;
        this.type = "game";
        this.spawnRate = 7500;
        this.spawnRateTick = 150;
        this.spriteSheet = document.getElementById("backgroundImage");
    }

    reDraw() {
        context.drawImage(
            this.spriteSheet, 0, 0);
    }

    spawnEnemyTimer() {
        this.spawnRate -= this.spawnRateTick;
        if (this.spawnRate <= 0) {
            this.spawnEnemy();
            this.spawnRate = 7500 * this.checkDifficulty();
        }
    }

    spawnEnemy() {
        if (this.gameObjects.length <= this.maxObjects) {
            let randomX = Math.floor(Math.random() * (this.width));
            let randomY = Math.floor(Math.random() * (this.height));
            this.gameObjects.push(new Enemy(randomX, randomY));
        }
    }

    pauseGame() {
        if (this.gameRunning === true) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
            this.gameRunning = false;
            context.fillStyle = "white";
            context.font = "bold 28px Game-Font";
            context.textAlign = "start";
            context.textBaseline = "middle";

            context.fillText("Paused", 475, 130);

        }
        else {
            this.gameInterval = setInterval(runGame, 1000/120);
            this.gameRunning = true;
        } 
    }

    renderUI(player) {
        context.fillStyle = "rgba(0,0,0,0.5)";
        context.fillRect(0, 0, 375, 130);

        context.fillStyle = "white";
        context.font = "bold 28px Game-Font";
        context.textAlign = "start";
        context.textBaseline = "middle";

        context.fillText("User : " + player.username, 10, 30);
        context.fillText("Health : " + player.health, 10, 50);
        context.fillText("Score : " + player.score, 10, 70);
        context.fillText("Level :" + player.level, 10, 90);
        context.fillText("Xp needed for next level :" + player.experienceNeeded, 10, 110);
    }

    gameOver(player) {
        this.gameRunning = false;
        // Clear UI on the screen
        context.fillStyle = "black";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Render Game Over Message and User Score
        context.fillStyle = "white";
        context.font = "bold 28px Game-Font";
        context.textAlign = "start";
        context.textBaseline = "middle";

        context.fillText("Game Over", (this.canvas.width/2) - 150, (this.canvas.height/2) - 20);
        context.fillText(player.username + "'s Score is: "  + player.score, (this.canvas.width/2) - 200, this.canvas.height/2);
        context.fillText("Press [R] to refresh the page and try again",(this.canvas.width/2) - 250, this.canvas.height/2 + 20);
    }

    setDifficulty(value) {
        this.difficulty = value;
        this.checkDifficulty();
    }

    checkDifficulty() {
        if (this.difficulty === "Hard") {
            return 3;
        }
        else if (this.difficulty === "Normal") {
            return 1;
        }
        else if (this.difficulty === "Easy") {
            return 0.5;
        }
    }

    increaseSpawnRate() {
        this.spawnRate *= 1.25;
    }

}

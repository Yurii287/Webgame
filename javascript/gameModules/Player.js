import { context } from "../homepage.js";
import { game } from "../homepage.js";
import { currentWeapon } from "../homepage.js";

export class Player {
  constructor(username, x, y) {
    this.username = username;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.level = 1;
    this.experience = 0;
    this.experienceCap = 100;
    this.experienceNeeded = 100;
    this.health = 100;
    this.iFrames = 5000;
    this.type = "player";
    this.score = 0;
    // animation variables
    this.spritesheet = document.getElementById("playerSpriteSheet");
    this.spriteWidth = 32;
    this.spriteHeight = 32;
    this.frameX = 0;
    this.frameY = 0;
    this.frameMax = 0;
    this.frameCounter = 0;
    // true and false values for player movement
    this.directions = {
      moveLeft: false,
      moveUp: false,
      moveDown: false,
      moveRight: false,
    };
  }

  // set the boundries for the canvas and movement
  move() {
    if (this.directions.moveUp === true && this.y >= 0) {
      this.y -= this.speed;
      this.reDrawMove("up");
    }
    else if (this.directions.moveLeft === true && this.x >= 0) {
      this.x -= this.speed;
      this.reDrawMove("left");
    }
    else if (this.directions.moveDown === true && this.y <= 725) {
      this.y += this.speed;
      this.reDrawMove("down");
    }
    else if (this.directions.moveRight === true && this.x <= 970) {
      this.x += this.speed;
      this.reDrawMove("right");
    }
    else {
      this.reDrawIdle();
    }
  }

  reDraw() {
    context.imageSmoothingEnabled = false;

    context.drawImage(
      this.spritesheet, 
      this.frameX * this.spriteWidth, 
      this.frameY * this.spriteHeight, 
      this.spriteWidth,
      this.spriteHeight, 
      this.x - 48, 
      this.y - 48, 
      (this.spriteWidth * 4), 
      (this.spriteHeight * 4)
    );

    // Creates timer by incrementing the frameCounter
    if (this.frameCounter % 6 == 0) {
      if (this.frameX < this.frameMax - 1) {
        this.frameX += 1;
      }
      else {
        this.frameX = 0;
      }
    }

    this.frameCounter += 1;
  }

  reDrawIdle() {
    this.frameY = 0;
    this.frameMax = 6;
  }

  reDrawMove(direction) {
    if (direction === "up") {
      this.frameY = 6;
      this.frameMax = 6;
    }
    if (direction === "left") {
      this.frameY = 5;
      this.frameMax = 6;
    }
    if (direction === "down") {
      this.frameY = 3;
      this.frameMax = 6;
    }
    if (direction === "right") {
      this.frameY = 4;
      this.frameMax = 6;
    }
  }

  reDrawAttack() {
    this.frameY = 7;
    this.frameMax = 4;
  }

  levelUp() {
    this.level += 1;
    this.experienceNeeded = this.experienceCap * 1.5;
    this.experienceCap = this.experienceNeeded;
    this.experience === 0;
    currentWeapon.increaseRadius();
    currentWeapon.increaseDamage();
    game.increaseSpawnRate();

    this.speed += 5;
  }
}

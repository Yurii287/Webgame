import { context } from "../homepage.js";

export class Enemy{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.damage = 25;
        this.experience = 10;
        this.health = 100;
        this.type = "enemy";
        this.index;
        //animation variables
        this.spritesheet = document.getElementById("enemySpriteSheet");
        this.spriteWidth = 32;
        this.spriteHeight = 32;
        this.frameX = 0;
        this.frameY = 0;
        this.frameCounter = 0;
        this.frameMax = 0;
      }

    move(playerX, playerY) {
        // gets difference between player and enemy position
        let xDist = playerX - this.x;
        let yDist = playerY - this.y;
        // gets the angle between the two points
        let moveAngle = Math.atan2(yDist, xDist);
        // increases position incrementally between the two points
        this.x += Math.cos(moveAngle) * this.speed;
        this.y += Math.sin(moveAngle) * this.speed;
        
        if (xDist < 0 || yDist < 0) {
          this.reDrawMove("left");
        }
        else if (xDist > 0 || yDist > 0) {
          this.reDrawMove("right");
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

    reDrawMove(direction) {
      if (direction === "left") {
        this.frameY = 5;
        this.frameMax = 6;
        
      }
      if (direction === "right") {
        this.frameY = 4;
        this.frameMax = 6;
      }
    }

    checkPlayerCollision(player) {
        let xPlayerDifference = player.x - this.x;
        let yPlayerDifference = player.y - this.y;

        if (Math.abs(xPlayerDifference) <= 20 && Math.abs(yPlayerDifference) <= 20) {
            player.iFrames -= this.damage;
            if (player.iFrames === 0) {
              player.health -= this.damage;
              player.iFrames = 5000;
            }
          }
    }

    kill(gameObjects, player, weapon) {
        this.health -= weapon.attackDmg;
    
        if (this.health <= 0) {
          // get index of this enemy object
          this.index = gameObjects.indexOf(this);

          // slices only 1 value from the list, this enemy index
          gameObjects.splice(this.index, 1);
          player.score += this.experience;
          player.experienceNeeded -= this.experience;
          if (player.experienceNeeded === 0) {
            player.levelUp();
          }
        }
      }
}
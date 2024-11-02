import { context } from "../homepage.js";

export class Weapon {
    constructor(attackSpeed, attackDmg, attackRange, attackFrames) {
      this.attackSpeed = attackSpeed;
      this.attackDmg = attackDmg;
      this.attackRange = attackRange;
      this.attackFrames = attackFrames;
      this.radius = 75;
      this.type = "weapon";
      this.centreX;
      this.centreY;
    }
  
    update(player) {
      this.centreX = player.x + 12;
      this.centreY = player.y + 12;
    }

    checkCollision(gameObjects ,player) {
      //enemy.x - centre.x (squared) + enemy.y - centre.y (squared) < radius
      for (let item of gameObjects) {
        if (item.type === "enemy") {
          if ( Math.floor(Math.sqrt(Math.pow(item.x - player.x + 12, 2) + Math.pow(item.y - player.y + 12, 2)) < this.radius) ) {
            item.kill(gameObjects, player, this);
          }
        }
      }
    }

    reDraw() {
      context.beginPath();
      context.arc(this.centreX, this.centreY, this.radius, 0, 2 * Math.PI);
      context.fillStyle = "rgba(255,255,255,0.5)";
      context.fill();
    }
  
    increaseRadius() {
      this.radius += 10;
    }

    increaseDamage() {
      this.attackDmg += 10;
    }

  }
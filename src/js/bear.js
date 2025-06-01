import { Actor, Vector, Keys, CollisionType, DegreeOfFreedom } from "excalibur";
import { Resources } from "./resources.js";

export class Bear extends Actor {

    speed = 200;
    lives = 3;
    hasJumped = false;

    constructor() {
        super({
            width: Resources.Bear.width,
            height: Resources.Bear.height,
        }); // construct the parent class
    }

    onInitialize() {
        this.graphics.use(Resources.Bear.toSprite());
        this.graphics.flipHorizontal = true; // Flip the sprite horizontally
        this.scale = new Vector(0.5, 0.5);

        this.body.collisionType = CollisionType.Active; // Set collision type to active
        
        this.body.useGravity = true;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.pos = new Vector(100, 600);

        this.on('collisionstart', (event) => {
            console.log("Collision detected with:", event.other);
            if (event.contact.normal.y < 0) {
                console.log("Bear landed on the ground");
                this.hasJumped = false; // Reset jump state when landing on the ground
            }
        });
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Space) && !this.hasJumped) {
            this.body.applyLinearImpulse(new Vector(0, -250 * delta))
            this.hasJumped = true; // Set jump state to true
        }
    }

    loseLife() {
        this.lives--;
        this.scene?.engine.ui.updateLives(this.lives);
        if (this.lives <= 0) {
            this.kill();
            this.scene?.engine.stop(); // End game
            alert("Game Over!");
            const highscore = localStorage.getItem('highscore') || 0;
            if (this.scene?.engine.ui.score > highscore) {
                localStorage.setItem('highscore', this.scene?.engine.ui.score);
                alert(`New Highscore: ${this.scene?.engine.ui.score}`);
            } else {
                alert(`Highscore: ${highscore}`);
            }
        }
    }

    getLife() {
        this.lives++;
        this.scene?.engine.ui.updateLives(this.lives);
        if (this.lives = 2) {
            return; // Prevent lives from exceeding 3
        }
    }
}
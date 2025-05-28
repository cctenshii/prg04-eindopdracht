import { Actor, Vector, Keys, CollisionType, DegreeOfFreedom } from "excalibur";
import { Resources } from "./resources.js";

export class Bear extends Actor {

    speed = 200;
    lives = 3;

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
        
        this.on("collisionstart", (event) => {
            if (event.other.name === "ground") {
            }
        });
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.body.applyLinearImpulse(new Vector(0, -500 * delta))
        }
    }

    loseLife() {
        this.lives--;
        this.scene?.engine.ui.updateLives(this.lives);
        this.pos = new Vector(100, 600);
        if (this.lives <= 0) {
            this.kill();
            this.scene?.engine.stop(); // End game
            alert("Game Over!");
        }
    }
}
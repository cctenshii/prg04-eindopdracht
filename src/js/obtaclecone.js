import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Bear } from "./bear.js";

export class ObstacleCone extends Actor {

    #randomSpeed;
    
    constructor() {
        super({
            width: Resources.Cone.width,
            height: Resources.Cone.height
        }); // construct the parent class
        this.graphics.use(Resources.Cone.toSprite());

        this.scale = new Vector(0.22, 0.22);
        this.pos = new Vector(1300, 550);
        
        this.#randomSpeed = Math.random() * 300 + 400; // Random speed between 200 and 500
        this.vel = new Vector(-this.#randomSpeed, 0); // Move left
    }

    onInitialize() {
        this.body.collisionType = CollisionType.Passive;

        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other.owner instanceof Bear) {
            console.log("The Bear got hit by a Cone!", event.other.owner);
            event.other.owner.loseLife();
            this.kill(); // remove the cone from the game
        }
    }
}

// event.other is the old version of event.other.owner
// copilot is not able to understand the new version
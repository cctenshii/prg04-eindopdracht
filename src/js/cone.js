import { Actor, Vector, Keys, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Bear } from "./bear.js";

export class Cone extends Actor {
    constructor() {
        super({
            width: Resources.Cone.width,
            height: Resources.Cone.height
            
        }); // construct the parent class
    }

    onInitialize() {
        this.graphics.use(Resources.Cone.toSprite());
        this.body.collisionType = CollisionType.Active;
        this.scale = new Vector(0.22, 0.22);

        this.pos = new Vector(1300, 600);
        this.vel = new Vector(-400, 0); // Move left

        this.on('collisionstart', (event) => this.hitSomething(event))
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
import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources.js";
import { Bear } from "./bear.js";

export class Lifeup extends Actor {
    constructor() {
        super({
            width: Resources.Heart.width,
            height: Resources.Heart.height
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Heart.toSprite());
        this.scale = new Vector(0.05, 0.05);

        this.body.collisionType = CollisionType.Passive;

        this.pos = new Vector(1300, 600);
        this.vel = new Vector(-400, 0); // Move left

        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event) {
        if (event.other.owner instanceof Bear) {
            console.log("The Bear got an extra life!", event.other.owner);
            event.other.owner.getLife();
            this.kill(); // remove the cone from the game
        }
    }
}
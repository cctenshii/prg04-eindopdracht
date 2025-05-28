import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class Background extends Actor {
    onInitialize(engine) {
        this.graphics.use(Resources.Background.toSprite());
        this.scale = new Vector(2.5, 2.5);
        this.anchor = Vector.Half; // Center the background
        this.vel = new Vector(-200, 0); // Move left

        this.on('postupdate', (event) => {
            if (this.pos.x < -1280) {
                this.pos.x = 1280;
            }
        })
    }
}
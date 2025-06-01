import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class Background extends Actor {
    constructor(x = 0) {
        super({
            width: 1280,
            height: 720,
            pos: new Vector(x, 360), // y = 360 for center if anchor is (0, 0.5)
            anchor: new Vector(0, 0.5)
        });
        const sprite = Resources.Background.toSprite();
        sprite.width = 1280;
        sprite.height = 720;
        this.graphics.use(sprite);
    }

    onPreUpdate(engine, delta) {
        this.pos.x -= 200 * (delta / 1000); // Move left, adjust speed as needed
    }
}
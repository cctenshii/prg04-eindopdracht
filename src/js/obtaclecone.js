import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Obstacle } from "./obstacle.js";

export class ObstacleCone extends Obstacle {    
    constructor() {
        super();
        this.graphics.use(Resources.Cone.toSprite());

        this.scale = new Vector(0.22, 0.22);
        this.pos = new Vector(1300, 550);
    }
}

// event.other is the old version of event.other.owner
// copilot is not able to understand the new version
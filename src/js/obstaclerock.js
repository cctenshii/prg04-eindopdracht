import { Resources } from "./resources";
import { Vector } from "excalibur";
import { Obstacle } from "./obstacle";

export class ObstacleRock extends Obstacle {    
    constructor() {
        super();
        this.graphics.use(Resources.Rock.toSprite());
        this.pos = new Vector(1300, 400);
        
        // Random scale between 0.5 and 1.2
        const randomScale = Math.random() * 0.7 + 0.5;
        this.scale = new Vector(randomScale, randomScale);

        // Adjust collider to match scale
        this.collider.useBoxCollider(200 * randomScale, 150 * randomScale);
    }
}
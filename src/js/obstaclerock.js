import { Resources } from "./resources";
import { ObstacleCone } from "./obtaclecone";
import { Vector } from "excalibur";

export class ObstacleRock extends ObstacleCone {

    #randomSpeed;
    
    constructor() {
        super();
        this.graphics.use(Resources.Rock.toSprite());
        this.#randomSpeed = Math.random() * 300 + 400; // Random speed between 200 and 500
        this.vel = new Vector(-this.#randomSpeed, 0); // Move left
        this.pos = new Vector(1300, 400);
        
        // Random scale between 0.5 and 1.2
        const randomScale = Math.random() * 0.7 + 0.5;
        this.scale = new Vector(randomScale, randomScale);

        // Adjust collider to match scale
        this.collider.useBoxCollider(200 * randomScale, 150 * randomScale);
    }
}
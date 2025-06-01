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
        this.pos = new Vector(1300, 450);
        this.scale = new Vector(0.75, 0.75);
        this.collider.useBoxCollider(200, 150);
    }
}
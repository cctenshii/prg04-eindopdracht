import { Actor, CollisionType, Vector } from "excalibur";

export class Ground extends Actor {
    constructor() {
        super({
            width: 1280,
            height: 40,
            pos: new Vector(640, 720), // Center the ground at the bottom of the screen
        });
        
        this.name = "ground"; // Set a name for the ground actor
        this.body.collisionType = CollisionType.Fixed; // Set collision type to fixed
    
        console.log("Ground actor initialized with name:", this.name);
    }
}
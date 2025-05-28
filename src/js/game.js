import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, CollisionType, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background } from './background.js'
import { Bear } from './bear.js'
import { Cone } from './cone.js'
import { UI } from './ui.js'
import { Lifeup } from './lifeup.js'

export class Game extends Engine {

    ui;
    bear;
    score = 0;

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: new Vector(0, 800)
            }
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        
        const background1 = new Background();
        const background2 = new Background();
        background2.pos.x = 1280; // Position the second background to the right of the first

        this.add(background1);
        this.add(background2);

        console.log(background1);
        console.log(background2);

        const ground = new Actor({
            name: "ground",
            pos: new Vector(640, 720),
            width: 1280,
            height: 40,
            collisionType: CollisionType.Fixed
        });
        this.add(ground);

        // const lifeup = new Lifeup();
        // this.add(lifeup);

        this.bear = new Bear();
        this.add(this.bear);

        this.ui = new UI();
        this.add(this.ui);

        this.startConeSpawner();

        this.startScoreCounter();
    }

    startConeSpawner() {
        setInterval(() => {
            if (this.bear && !this.bear.isKilled()) {
                const newCone = new Cone();
                this.add(newCone);
            }
        }, 3000); // Spawn a new cone every 3 seconds
    };

    startScoreCounter() {
        setInterval(() => {
            if (this.bear && !this.bear.isKilled()) {
            this.score += 2;
            this.ui.updateScore(this.score);
            }
        }, 1000); // 1 second
    }
}

new Game()

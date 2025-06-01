import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, CollisionType, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background } from './background.js'
import { Bear } from './bear.js'
import { ObstacleCone } from './obtaclecone.js'
import { UI } from './ui.js'
import { Lifeup } from './lifeup.js'
import { Ground } from './ground.js'
import { ObstacleRock } from './obstaclerock.js'

export class Game extends Engine {
    backgrounds = [];

    ui;
    bear;
    #score = 0;
    speed = 400; // Speed of the obstacles
    speedIncrease = 200;

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
         });
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        
        this.backgrounds = [
            new Background(0),
            new Background(1280)
        ];
        this.backgrounds.forEach(bg => this.add(bg));

        const ground = new Ground();
        this.add(ground);

        this.bear = new Bear();
        this.add(this.bear);

        this.ui = new UI();
        this.add(this.ui);

        this.startObstacleSpawner();

        this.startScoreCounter();

        this.lifeUpSpawner();
    }

    onPreUpdate(engine, delta) {
    // Loop backgrounds
    for (let bg of this.backgrounds) {
        if (bg.pos.x <= -1280) {
            // Find the other background
            const other = this.backgrounds.find(b => b !== bg);
            bg.pos.x = other.pos.x + 1280;
        }
    }
}

    startObstacleSpawner() {
        let minInterval = 500; // minimum spawn interval in ms
        let maxInterval = 1500; // minimum max interval in ms
        let currentMin = 2000;
        let currentMax = 3000;
        let decrease = 10; // ms to decrease per spawn

        const spawn = () => {
            if (this.bear && !this.bear.isKilled()) {
                const spawnType = Math.random() < 0.5 ? "obstaclecone" : "obstaclerock";

                if (spawnType === "obstaclerock") {
                    const newObstacleRock = new ObstacleRock();
                    this.add(newObstacleRock);
                } else {
                    const newObstacleCone = new ObstacleCone();
                    this.add(newObstacleCone);
                }

                // Decrease interval, but not below minimum
                currentMin = Math.max(minInterval, currentMin - decrease);
                currentMax = Math.max(maxInterval, currentMax - decrease);
            }
            setTimeout(spawn, currentMin + Math.random() * (currentMax - currentMin));
        };
        spawn();
    };

    startScoreCounter() {
        setInterval(() => {
            if (this.bear && !this.bear.isKilled()) {
            this.#score += 2;
            this.ui.updateScore(this.#score);
            }
        }, 1000); // plus 2 points every second
    }

    lifeUpSpawner() {
        setInterval(() => {
            if (this.bear && !this.bear.isKilled()) {
                const newLifeUp = new Lifeup();
                this.add(newLifeUp);
            }
        }, 10000); // Spawn a new life up every 10 seconds
    }
}

new Game()

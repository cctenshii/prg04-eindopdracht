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
        
        const background1 = new Background();
        const background2 = new Background();
        background2.pos.x = 1280; // Position the second background to the right of the first

        this.add(background1);
        this.add(background2);

        console.log(background1);
        console.log(background2);

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

    startObstacleSpawner() {
        const spawn = () => {
            if (this.bear && !this.bear.isKilled()) {
                const cameraX = this.currentScene.camera.x;
                const screenRight = cameraX + this.drawWidth / 2;

                const spawnType = Math.random() < 0.5 ? "obstaclecone" : "obstaclerock";

                if (spawnType === "obstaclerock") {
                    const newObstacleRock = new ObstacleRock();
                    // newObstacleRock.pos = new Vector(screenRight - 50, 200 + Math.random() * 150);
                    // const scale = 0.2 + Math.random() * 0.4;
                    // newObstacleRock.scale = new Vector(scale, scale);
                    // newObstacleRock.vel = new Vector(-this.speed, 0);
                    this.add(newObstacleRock);
                } else {
                    const newObstacleCone = new ObstacleCone();
                    // newObstacleCone.pos = new Vector(screenRight - 50, 580);
                    // newObstacleCone.vel = new Vector(-this.speed, 0);
                    this.add(newObstacleCone);
                }
            }
            setTimeout(spawn, 2000 + Math.random() * 3000);
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

import { Actor, Color, Font, Label, Vector } from "excalibur";

export class UI extends Actor {

    #scoreLabel;
    #livesLabel;
    #highscoreLabel;

    onInitialize(engine) {
        this.#scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(100, 50),
            font: new Font({
                size: 30,
                family: 'Open Sans',
                color: Color.White
            })
        });

        this.#livesLabel = new Label({
            text: 'Lives: 3',
            pos: new Vector(100, 100),
            font: new Font({
                size: 30,
                family: 'Open Sans',
                color: Color.White
            })
        });

        const highscore = localStorage.getItem('highscore') || 0;
        this.#highscoreLabel = new Label({
            text: `Highscore: ${highscore}`,
            pos: new Vector(100, 150),
            font: new Font({
                size: 30,
                family: 'Open Sans',
                color: Color.White
            })
        });

        this.addChild(this.#scoreLabel);
        this.addChild(this.#livesLabel);
        this.addChild(this.#highscoreLabel);
    }

    updateScore(score) {
        this.#scoreLabel.text = `Score: ${score}`;
        const highscore = Number(localStorage.getItem('highscore')) || 0;
        if (score > highscore) {
            localStorage.setItem('highscore', score);
            this.#highscoreLabel.text = `Highscore: ${score}`;
        }
    }

    updateLives(lives) {
        this.#livesLabel.text = `Lives: ${lives}`;
    }
}
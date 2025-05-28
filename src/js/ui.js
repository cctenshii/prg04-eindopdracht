import { Actor, Color, Font, Label, Vector } from "excalibur";

export class UI extends Actor {

    label;
    label2;

    onInitialize(engine) {
        this.label = new Label({
            text: 'Score: 0',
            pos: new Vector(100, 50),
            font: new Font({
                size: 30,
                family: 'Open Sans',
                color: Color.White
            })
        });

        this.label2 = new Label({
            text: 'Lives: 3',
            pos: new Vector(100, 100),
            font: new Font({
                size: 30,
                family: 'Open Sans',
                color: Color.White
            })
        });

        this.addChild(this.label);
        this.addChild(this.label2);
    }

    updateScore(score) {
        this.label.text = `Score: ${score}`;
    }

    updateLives(lives) {
        this.label2.text = `Lives: ${lives}`;
    }
}
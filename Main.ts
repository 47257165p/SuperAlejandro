import Point = Phaser.Point;

module Game {
   export class SuperAlejandro extends Phaser.Game {
        global:any;

        constructor() {
            super(1400, 700, Phaser.AUTO, "gameDiv");

            this.global = {
                puntos: 0,
                PLAYER_MAX_VELOCITY_X: 300
            };

            this.state.add("menuStage", MenuStage);
            this.state.add("firstStage", FirstStage);

            this.state.start("menuStage");
        }
    }
}

window.onload = () => {
    var game = new Game.SuperAlejandro();
};
import Point = Phaser.Point;

module Game {
   export class SuperAlejandro extends Phaser.Game {
        global:any;

        constructor() {
            super(1400, 700, Phaser.AUTO, "gameDiv");

            this.global = {
                puntos: 0
            };

            this.state.add("firstStage", FirstStage);

            this.state.start("firstStage");
        }
    }
}

window.onload = () => {
    //probar var game quizás se pueda borrar y dejar simplemente new Game....
    var game = new Game.SuperAlejandro();
};
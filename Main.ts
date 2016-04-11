import Point = Phaser.Point;

module Game {
   export class SuperAlejandro extends Phaser.Game {
        global:any;

        constructor() {
            super(500, 340, Phaser.AUTO, "gameDiv");

            this.global = {
                puntos: 0
            };

            this.state.add("introState", IntroState);

            this.state.start("introState");
        }
    }
}

window.onload = () => {
    //probar var game quizás se pueda borrar y dejar simplemente new Game....
    var game = new Game.SuperAlejandro();
};
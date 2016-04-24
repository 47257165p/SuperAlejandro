/**
 * Created by Alejandro on 24/04/2016.
 */

module Game {
    export class GameOverStage extends Phaser.State
    {
        gameName;
        pressLabel;
        preload():void
        {
            super.preload();
        }
        create():void
        {
            super.create();
            //Damos color al background del menú
            this.game.stage.backgroundColor = "#aaaaa";

            //Creamos un label con el nombre del juegoNombre del juego
            this.gameName = this.add.text(
                700, 100, 'SuperAlejandro Game',
                {font: '50px Arial', fill: '#ffffff'}
            );
            this.gameName.anchor.setTo(0.5, 0.5);
            this.gameName.fixedToCamera = true;
            //Información de cómo empezar
            this.pressLabel = this.game.add.text(
                700,
                200,
                'GAME OVER Press enter to restart',
                {font: '25px Arial', fill: '#ffffff'}
            );
            this.pressLabel.anchor.setTo(0.5, 0.5);

            //Creamos el input del enter
            var pressEnter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            //Le damos un método a enter para cuando lo pulsamos
            pressEnter.onDown.addOnce(this.start, this);
        }

        start():void {
            // Start the actual game
            this.game.state.start('firstStage');
        }
    }
}
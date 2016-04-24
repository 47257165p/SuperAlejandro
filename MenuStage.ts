/**
 * Created by Alejandro on 24/04/2016.
 */

module Game {
    export class MenuStage extends Phaser.State 
    {
        global:any;

        create():void {
            this.global = (<SuperAlejandro>this.game).global;

            //Damos color al background del menú
            this.game.stage.backgroundColor = "#4488AA";

            //Creamos un label con el nombre del juegoNombre del juego
            var nameLabel = this.add.text(
                this.world.centerX, 80, 'SuperAlejandro Game',
                {font: '50px Arial', fill: '#ffffff'}
            );
            nameLabel.anchor.setTo(0.5, 0.5);

            //Información de cómo empezar
            var startLabel = this.add.text(
                this.world.centerX,
                this.world.centerY,
                'Press enter to start',
                {font: '25px Arial', fill: '#ffffff'}
            );
            startLabel.anchor.setTo(0.5, 0.5);

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
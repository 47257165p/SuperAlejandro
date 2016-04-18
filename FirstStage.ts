/**
 * Created by 47257165p on 06/04/16.
 */

module Game {
    export class FirstStage extends Phaser.State
    {
        private tilemap:Phaser.Tilemap;
        private background:Phaser.TilemapLayer;

        preload():void
        {
            super.preload();

            this.load.tilemap('tilemap', 'assets/firstStage.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tilemapimage', 'assets/firstStage.png');

            this.physics.startSystem(Phaser.Physics.ARCADE);
        }

        create():void
        {
            super.create();
            this.tilemap = this.game.add.tilemap('tilemap');
            /*this.tilemap.addTilesetImage('tiles_spritesheet', 'tilemapimage');
            this.background = this.tilemap.createLayer('background');*/
        }
    }
}
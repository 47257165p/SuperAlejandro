/**
 * Created by 47257165p on 06/04/16.
 */

module Game {
    export class FirstStage extends Phaser.State
    {
        private tilemap:Phaser.Tilemap;
        private background:Phaser.TilemapLayer;
        private lastBackground:Phaser.TilemapLayer;
        private ground:Phaser.TilemapLayer;
        private player:Phaser.Sprite;

        preload():void
        {
            super.preload();

            this.load.tilemap('tilemap', 'assets/firstStage.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('muchmap', 'assets/tiles_spritesheet.png');
            this.load.image('hill', 'assets/hill_smallAlt.png');
            this.load.image('bg', 'assets/bg.png');
            this.load.atlasJSONHash('playerSprites', 'assets/p1_walk/p1_walk.png', 'assets/p1_walk/p1_walk.json');


            this.physics.startSystem(Phaser.Physics.ARCADE);
        }

        create():void
        {
            super.create();
            this.configureMap();
            this.configurePlayer();

        }

        configureMap():void
        {
            this.tilemap = this.game.add.tilemap('tilemap');
            this.tilemap.addTilesetImage('tiles_spritesheet', 'muchmap');
            this.tilemap.addTilesetImage('hill_smallAlt', 'hill');
            this.tilemap.addTilesetImage('bg', 'bg');
            this.lastBackground = this.tilemap.createLayer('lastBackground');
            this.background = this.tilemap.createLayer('background');
            this.ground = this.tilemap.createLayer('ground');
        }

        configurePlayer():void
        {
            var sprite = new sprite
            this.player = this.game.add.sprite(
                this.game.world.centerX,
                this.game.world.centerY,
                'playerSprites', null, null

            );
        }
    }
}
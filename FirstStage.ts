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
        private cursor:Phaser.CursorKeys;

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
            this.cursor = this.input.keyboard.createCursorKeys();
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
            this.physics.arcade.enable(this.ground);
            this.tilemap.setCollisionBetween(1, 10000, true, this.ground);
        }

        configurePlayer():void
        {
            this.player = this.game.add.sprite(
                this.game.world.centerX,
                this.game.world.centerY,
                'playerSprites', 'waiting');
            this.player.anchor.setTo(0.5, 0.5);
            this.physics.arcade.enable(this.player);
            this.player.body.gravity.y = 1000;
            this.player.body.drag.setTo(600, 100);
            this.game.camera.follow(this.player);
        }


        update():void {
            super.update();
            this.game.physics.arcade.collide(this.player, this.ground);
            this.game.physics.arcade.collide(this.ground, this.player);

            this.checkMoving();
        }

        checkMoving():void {
            // Si pulsamos el cursor izquierdo
            if (this.cursor.left.isDown)
            {
                // Movemos al jugador a la izquierda
                this.player.body.acceleration.x = -200;
            }
            // Si pulsamos el cursor derecho
            else if (this.cursor.right.isDown)
            {
                // Movemos al jugador a la derecha
                this.player.body.acceleration.x = 200;
            }
            // Si no se pulsan ni el cursor izquierdo ni el derecho
            else
            {
                // el jugador se para
                this.player.body.velocity.x = 0;
            }
            // Si pulsamos la flecha arriba y el jugador está tocando el suelo
            if (this.cursor.up.isDown)
            {
                // el jugador se mueve hacia arriba (salto)
                this.player.body.velocity.y = -600;
            }
        }
    }
}
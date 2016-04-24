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
        private touchable:Phaser.TilemapLayer;
        private flys;
        private bubles;
        private snails;
        player:Phaser.Sprite;
        cursor:Phaser.CursorKeys;
        global:any;

        preload():void
        {
            super.preload();

            this.load.tilemap('tilemap', 'assets/firstStage.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('muchmap', 'assets/tiles_spritesheet.png');
            this.load.image('hill', 'assets/hill_smallAlt.png');
            this.load.image('bg', 'assets/bg.png');
            this.load.image('flyFly1', 'assets/flyFly1.png');
            this.load.image('slime1', 'assets/slimeWalk1.png');
            this.load.image('snail1', 'assets/snailWalk1.png');
            this.load.atlas('playerSprites', 'assets/p1_walk/p1_walk.png', 'assets/p1_walk/p1_walk.json');

            this.physics.startSystem(Phaser.Physics.ARCADE);
        }

        create():void
        {
            super.create();
            this.global = (<SuperAlejandro>this.game).global;
            this.cursor = this.input.keyboard.createCursorKeys();
            this.configureMap();
            this.configurePlayer();
            this.configureFlys();
            this.configureBubles();
            this.configureSnails();
            //Cambiamos los límites del mapa para ajustarlos al tamaño de nuestro mapa
            this.world.setBounds(0, 0, 21000, 700);
        }

        configureMap():void
        {
            //Añadimos la información al tilemap
            this.tilemap = this.game.add.tilemap('tilemap');
            this.tilemap.addTilesetImage('tiles_spritesheet', 'muchmap');
            this.tilemap.addTilesetImage('hill_smallAlt', 'hill');
            this.tilemap.addTilesetImage('bg', 'bg');
            this.tilemap.addTilesetImage('flyFly1', 'flyFly1');
            //Creamos los layers
            this.lastBackground = this.tilemap.createLayer('lastBackground');
            this.background = this.tilemap.createLayer('background');
            this.ground = this.tilemap.createLayer('ground');
            this.touchable = this.tilemap.createLayer('touchable');
            //Le damos las físicas a los layers con los que necesitamos interactuar
            this.physics.arcade.enable(this.ground);
            this.physics.arcade.enable(this.touchable);
            //Le decimos entre qué objetos queremos collide
            this.tilemap.setCollisionBetween(1, 10000, true, this.ground);
            this.tilemap.setCollisionBetween(1, 10000, true, this.touchable);
        }

        configurePlayer():void
        {
            //Creamos el sprite
            this.player = this.game.add.sprite(
                200,
                450,
                'playerSprites');
            //Damos el anchor adecuado para que concuerde con el dibujo
            this.player.anchor.setTo(0.5, 0.5);
            this.configureAnimations();
            //Otorgamos físicas al sprite
            this.physics.arcade.enable(this.player);
            //Le damos gravedad para que no se quede volando al saltar
            this.player.body.gravity.y = 800;
            //Le otorgamos rozamiento para que no se deslice permanentemente
            this.player.body.drag.x = 800;
            //Restringimos la velocidad máxima
            this.player.body.maxVelocity.x = this.global.PLAYER_MAX_VELOCITY_X;
            //Fijamos la cámara en el player
            this.game.camera.follow(this.player);
            //Activamos la animación waiting
            this.player.play('waiting');
        }

        configureFlys():void
        {
            //Creamos el grupo de flys
            this.flys = this.game.add.group();
            this.flys.enableBody = true;

            //Creamos todos los objetos flys cuya id sea 170 mediante la imagen precargada flyFly1
            //y se lo añadimos al grupo flys
            this.tilemap.createFromObjects('flys', 170, 'flyFly1', 0, true, false, this.flys);
        }

        configureBubles():void
        {
            //Creamos el grupo de bubles
            this.bubles = this.game.add.group();
            this.bubles.enableBody = true;

            //Creamos todos los objetos bubles cuya id sea 171 mediante la imagen precargada slime1
            //y se lo añadimos al grupo bubles
            this.tilemap.createFromObjects('bubles', 171, 'slime1', 0, true, false, this.bubles);
        }

        configureSnails():void
        {
            //Creamos el grupo de snails
            this.snails = this.game.add.group();
            this.snails.enableBody = true;

            //Creamos todos los objetos snails cuya id sea 172 mediante la imagen precargada snail1
            //y se lo añadimos al grupo snails
            this.tilemap.createFromObjects('snail', 172, 'snail1', 0, true, false, this.flys);
        }
        
        //Método para añadir animations al player mediante un JsonAtlas
        configureAnimations()
        {
            this.player.animations.add('waiting', ['wait1'], 1, true);
            this.player.animations.add('move',
                ['move1', 'move2', 'move3', 'move4', 'move5', 'move6', 'move7', 'move8'],
                10, true);
            this.player.animations.add('jump', ['jump1', 'jump2'], 2, true);
        }

        update():void {
            super.update();

            this.checkCollide();
            this.checkMoving();
        }

        checkMoving():void
        {
            //Comprobamos si el cursor izquierdo está pulsado
            if (this.cursor.left.isDown)
            {
                //Movemos al player a la izquierda
                this.player.body.acceleration.x = -180;
                //Si el player está mirando a la derecha le cambiamos la escala a la inversa para que se gire
                this.player.scale.x = -1;
                //Activamos las animaciones de moverse
                this.player.play('move');
            }
            //Comprobamos si el cursor derecho está pulsado
            else if (this.cursor.right.isDown)
            {
                //Movemos el player a la derecha
                this.player.body.acceleration.x = 180;
                //Comprobamos si el player estaba girado a la izquierda,
                // si es así cambia la escala a inversa para girarse
                if (this.player.scale.x = -1)
                {
                    this.player.scale.x = 1;
                }
                //Activamos las animaciones de moverse
                this.player.play('move')
            }
            //Si no se pulsan ni el cursor izquierdo ni el derecho
            else
            {
                //El player se para y activa la animación de parado
                this.player.play('waiting');
                this.player.body.acceleration.x = 0;
            }
            //Comprobamos pulsamos la flecha arriba y el jugador está tocando el suelo
            //El método touching no funciona ya que con collide devuelve siempre false
            if (this.cursor.up.isDown && this.player.body.blocked.down)
            {
                //El jugador se mueve hacia arriba (salto) y activa la animación de salto
                this.player.body.velocity.y = -500;
                this.player.play('jump');
            }
        }

        //Método de collide entre los elementos
        checkCollide():void
        {
            this.game.physics.arcade.collide(this.player, this.ground);
            this.game.physics.arcade.collide(this.player, this.touchable);
        }
    }
}
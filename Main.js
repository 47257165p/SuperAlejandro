var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Point = Phaser.Point;
var Game;
(function (Game) {
    var SuperAlejandro = (function (_super) {
        __extends(SuperAlejandro, _super);
        function SuperAlejandro() {
            _super.call(this, 1400, 700, Phaser.AUTO, "gameDiv");
            this.global = {
                PLAYER_MAX_VELOCITY_X: 300
            };
            this.state.add("menuStage", Game.MenuStage);
            this.state.add("firstStage", Game.FirstStage);
            this.state.add("gameOverStage", Game.GameOverStage);
            this.state.start("menuStage");
        }
        return SuperAlejandro;
    }(Phaser.Game));
    Game.SuperAlejandro = SuperAlejandro;
})(Game || (Game = {}));
window.onload = function () {
    var game = new Game.SuperAlejandro();
};
/**
 * Created by Alejandro on 24/04/2016.
 */
var Game;
(function (Game) {
    var MenuStage = (function (_super) {
        __extends(MenuStage, _super);
        function MenuStage() {
            _super.apply(this, arguments);
        }
        MenuStage.prototype.create = function () {
            //Damos color al background del menú
            this.game.stage.backgroundColor = "#4488AA";
            //Creamos un label con el nombre del juegoNombre del juego
            var nameLabel = this.game.add.text(this.world.centerX, 80, 'SuperAlejandro Game', { font: '50px Arial', fill: '#ffffff' });
            nameLabel.anchor.setTo(0.5, 0.5);
            //Información de cómo empezar
            var startLabel = this.add.text(this.world.centerX, this.world.centerY, 'Press enter to start', { font: '25px Arial', fill: '#ffffff' });
            startLabel.anchor.setTo(0.5, 0.5);
            //Creamos el input del enter
            var pressEnter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            //Le damos un método a enter para cuando lo pulsamos
            pressEnter.onDown.addOnce(this.start, this);
        };
        MenuStage.prototype.start = function () {
            // Start the actual game
            this.game.state.start('firstStage');
        };
        return MenuStage;
    }(Phaser.State));
    Game.MenuStage = MenuStage;
})(Game || (Game = {}));
/**
 * Created by 47257165p on 06/04/16.
 */
var Game;
(function (Game) {
    var FirstStage = (function (_super) {
        __extends(FirstStage, _super);
        function FirstStage() {
            _super.apply(this, arguments);
        }
        FirstStage.prototype.preload = function () {
            _super.prototype.preload.call(this);
            this.load.tilemap('tilemap', 'assets/firstStage.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('muchmap', 'assets/tiles_spritesheet.png');
            this.load.image('hill', 'assets/hill_smallAlt.png');
            this.load.image('bg', 'assets/bg.png');
            this.load.image('flyFly1', 'assets/flyFly1.png');
            this.load.image('slime1', 'assets/slimeWalk1.png');
            this.load.image('snail1', 'assets/snailWalk1.png');
            this.load.atlas('playerSprites', 'assets/p1_walk/p1_walk.png', 'assets/p1_walk/p1_walk.json');
            this.physics.startSystem(Phaser.Physics.ARCADE);
        };
        FirstStage.prototype.create = function () {
            _super.prototype.create.call(this);
            this.lives = 3;
            this.global = this.game.global;
            this.cursor = this.input.keyboard.createCursorKeys();
            this.configureMap();
            this.configurePlayer();
            this.configureFlys();
            this.configureBubles();
            this.configureSnails();
            this.livesLabel();
            //Cambiamos los límites del mapa para ajustarlos al tamaño de nuestro mapa
            this.world.setBounds(0, 0, 21000, 700);
        };
        FirstStage.prototype.configureMap = function () {
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
        };
        FirstStage.prototype.configurePlayer = function () {
            //Creamos el sprite
            this.player = this.game.add.sprite(200, 450, 'playerSprites');
            //Damos el anchor adecuado para que concuerde con el dibujo
            this.player.anchor.setTo(0.5, 0.5);
            this.configurePlayerAnimations();
            //Otorgamos físicas al sprite
            this.physics.arcade.enable(this.player);
            //Le damos gravedad para que no se quede volando al saltar
            this.player.body.gravity.y = 800;
            //Le otorgamos rozamiento para que no se deslice permanentemente
            this.player.body.drag.x = 800;
            /*//Hacemos que el player choque con los límites del mapa
            this.player.body.collideWorldBounds = true;
            //Hacemos que compruebe si se choca
            this.player.checkWorldBounds = true;
            //Si
            this.player.events.onOutOfBounds.add(this.killBall, this);*/
            //Restringimos la velocidad máxima
            this.player.body.maxVelocity.x = this.global.PLAYER_MAX_VELOCITY_X;
            //Fijamos la cámara en el player
            this.game.camera.follow(this.player);
            //Activamos la animación waiting
            this.player.play('waiting');
        };
        FirstStage.prototype.configureFlys = function () {
            //Creamos el grupo de flys
            this.flys = this.game.add.group();
            this.flys.enableBody = true;
            //Creamos todos los objetos flys cuya id sea 170 mediante la imagen precargada flyFly1
            //y se lo añadimos al grupo flys
            this.tilemap.createFromObjects('flys', 170, 'flyFly1', 0, true, false, this.flys);
        };
        FirstStage.prototype.configureBubles = function () {
            //Creamos el grupo de bubles
            this.bubles = this.game.add.group();
            this.bubles.enableBody = true;
            //Creamos todos los objetos bubles cuya id sea 171 mediante la imagen precargada slime1
            //y se lo añadimos al grupo bubles
            this.tilemap.createFromObjects('bubles', 171, 'slime1', 0, true, false, this.bubles);
        };
        FirstStage.prototype.configureSnails = function () {
            //Creamos el grupo de snails
            this.snails = this.game.add.group();
            this.snails.enableBody = true;
            //Creamos todos los objetos snails cuya id sea 172 mediante la imagen precargada snail1
            //y se lo añadimos al grupo snails
            this.tilemap.createFromObjects('snail', 172, 'snail1', 0, true, false, this.flys);
        };
        //Método para añadir animations al player mediante un JsonAtlas
        FirstStage.prototype.configurePlayerAnimations = function () {
            this.player.animations.add('waiting', ['wait1'], 1, true);
            this.player.animations.add('move', ['move1', 'move2', 'move3', 'move4', 'move5', 'move6', 'move7', 'move8'], 10, true);
            this.player.animations.add('jump', ['jump1', 'jump2'], 2, true);
        };
        FirstStage.prototype.livesLabel = function () {
            //Creamos un label con el número de vidas
            this.labelLives = this.add.text(90, 50, 'Lives: ' + this.lives, { font: '35px Arial', fill: '#AS2700' });
            this.labelLives.anchor.setTo(0.5, 0.5);
            //Fijamos el label a la cámara
            this.labelLives.fixedToCamera = true;
        };
        FirstStage.prototype.update = function () {
            _super.prototype.update.call(this);
            this.checkCollide();
            this.checkMoving();
        };
        FirstStage.prototype.checkMoving = function () {
            //Comprobamos si el cursor izquierdo está pulsado
            if (this.cursor.left.isDown) {
                //Movemos al player a la izquierda
                this.player.body.acceleration.x = -180;
                //Si el player está mirando a la derecha le cambiamos la escala a la inversa para que se gire
                this.player.scale.x = -1;
                //Activamos las animaciones de moverse
                this.player.play('move');
            }
            else if (this.cursor.right.isDown) {
                //Movemos el player a la derecha
                this.player.body.acceleration.x = 180;
                //Comprobamos si el player estaba girado a la izquierda,
                // si es así cambia la escala a inversa para girarse
                if (this.player.scale.x = -1) {
                    this.player.scale.x = 1;
                }
                //Activamos las animaciones de moverse
                this.player.play('move');
            }
            else {
                //El player se para y activa la animación de parado
                this.player.play('waiting');
                this.player.body.acceleration.x = 0;
            }
            //Comprobamos pulsamos la flecha arriba y el jugador está tocando el suelo
            //El método touching no funciona ya que con collide devuelve siempre false
            if (this.cursor.up.isDown && this.player.body.blocked.down) {
                //El jugador se mueve hacia arriba (salto) y activa la animación de salto
                this.player.body.velocity.y = -500;
                this.player.play('jump');
            }
        };
        //Método de collide entre los elementos
        FirstStage.prototype.checkCollide = function () {
            this.game.physics.arcade.collide(this.player, this.ground);
            this.game.physics.arcade.collide(this.player, this.touchable);
            if (this.player.y > this.world.height) {
                this.killPlayer();
            }
        };
        FirstStage.prototype.killPlayer = function () {
            this.player.kill();
            this.lives = this.lives - 1;
            this.labelLives.setText('Lives: ' + this.lives);
            if (this.lives == 0) {
                this.game.state.start('gameOverStage');
            }
            else {
                this.configurePlayer();
            }
        };
        return FirstStage;
    }(Phaser.State));
    Game.FirstStage = FirstStage;
})(Game || (Game = {}));
/**
 * Created by Alejandro on 24/04/2016.
 */
var Game;
(function (Game) {
    var GameOverStage = (function (_super) {
        __extends(GameOverStage, _super);
        function GameOverStage() {
            _super.apply(this, arguments);
        }
        GameOverStage.prototype.preload = function () {
            _super.prototype.preload.call(this);
        };
        GameOverStage.prototype.create = function () {
            _super.prototype.create.call(this);
            //Damos color al background del menú
            this.game.stage.backgroundColor = "#aaaaa";
            //Creamos un label con el nombre del juegoNombre del juego
            this.gameName = this.add.text(700, 100, 'SuperAlejandro Game', { font: '50px Arial', fill: '#ffffff' });
            this.gameName.anchor.setTo(0.5, 0.5);
            this.gameName.fixedToCamera = true;
            //Información de cómo empezar
            this.pressLabel = this.game.add.text(700, 200, 'GAME OVER Press enter to restart', { font: '25px Arial', fill: '#ffffff' });
            this.pressLabel.anchor.setTo(0.5, 0.5);
            //Creamos el input del enter
            var pressEnter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            //Le damos un método a enter para cuando lo pulsamos
            pressEnter.onDown.addOnce(this.start, this);
        };
        GameOverStage.prototype.start = function () {
            // Start the actual game
            this.game.state.start('firstStage');
        };
        return GameOverStage;
    }(Phaser.State));
    Game.GameOverStage = GameOverStage;
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map
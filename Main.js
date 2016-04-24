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
                puntos: 0
            };
            this.state.add("firstStage", Game.FirstStage);
            this.state.start("firstStage");
        }
        return SuperAlejandro;
    }(Phaser.Game));
    Game.SuperAlejandro = SuperAlejandro;
})(Game || (Game = {}));
window.onload = function () {
    //probar var game quizás se pueda borrar y dejar simplemente new Game....
    var game = new Game.SuperAlejandro();
};
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
            this.load.atlas('playerSprites', 'assets/p1_walk/p1_walk.png', 'assets/p1_walk/p1_walk.json');
            this.physics.startSystem(Phaser.Physics.ARCADE);
        };
        FirstStage.prototype.create = function () {
            _super.prototype.create.call(this);
            this.cursor = this.input.keyboard.createCursorKeys();
            this.configureMap();
            this.configurePlayer();
            this.world.setBounds(0, 0, 21000, 700);
        };
        FirstStage.prototype.configureMap = function () {
            this.tilemap = this.game.add.tilemap('tilemap');
            this.tilemap.addTilesetImage('tiles_spritesheet', 'muchmap');
            this.tilemap.addTilesetImage('hill_smallAlt', 'hill');
            this.tilemap.addTilesetImage('bg', 'bg');
            this.lastBackground = this.tilemap.createLayer('lastBackground');
            this.background = this.tilemap.createLayer('background');
            this.ground = this.tilemap.createLayer('ground');
            this.touchable = this.tilemap.createLayer('touchable');
            this.physics.arcade.enable(this.ground);
            this.physics.arcade.enable(this.touchable);
            this.tilemap.setCollisionBetween(1, 10000, true, this.ground);
            this.tilemap.setCollisionBetween(1, 10000, true, this.touchable);
        };
        FirstStage.prototype.configurePlayer = function () {
            this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playerSprites');
            this.player.anchor.setTo(0.5, 0.5);
            this.configureAnimations();
            this.physics.arcade.enable(this.player);
            this.player.body.gravity.y = 800;
            this.game.camera.follow(this.player);
            this.player.play('waiting');
        };
        FirstStage.prototype.configureAnimations = function () {
            this.player.animations.add('waiting', ['wait1'], 1, true);
            this.player.animations.add('moveRight', ['move1', 'move2', 'move3', 'move4', 'move5', 'move6', 'move7', 'move8'], 10, true);
            //this.player.animations.add('moveLeft', [8,9,10,11,12,13,14,15], 10,true);
            this.player.animations.add('jump', ['jump1', 'jump2'], 2, true);
        };
        FirstStage.prototype.update = function () {
            _super.prototype.update.call(this);
            this.checkCollide();
            this.checkMoving();
        };
        FirstStage.prototype.checkMoving = function () {
            // Si pulsamos el cursor izquierdo
            if (this.cursor.left.isDown) {
                // Movemos al jugador a la izquierda
                this.player.body.acceleration.x = -200;
            }
            else if (this.cursor.right.isDown) {
                // Movemos al jugador a la derecha
                this.player.body.acceleration.x = 200;
                this.player.play('moveRight');
            }
            else {
                // el jugador se para
                this.player.play('waiting');
                this.player.body.acceleration.x = 0;
                this.player.body.velocity.x = 0;
            }
            // Si pulsamos la flecha arriba y el jugador está tocando el suelo
            if (this.cursor.up.isDown) {
                // el jugador se mueve hacia arriba (salto)
                this.player.body.velocity.y = -600;
                this.player.play('jump');
            }
        };
        FirstStage.prototype.checkCollide = function () {
            this.game.physics.arcade.collide(this.player, this.ground);
            this.game.physics.arcade.collide(this.player, this.touchable);
        };
        return FirstStage;
    }(Phaser.State));
    Game.FirstStage = FirstStage;
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map
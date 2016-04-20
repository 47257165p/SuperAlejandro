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
    })(Phaser.Game);
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
            this.load.atlasJSONHash('playerSprites', 'assets/p1_walk/p1_walk.png', 'assets/p1_walk/p1_walk.json');
            this.physics.startSystem(Phaser.Physics.ARCADE);
        };
        FirstStage.prototype.create = function () {
            _super.prototype.create.call(this);
            this.configureMap();
            this.configurePlayer();
        };
        FirstStage.prototype.configureMap = function () {
            this.tilemap = this.game.add.tilemap('tilemap');
            this.tilemap.addTilesetImage('tiles_spritesheet', 'muchmap');
            this.tilemap.addTilesetImage('hill_smallAlt', 'hill');
            this.tilemap.addTilesetImage('bg', 'bg');
            this.lastBackground = this.tilemap.createLayer('lastBackground');
            this.background = this.tilemap.createLayer('background');
            this.ground = this.tilemap.createLayer('ground');
        };
        FirstStage.prototype.configurePlayer = function () {
            var sprite = new sprite;
            this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playerSprites', null, null);
        };
        return FirstStage;
    })(Phaser.State);
    Game.FirstStage = FirstStage;
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map
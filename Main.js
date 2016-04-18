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
            _super.call(this, 1400, 800, Phaser.AUTO, "gameDiv");
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
            this.load.image('tilemapimage', 'assets/firstStage.png');
            this.physics.startSystem(Phaser.Physics.ARCADE);
        };
        FirstStage.prototype.create = function () {
            _super.prototype.create.call(this);
            this.tilemap = this.game.add.tilemap('tilemap');
            /*this.tilemap.addTilesetImage('tiles_spritesheet', 'tilemapimage');
            this.background = this.tilemap.createLayer('background');*/
        };
        return FirstStage;
    })(Phaser.State);
    Game.FirstStage = FirstStage;
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map
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
            _super.call(this, 500, 340, Phaser.AUTO, "gameDiv");
            this.global = {
                puntos: 0
            };
            this.state.add("introState", Game.IntroState);
            this.state.start("introState");
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
    var IntroState = (function (_super) {
        __extends(IntroState, _super);
        function IntroState() {
            _super.apply(this, arguments);
        }
        IntroState.prototype.preload = function () {
            _super.prototype.preload.call(this);
            //Agregamos
            this.load.image('introImage', 'assets/progressBar.png');
            // Agregamos un texto de cargando a la pantalla
            var etiquetaCargando = this.add.text(this.world.centerX, 150, 'cargando...', { font: '30px Arial', fill: '#ffffff' });
            etiquetaCargando.anchor.setTo(0.5, 0.5);
            // Muestra la barra de progreso
            var progressBar = this.add.sprite(this.world.centerX, 200, 'progressBar');
            progressBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(progressBar);
            // Precargamos los sprites
            this.load.image("player", "assets/player.png");
            this.load.image('paredV', 'assets/wallVertical.png');
            this.load.image('paredH', 'assets/wallHorizontal.png');
            this.load.image('moneda', 'assets/coin.png');
            this.load.image('enemigo', 'assets/enemy.png');
            // Cargamos una imagen que hará de fondo en la pantalla de menu
            this.load.image('fondo', 'assets/background.png');
        };
        IntroState.prototype.create = function () {
            _super.prototype.create.call(this);
            this.game.state.start('menu');
        };
        return IntroState;
    })(Phaser.State);
    Game.IntroState = IntroState;
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map
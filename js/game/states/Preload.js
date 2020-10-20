ZenvaRunner.Preload = function(){
    this.ready = false;
};

ZenvaRunner.Preload.prototype = {
    preload: function(){

        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('ground', 'assets/images/ground1.png');
        this.load.image('background', 'assets/images/background1.png');
        this.load.image('foreground', 'assets/images/foreground1.png');
        this.load.image('bullet', 'assets/images/syringe.png');
        this.load.image('boss', 'assets/images/boss.png');
     
        this.load.spritesheet('player', 'assets/images/doc.png', 100, 100, 6);
        this.load.spritesheet('virus', 'assets/images/virus1.png', 100, 100, 5);
        this.load.spritesheet('virus2', 'assets/images/virus2.png', 100, 100, 5);

        this.load.audio('gameMusic', ['assets/audio/Pamgaea.mp3', 'assets/audio/Pamgaea.ogg']);
        this.load.audio('bounce', 'assets/audio/bounce.wav');
        this.load.audio('death', 'assets/audio/game over.mp3');
        this.load.audio('shot', 'assets/audio/shot.mp3');

        this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');

        this.load.onLoadComplete.add(this.onLoadComplete, this);
    },
    create: function(){
        this.preloadBar.cropEnabled = false;
    },
    update: function(){
        if (this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
            this.state.start('MainMenu');
        }
    },
    onLoadComplete: function(){
        this.ready = true;
    }
};
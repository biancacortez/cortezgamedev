Phaser.Plugin.wig = function (game, parent) {
    'use strict';
    Phaser.Plugin.call(this, game, parent);
 
    this.offsetX = 0;
    this.offsetY = 0;

    this.size = 20;
    this.amt = 0.0;

    this.cache = 0;
    this.objectToShake = this.game.camera.displayObject;
};
 
Phaser.Plugin.wig.prototype = Object.create(Phaser.Plugin.prototype);
 
Phaser.Plugin.wig.prototype.postUpdate = function () {
    'use strict';
    this.cache = this.amt * this.size;

    this.offsetX = ((Math.random() * 2 - 1) * this.cache) | 0;
    this.offsetY = ((Math.random() * 2 - 1) * this.cache) | 0;

    this.objectToShake.position.x += this.offsetX;
    this.objectToShake.position.y += this.offsetY;

    this.amt *= 0.95; // Todo: framerate independence!
};
 
Phaser.Plugin.wig.prototype.postRender = function () {
    'use strict';
    this.objectToShake.position.x -= this.offsetX;
    this.objectToShake.position.y -= this.offsetY;
};
 
Phaser.Plugin.wig.prototype.shake = function (size, objectToShake) {
    'use strict';
    this.size = size || this.size;
    this.objectToShake = objectToShake || this.objectToShake;
    
    this.amt = 1.0;
};




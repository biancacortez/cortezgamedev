var Boss = function(game, x, y, key, frame) {
    key = 'boss';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(1.2);
    this.anchor.setTo(2.0);

    this.animations.add('fly');

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);

};

Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.onRevived = function() {

    this.game.add.tween(this).to({y: this.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    //this.body.velocity.x = -200;
    this.animations.play('fly', 0, true);
};
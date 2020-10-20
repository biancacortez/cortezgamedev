var Enemy = function(game, x, y, key, frame){ 
    key = 'virus';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(1.3);
    this.anchor.setTo(1.4);

    this.animations.add('walk',[0,1,2,3,4], true);

    this.game.physics.arcade.enableBody(this); 
    this.body.allowGravity = false;

    this.events.onRevived.add(this.onRevived, this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function(){
    this.game.add.tween(this).to({y: this.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    this.body.velocity.x = -200;
    this.animations.play('walk', 8, true);
};
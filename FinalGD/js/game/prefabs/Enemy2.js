var Enemy2 = function(game, x, y, key, frame){ 
    key = 'virus2';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(1.5);
    this.anchor.setTo(2.0);

    this.animations.add('walk',[0,1,2,3,4], true);

    this.game.physics.arcade.enableBody(this); 
    this.body.allowGravity = false;


    this.events.onRevived.add(this.onRevived, this);
};

Enemy2.prototype = Object.create(Phaser.Sprite.prototype);
Enemy2.prototype.constructor = Enemy2;

Enemy2.prototype.onRevived = function(){
    this.game.add.tween(this).to({y: this.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    this.body.velocity.x = -200;
    this.animations.play('walk', 8, true);
};
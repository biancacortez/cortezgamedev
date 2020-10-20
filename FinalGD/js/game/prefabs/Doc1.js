var Doc1 = function(game, x, y, key, frame){ 
    key = 'doctor1';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(1.5);
    this.anchor.setTo(0.5);

    this.animations.add('run',[0,1,2,3,4], true);

    this.game.physics.arcade.enableBody(this); 
    this.body.allowGravity = false;


    this.events.onRevived.add(this.onRevived, this);
};

Doc1.prototype = Object.create(Phaser.Sprite.prototype);
Doc1.prototype.constructor = Doc1;

Doc1.prototype.onRevived = function(){
    this.game.add.tween(this).to({y: this.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    this.body.velocity.x = -200;
    this.animations.play('run', 9, true);
};
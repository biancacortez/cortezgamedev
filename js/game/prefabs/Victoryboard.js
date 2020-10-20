var Victoryboard = function(game){
    Phaser.Group.call(this, game); //Group is inheritance of Phaser with reference to the 'game'
};
Victoryboard.prototype = Object.create(Phaser.Group.prototype);
Victoryboard.prototype.constructor = Victoryboard;

//Two scoreboard function: show and restart
//scoreboard show will display a gameover text, the score, the high score and the the tap to play again text
Victoryboard.prototype.show = function(){
    //declare local variables
    var bmd, background, victoryText;

    //bitmapdata is like a canvass where we can draw or write on them
    //in this game we use game.width and game.height to show our bitmapdata full screen
    bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    bmd.ctx.fillStyle = '#000'; //black color
    bmd.ctx.fillRect(0,0, this.game.width, this.game.height); //draw rectangle

    background = this.game.add.sprite(0,0, bmd);
    background.alpha = 1.1; //opacity
    //background.fixedToCamera = true;

    this.add(background); // our scoreboard

    victoryText =  this.game.add.bitmapText(0, 300, 'minecraftia', 'VICTORY!!', 60);
    victoryText.x = this.game.width/2 - (victoryText.textWidth/ 2);
    victoryText.fixedToCamera = true;
    this.add(victoryText);

    starText = this.game.add.bitmapText(0, 450, 'minecraftia', 'Tap to play again!', 16);
    starText.x = this.game.width / 2 - (starText.textWidth/ 2);
    this.add(starText);

    

    this.game.input.onDown.addOnce(this.restart, this);
};
Victoryboard.prototype.restart = function(){
    this.game.state.start('Game', true, false);
};
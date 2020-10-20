ZenvaRunner.Game = function(){
    this.playerMinAngle = -20; //minimum player rotation
    this.playerMaxAngle = 20; //maximum player rotation

    this.enemyRate = 700; //this will spawn enemy every 500ms
    this.enemyTimer = 0; //create an enemy every game loop
   
    this.enemy2Rate = 500; //this will spawn enemy every 500ms
    this.enemy2Timer = 0; //create an enemy every game loop
    
    this.bossRate = 800; //this will spawn enemy every 500ms    
    this.bossTimer = 0; 

    this.bulletTime=0;

    this.score=0;
    this.kill=0;

    this.bossLife=20;



};
ZenvaRunner.Game.prototype = {
    create: function(){
        //show the same animation when user tap the screen
        this.background = this.game.add.tileSprite(0, 0, this.game.width, 512, 'background');
        this.background.autoScroll(-100, 0);
        this.foreground = this.game.add.tileSprite(0, 470, this.game.width, this.game.height -533, 'foreground');
        this.foreground.autoScroll(-100,0);
        this.ground = this.game.add.tileSprite(0, this.game.height -73, this.game.width, 73, 'ground');
        this.ground.autoScroll(-400, 0);

        this.player = this.add.sprite(400, this.game.height/1.0, 'player');
        this.player.anchor.setTo(1.5); 
        this.player.scale.setTo(1.4); 

        this.player.animations.add('walk',[0,1,2,3,4], true);
        this.player.animations.add('jump',[0,1,2,3,4], true);

        this.player.animations.play('walk', 2, true);


        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.physics.arcade.gravity.y = 400;

        this.game.physics.arcade.enableBody(this.ground); 
        this.ground.body.allowGravity = false; 
        this.ground.body.immovable = true; 

        this.game.physics.arcade.enableBody(this.player); 
        this.player.body.collideWorldBounds = true; 
        this.player.body.bounce.set(0.25); 

        this.enemies= this.game.add.group();
        this.enemies2= this.game.add.group();
        this.bosses= this.game.add.group();
        this.vaccines=this.game.add.group();
        this.bullets=this.game.add.group();
        this.bullets.enableBody= true;


        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        this.bullets.createMultiple(1, 'bullet');// how many bullet mugawas every press sa key
        this.bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this); //mg generate ug bullet kada press e call ang function na(resetBullet)
        this.bullets.setAll('checkWorldBounds', true); //extending sprite object

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W)
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S)

 
        //this.scoreText = this.game.add.bitmapText(0,0, 'minecraftia', 'Score: 0', 32);
        this.killText = this.game.add.bitmapText(0,0, 'minecraftia', 'Kill: 0', 32); //add killtext same with sa scoretext position below Scoretext
        this.bossLifeText = this.game.add.bitmapText(50 ,50, 'minecraftia', 'Boss Life: 20' , 32);

        this.game.time.events.add(Phaser.Timer.SECOND *5, this.createBoss, this);

        this.enemySound = this.game.add.audio('bounce');
        this.deathSound = this.game.add.audio('death');
        this.shotSound = this.game.add.audio('shot');
        // this.gameMusic = this.game.add.audio('gameMusic');
        this.victoryMusic = this.game.add.audio('win');
        // this.gameMusic.play('', 0, true);

        this.game.time.events.add(Phaser.Timer.SECOND *5, this.createBoss, this);


        },
    update: function(){

         if(this.wKey.isDown) { 
              this.player.body.velocity.y -=15; // this will move our player to the upward motion
          }
          else if(this.sKey.isDown) {      
            this.player.body.velocity.y +=15;

        }
        if (this.game.input.activePointer.isDown) { //active pointer can be a mouse or touch movement
            this.player.body.velocity.y =0; //this will move our player to the upward notion
        }
        if (this.player.body.velocity.y < 0 || this.game.input.activePointer.isDown) { //change player angle if we are trying to move it up
            if (this.player.angle > 0) {
                this.player.angle = 0; //reset angle
            }
            if (this.player.angle > this.playerMinAngle) {
                this.player.angle = 0; //lean backward
            }
        }
        else if (this.player.body.velocity.y >=0 && !this.game.input.activePointer.isDown) {
            if (this.player.angle < this.playerMaxAngle) {
                this.player.angle = 0; //lean forward
            }
        }
        
        if (this.enemyTimer < this.game.time.now) {
            this.createEnemy(); //create an enemy
            this.enemyTimer = this.game.time.now + this.enemyRate; //increment the enemy
        }
        if (this.enemy2Timer < this.game.time.now) {
            this.createEnemy2(); //create an enemy
            this.enemy2Timer = this.game.time.now + this.enemy2Rate; //increment the enemy
        }
        
        if(this.multiTimer < this.game.time.now) {
            this.game.time.events.add(Phaser.Timer.SECOND *1, this.createMulti, this); // Create a multiplier
            this.multiTimer = this.game.time.now + this.multiRate; // Increment the multiplier
        }
        if (this.spaceKey.isDown){
            this.fireBullet(); //fire bullet when key is press(isDown) call function(fireBullet)
        }

        this.game.physics.arcade.collide(this.player, this.ground, this.groundHit, null, this);

        //this will check when player and coins overlap, refer to coinHit function below
        this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);
        this.game.physics.arcade.overlap(this.player, this.enemies2, this.enemy2Hit, null, this);
        this.game.physics.arcade.overlap(this.player, this.bosses, this.bossHit, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.bullets, this.enemyShot, null, this);
        this.game.physics.arcade.overlap(this.enemies2, this.bullets, this.enemy2Shot, null, this);
        this.game.physics.arcade.overlap(this.bosses, this.bullets, this.bossShot, null, this);
    },
    
        shutdown: function(){
        this.enemies.destroy();
        this.enemies2.destroy();
        this.bosses.destroy();
        this.bullets.destroy();
        this.enemyTimer = 0;
        this.enemy2Timer = 0;       
        this.bossTimer = 0;
        this.bossLife= 20;
        this.score = 0;
        this.kill=0;
        this.bullet=0;

    },
    createEnemy: function(){
        var x = this.game.width; // x position

        var y = this.game.height;

        var enemy = this.enemies.getFirstExists(false);
        if (!enemy) {
            enemy = new Enemy(this.game, 0, 0); //x,y
            this.enemies.add(enemy); //add enemy if not exist
        }
        enemy.reset(x, y); //set sprite
        enemy.revive();
    },
     createEnemy2: function(){
        var x = this.game.width; // x position

        var y = this.game.height;

        var enemy2= this.enemies2.getFirstExists(false);
        if (!enemy2) {
            enemy2 = new Enemy2(this.game, 0, 0); //x,y
            this.enemies2.add(enemy2); //add enemy if not exist
        }
        enemy2.reset(x, y); //set sprite
        enemy2.revive();
    },
     createBoss: function() {
          var x = this.game.width;
          var y = this.game.height;

          var boss = this.bosses.getFirstExists(false);
          if(!boss) {
              boss = new Boss(this.game, 0, 0);
              this.bosses.add(boss);
              
          }
          boss.reset(x, y);
          boss.revive();

        
    },//recycle vaccine and add to vaccine group
   fireBullet:function(){ //recycle bullet and add to bullet group
         if(this.game.time.now > this.bulletTime) {
          bullet = this.bullets.getFirstExists(false);

            if (bullet){
              if(this.spaceKey) {
                bullet.reset(this.player.x + 6    , this.player.y -150 ); // position sa bullet from player
                bullet.body.velocity.x = 50000; // position of bul150t and the velocity sa ground
              }
          }
      }
    },
    groundHit: function(player, ground){
        player.body.velocity.y = -100; //bounce the player when hit the ground
    },

    enemyHit: function(player, enemy){
        player.kill();
        enemy.kill();

        this.enemySound.play(); // play the death sound when the player hit the enemy
        this.gameMusic.stop();
         
        this.ground.stopScroll();
        this.background.stopScroll(); 
        this.foreground.stopScroll(); 

        this.enemies.setAll('body.velocity.x', 0);

        this.enemyTimer = Number.MAX_VALUE; 

        var scoreboard = new Scoreboard(this.game);
        scoreboard.show(this.score, this.kill, this.deathSound.play());  
       
    },
    enemy2Hit: function(player, enemy2){
        player.kill();
        enemy2.kill();

        this.enemySound.play(); // play the death sound when the player hit the enemy
         
        this.ground.stopScroll();
        this.background.stopScroll(); 
        this.foreground.stopScroll(); 

        this.enemies2.setAll('body.velocity.x', 0);

        this.enemy2Timer = Number.MAX_VALUE; 

        var scoreboard = new Scoreboard(this.game);
        scoreboard.show(this.score, this.kill, this.deathSound.play());  
       
    },
    bossHit: function(player, boss) {
        player.kill(); //will kill the player
        boss.kill(); //will kill the enemy

        this.enemySound.play(); // play the death sound when the player hit the enemy
        this.gameMusic.stop();
         
        this.ground.stopScroll();
        this.background.stopScroll(); 
        this.foreground.stopScroll(); 

        this.enemies2.setAll('body.velocity.x', 0);

        this.enemy2Timer = Number.MAX_VALUE; 

        var scoreboard = new Scoreboard(this.game);
        scoreboard.show(this.score, this.kill, this.victoryMusic.play());

    },
    resetBullet: function(bullet){
        bullet.kill();
        this.shotSound.play();
    },
    enemyShot: function(bullet, enemy2){
        this.score+=1; // add 2points to the scoree
        this.kill++; //increase our kill
        
        bullet.kill(); //will hide the bullet
        
        this.killText.text='Kill: '+ this.kill; // add the kill to the board
    },
     enemy2Shot: function(bullet, enemy2){
        this.enemySound.play();
        this.score+=1; // add 2points to the scoree
        this.kill++; //increase our kill
        
        bullet.kill(); //will hide the bullet
        
        this.killText.text='Kill: '+ this.kill; // add the kill to the board
    },
    bossShot: function(boss, bullet){
        this.enemySound.play();
        var shake = new Phaser.Plugin.wig(game);
        game.plugins.add(shake);

      
        shake.shake(); 
        shake.shake(40);

        this.bossLife--;
        bullet.kill();
        this.bossLifeText.text = 'BossLife: ' + this.bossLife;

        if(this.bossLife==0){

            this.deathSound.stop(); // play the death sound when the player hit the enemy

            this.ground.stopScroll(); //will stop ground from scrolling
            this.background.stopScroll(); // will stop background from scrolling
            this.foreground.stopScroll(); // will stop foreground from scrolling

            this.bosses.setAll('body.velocity.x', 0); //we will stop boss from moving forward
            this.enemies.setAll('body.velocity.x', 0);
            this.enemies2.setAll('body.velocity.x', 0);

            this.bossTimer = Number.MAX_VALUE;
            this.enemyTimer = Number.MAX_VALUE;
            this.enemy2Timer = Number.MAX_VALUE;
        
            var victoryboard = new Victoryboard(this.game, this.victoryMusic.play());
            victoryboard.show();


        }
    } 
}; 

   
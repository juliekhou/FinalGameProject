class Play extends Phaser.Scene{
    constructor(){
        super("Play");
    }

    preload(){
        // load spritesheets
        this.load.spritesheet('angel', './assets/angel.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
    }

    create(){
        // variable for game over state
        gameOver = false;

        // variable for player being hit state (before game over) (transition state)
        playerFound = false;

        // variables and settings
        this.VELOCITY = 500;
        this.DRAG = 800;    // DRAG < ACCELERATION = icy slide
        this.GROUND_HEIGHT = 35;
        this.AVATAR_SCALE = 0.5;

        // set bg color
        this.cameras.main.setBackgroundColor('#666');

        // adding the angel
        this.angel = this.physics.add.sprite('angel');
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('angel', { start: 0, end: 1, first: 0}),
            frameRate: 10
        });

        // make player avatar 🧍
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'angel', 'idle').setScale(this.AVATAR_SCALE);
        
        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();

        // display clock
//         let clockConfig = {
//             fontFamily: 'Courier',
//             fontSize: '28px',
//             backgroundColor: '#A9DEF9',
//             color: '#EDE7B1',
//             align: 'right',
//             padding: {
//             top: 5,
//             bottom: 5,
//             },
//             fixedWidth: 100
//         }
        
        // Clock
//         this.clockRight = this.add.text(0, 50, 0, clockConfig);
//         // 60-second play clock
//         this.timeR = game.settings.gameTimer;
//         this.clock = this.time.addEvent({delay: 1000, callback: () => {this.timeR -= 1000;}, callbackScope: this, loop: true});

    }

    update(){

//         if(!(this.timeR < 0)){
//             this.clockRight.setText(this.timeR/1000);
//         }

        // game over
        if(gameOver){
            this.scene.start('GameOver');
        }

        // check keyboard input
        if(cursors.left.isDown) {
            this.player.body.setVelocityX(-this.VELOCITY);
            this.player.flipX = true;
        } else if(cursors.right.isDown) {
            this.player.body.setVelocityX(this.VELOCITY);
            this.player.flipX = false;       
        } else if(cursors.up.isDown) {
            this.player.body.setVelocityY(-this.VELOCITY);        
        } else if(cursors.down.isDown) {
            this.player.body.setVelocityY(this.VELOCITY);
        } else if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
        }

        // wrap physics object(s) .wrap(gameObject, padding)
        this.physics.world.wrap(this.player, 0);
    }

        

    // function for clicking a flower pot
    // can be converted to be used as function for clicking the hiding person
    clickPot(pot, pointer){
        // player can click pot if murphy is not hit
        if(!playerFound){

            // play sound
            this.sound.play('clickPot');

            // move angel to where pointer was clicked
            this.physics.moveToObject(this.angel, pointer, 550);
            this.pointerX = pointer.x;
            this.pointerY = pointer.y;

            // destroy pot
            pot.destroy();

            // create poof sprite at pot's position
            let poof = this.add.sprite(pot.x, pot.y, 'poof').setOrigin(0, 0);

            // play poof animation
            poof.anims.play('poof');

            // callback after anim completes            
            poof.on('animationcomplete', () => { 
                // remove poof sprite                    
                poof.destroy();      
                this.clock.paused = false;             
            });
        }
    }
};


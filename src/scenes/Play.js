class Play extends Phaser.Scene{
    constructor(){
        super("Play");
    }

    preload(){
        // load spritesheets
        this.load.spritesheet('angel', './assets/angel.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.atlas('npc_atlas', './assets/player.png', './assets/player.json');
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

        // make player avatar 🧍
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'angel').setScale(this.AVATAR_SCALE);
        
        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();

        // adding the player
        this.npcGroup = this.add.group({});

        //after collision, random direction

        for(let x = 0; x < 75; x++){
            this.addNPC();
        }
            
        this.anims.create({ 
            key: 'walk', 
            frames: this.anims.generateFrameNames('npc_atlas', {      
                prefix: 'player',
                start: 1,
                end: 8,
                suffix: '',
            }), 
            frameRate: 10,
            repeat: -1 
        });

        this.physics.add.collider(this.npcGroup, this.player, (npc)=> {this.collide(npc)});
        this.physics.add.collider(this.npcGroup);


        // display clock
        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#A9DEF9',
            color: '#EDE7B1',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        
        // Clock
        this.clockRight = this.add.text(0, 50, 0, clockConfig);
        // 60-second play clock
        this.timeR = game.settings.gameTimer;
        this.clock = this.time.addEvent({delay: 1000, callback: () => {this.timeR -= 1000;}, callbackScope: this, loop: true});

    }

    addNPC(){
        let xPosition = Math.ceil(Math.random() * 1270);
        let yPosition = Math.ceil(Math.random() * 710);
        let npc = new NPC(this, xPosition, yPosition, "npc_atlas", "player1").setScale(this.AVATAR_SCALE);
        this.npcGroup.add(npc);

        let xVelocity = (Math.ceil(Math.random() * 300) + 0) * (Math.round(Math.random()) ? 1 : -1);
        

        let yVelocity = (Math.ceil(Math.random() * 225) + 75) * (Math.round(Math.random()) ? 1 : -1);
        // npc.setVelocityY(yVelocity);
        npc.setVelocity(xVelocity, yVelocity).setBounce(1,1);

        //this.physics.add.overlap(this.player, npc, (npc)=> {this.collide(npc)});
    }

    collide(npc){
        let xVelocity = (Math.ceil(Math.random() * 300) + 0) * (Math.round(Math.random()) ? 1 : -1);
        let yVelocity = (Math.ceil(Math.random() * 225) + 75) * (Math.round(Math.random()) ? 1 : -1);
        npc.setVelocity(xVelocity, yVelocity).setBounce(1,1);
    }

    update(){
        if(!(this.timeR < 0)){
            this.clockRight.setText(this.timeR/1000);
        }

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

        this.npcGroup.getChildren().forEach(function(npc){
            if(npc.body.velocity.x < 0) {
                npc.flipX = true;
            } else {
                npc.flipX = false;
            }
            npc.anims.play('walk', true);
        }, this);

        // wrap physics object(s) .wrap(gameObject, padding)
        this.physics.world.wrap(this.player, 0);
        this.physics.world.wrap(this.npcGroup, 0);
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


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
        // change cursor to flashlight
        this.input.setDefaultCursor('url(./assets/flashlight.png), pointer');

        // variable for hider winning state (time runs out)
        hiderWin = false;

        // variable for seeker winning state (seeker clicks hider)
        seekerWin = false;

        // variables and settings
        this.VELOCITY = 400;
        this.DRAG = 800;    // DRAG < ACCELERATION = icy slide
        this.GROUND_HEIGHT = 35;
        this.AVATAR_SCALE = 0.75;

        // set background color
        this.cameras.main.setBackgroundColor('#666');

        // make player avatar 🧍
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'npc_atlas').setScale(this.AVATAR_SCALE).setOrigin(0, 0).setInteractive();
        this.player.on('pointerdown', () => {this.clickHider()});
        this.player.setPipeline('Light2D');

        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();

        // adding the NPCs
        this.npcGroup = this.add.group({});
        for(let x = 0; x < 75; x++){
            this.addNPC();
        }
        
        // walk animation for human NPC
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

        // adding collisions 
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
        // clock
        this.clockRight = this.add.text(0, 50, 0, clockConfig);
        // 60-second play clock
        this.timer = game.settings.gameTimer;
        this.clock = this.time.addEvent({delay: 1000, callback: () => {this.timer -= 1000;}, callbackScope: this, loop: true});

        // lighting
        // ambient lighting
        this.lights.enable().setAmbientColor(0x222222);

        // point light that follows cursor
        light = this.lights.addLight(0, 0, 200);
        this.input.on('pointermove', function (pointer) {
            light.x = pointer.x;
            light.y = pointer.y;
        });
    }

    // function for adding NPC with randomized velocity and start position
    addNPC(){
        // set random starting x and y positions for NPC
        let xPosition = Math.ceil(Math.random() * 1270);
        let yPosition = Math.ceil(Math.random() * 710);

        // initialize NPC with lighting
        let npc = new NPC(this, xPosition, yPosition, "npc_atlas", "player1").setScale(this.AVATAR_SCALE);
        npc.setPipeline('Light2D');

        // add NPC to group
        this.npcGroup.add(npc);

        // randomly set velocity
        let xVelocity = (Math.ceil(Math.random() * 300) + 0) * (Math.round(Math.random()) ? 1 : -1);
        let yVelocity = (Math.ceil(Math.random() * 225) + 75) * (Math.round(Math.random()) ? 1 : -1);
        npc.setVelocity(xVelocity, yVelocity).setBounce(1,1);
    }

    // function to handle collision between hider and NPCs
    collide(npc){
        // randomly set velocity after collision
        let xVelocity = (Math.ceil(Math.random() * 300) + 0) * (Math.round(Math.random()) ? 1 : -1);
        let yVelocity = (Math.ceil(Math.random() * 225) + 75) * (Math.round(Math.random()) ? 1 : -1);
        npc.setVelocity(xVelocity, yVelocity).setBounce(1,1);
    }

    update(){
        // display timer and check if it is done
        if(!(this.timer < 0)){
            this.clockRight.setText(this.timer/1000);
        } else {
            hiderWin = true;
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

        // iterate through NPCs and check their direction and play animation
        this.npcGroup.getChildren().forEach(function(npc){
            if(npc.body.velocity.x < 0) {
                npc.flipX = true;
            } else {
                npc.flipX = false;
            }
            npc.anims.play('walk', true);
        }, this);

        this.physics.world.wrap(this.player, 0);
        this.physics.world.wrap(this.npcGroup, 0);
    }

    // function for clicking the hider
    clickHider(){
        this.scene.start('GameOver');
        seekerWin = true;
    }
};


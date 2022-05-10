class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {
        // load sprite sheet
        this.load.spritesheet('title', './assets/title.png', {frameWidth: 700, frameHeight: 700, startFrame: 0, endFrame: 5});
        this.load.spritesheet('tutorial', './assets/tutorial.png', {frameWidth: 500, frameHeight: 110, startFrame: 0, endFrame: 5});
        this.load.spritesheet('play', './assets/play.png', {frameWidth: 500, frameHeight: 110, startFrame: 0, endFrame: 5});
    }

    create() {
        // title
        this.title = this.add.sprite(290, 20, 'title').setOrigin(0, 0);
        
        // tutorial and play buttons
        this.tutorial = this.physics.add.sprite(390, 450, 'tutorial').setOrigin(0, 0).setInteractive();
        this.play = this.physics.add.sprite(390, 570, 'play').setOrigin(0, 0).setInteractive();

        // adding animations
        this.anims.create({
            key: 'titleAnimation',
            frames: this.anims.generateFrameNumbers('title', { start: 0, end: 5, first: 0}),
            frameRate: 6
        });
        this.anims.create({
            key: 'tutorialAnimation',
            frames: this.anims.generateFrameNumbers('tutorial', { start: 0, end: 4, first: 0}),
            frameRate: 6
        });
        this.anims.create({
            key: 'playAnimation',
            frames: this.anims.generateFrameNumbers('play', { start: 0, end: 4, first: 0}),
            frameRate: 6
        });
        // interactibility for buttons
        this.tutorial.on('pointerdown', ()=> {
            this.scene.start('Tutorial');
        });
        this.play.on('pointerdown', ()=> {
            this.scene.start('Play');
        });
    }


    update() {
        // game settings
        game.settings = {
            gameTimer: 30000    
        }

        // play animations
        this.title.anims.play('titleAnimation', true);
        this.tutorial.anims.play('tutorialAnimation', true);
        this.play.anims.play('playAnimation', true);
    }
}
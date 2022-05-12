class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        // load sprite sheet
        this.load.spritesheet('playAgain', './assets/playAgain.png', {frameWidth: 550, frameHeight: 110, startFrame: 0, endFrame: 4});
    }

    create() {
        // play again button
        this.playAgain = this.physics.add.sprite(380, 575, 'playAgain').setOrigin(0, 0).setInteractive();
        // adding animations
        this.anims.create({
            key: 'playAgainAnimation',
            frames: this.anims.generateFrameNumbers('playAgain', { start: 0, end: 4, first: 0}),
            frameRate: 6
        });
        // adding interactibility for play again
        this.playAgain.on('pointerdown', ()=> {
            this.scene.start('Menu');
        });

        // determine winner
        if(seekerWin){
            this.winner = "SEEKER";
        } else {
            this.winner = "HIDER";
        }
        
        // styling for winner text
        let winnerConfig = {
            fontFamily: 'Verdana',
            fontSize: '40px',
            backgroundColor: '#a8a592',
            color: '#262310',
            align: 'right',
            fixedWidth: 0,
            fontStyle: 'bold'
        }
        // display winner
        this.winnerText = this.add.text(500, 250, this.winner + " WON!", winnerConfig);
    }


    update() {
        // play again animation
        this.playAgain.anims.play('playAgainAnimation', true);
    }
}
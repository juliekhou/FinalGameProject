class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        // load sprite sheet
        this.load.image('playAgain', './assets/playAgain.png');
        this.load.image('seekerWon', './assets/seekerWon.png');
        this.load.image('hiderWon', './assets/hiderWon.png');
    }

    create() {
        // play again button
        this.playAgain = this.add.sprite(295, 525, 'playAgain').setOrigin(0, 0).setInteractive();
        // adding animations
        // this.anims.create({
        //     key: 'playAgainAnimation',
        //     frames: this.anims.generateFrameNumbers('playAgain', { start: 0, end: 4, first: 0}),
        //     frameRate: 6
        // });
        // adding interactibility for play again
        this.playAgain.on('pointerdown', ()=> {
            this.scene.start('Menu');
        });

        // determine winner
        if(seekerWin){
            this.seekerWins = this.add.sprite(375, 45, 'seekerWon').setOrigin(0, 0);
        } else {
            this.hiderWins = this.add.sprite(375, 45, 'hiderWon').setOrigin(0, 0);
        }
        
        // styling for winner text
        // let winnerConfig = {
        //     fontFamily: 'Verdana',
        //     fontSize: '40px',
        //     backgroundColor: '#a8a592',
        //     color: '#262310',
        //     align: 'right',
        //     fixedWidth: 0,
        //     fontStyle: 'bold'
        // }
        // display winner
        // this.winnerText = this.add.text(500, 250, this.winner + " WON!", winnerConfig);
    }


    update() {
        // play again animation
        // this.playAgain.anims.play('playAgainAnimation', true);
    }
}
/**
 * Collaborator Names: Anika Mahajan, Julie Khou, Justin Beedle
*/

// object containing game configuration options
let gameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Menu, Tutorial, Play, GameOver],
    backgroundColor: 0x444444,

    // physics settings
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
}

// create new game
let game = new Phaser.Game(gameConfig);

// global variables
let cursors;
// player score declaration
let timeLeft;
// state variable declaration
let gameOver, playerFound;
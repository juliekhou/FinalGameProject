// NPC Prefab
class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this); // add to physics
        scene.add.existing(this);   // add to existing scene
    }

    //might not be used
    update() {
        this.x -= 2;
    }

    //might not be used
    reset(){
        
    }
}
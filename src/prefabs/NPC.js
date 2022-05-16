// NPC Prefab
class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, isHuman) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this); // add to physics
        scene.add.existing(this);   // add to existing scene
    }
}
let gameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scale: {
        // Fit to window
        mode: Phaser.Scale.FIT,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [],
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: new Tableau1()
};
let game = new Phaser.Game(gameConfig);

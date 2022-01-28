class Balle  {
    constructor(Tableau1){
        this.scene= Tableau1
        this.balle = this.scene.physics.add.sprite(0, 0, 'cercle').setOrigin(0, 0);
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.1,1.1);
        this.balle.body.setMaxVelocityX(800);
        this.balle.body.setMaxVelocityY(700);
        this.balle.body.setAllowGravity(false)
    }
}
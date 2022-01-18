var keyS;
var keyX;
var keyJ;
var keyN;
class Tableau1 extends Phaser.Scene{


    preload (){
            this.load.image('carré', 'assets/carre.png');
            this.load.image('cercle', 'assets/cercle.png');
    }
    create(){
            this.hauteur = 500
            this.largeur = 1000


        //mur du haut
            this.haut = this.physics.add.image(0,0,'carré').setOrigin(0,0);
            this.haut.setDisplaySize(this.largeur,20);
            this.haut.body.setAllowGravity(false);
            this.haut.setImmovable(true)
        //mur du bas
            this.bas = this.physics.add.image(0,this.hauteur-20,'carré').setOrigin(0,0);
            this.bas.setDisplaySize(this.largeur,20);
            this.bas.body.setAllowGravity(false);
            this.bas.setImmovable(true)
        //Balle
            this.balle = this.physics.add.image(this.largeur/2, this.hauteur/2,'cercle').setOrigin(0,0);
            this.balle.setDisplaySize(20,20);
            this.balle.body.setBounce(1,1)
            this.balle.setVelocityX(200)
            this.balle.setVelocityY(200)
            this.balle.body.setMaxVelocity(1000,1000)
        //J1
            this.gauche = this.physics.add.image(this.largeur-995,(this.hauteur-90)/2,'carré').setOrigin(0,0);
            this.gauche.body.setAllowGravity(false);
            this.gauche.setDisplaySize(10,100);
            this.gauche.setImmovable(true)
        //J2
            this.droite = this.physics.add.image(this.largeur-15,(this.hauteur-90)/2,'carré').setOrigin(0,0);
            this.droite.body.setAllowGravity(false);
            this.droite.setDisplaySize(10,100);
            this.droite.setImmovable(true)

            let me = this;
            this.physics.add.collider(this.balle,this.bas);
            this.physics.add.collider(this.balle,this.haut);
            this.physics.add.collider(this.balle,this.droite, function () {
                console.log("touche droit")
                me.rebond(me.droite)
            });
            this.physics.add.collider(this.balle,this.gauche);
            this.physics.add.collider(this.haut,this.droite);
            this.physics.add.collider(this.bas,this.droite);
            this.physics.add.collider(this.haut,this.gauche);
            this.physics.add.collider(this.bas,this.gauche);

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    }

    rebond(raquette){

        let me=this;

        console.log(raquette.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(raquette.y))

        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette =(this.balle.y-raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);
        console.log(positionRelativeRaquette);

        this.balle.setVelocityY( this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)

    }

    update(){

        if(this.gauche.y >= this.hauteur-130){
            this.gauche.y = this.hauteur-130
        }

        if(this.gauche.y <= this.hauteur-470){
            this.gauche.y = this.hauteur-470
        }

        if(this.droite.y >= this.hauteur-130){
            this.droite.y = this.hauteur-130
        }

        if(this.droite.y <= this.hauteur-470){
            this.droite.y = this.hauteur-470
        }

        if(this.balle.x > this.largeur){
            this.balle.x = 200
        }

        if(this.balle.x < this.largeur-this.largeur){
            this.balle.x = this.largeur
        }

        if(this.balle.y > this.hauteur){
            this.balle.y = this.hauteur
        }

        if(this.balle.y <0){
            this.balle.y = 0
        }

        if (keyS.isDown)
        {
            this.gauche.y -= 10
        }
        if (keyX.isDown)
        {
            this.gauche.y += 10
        }
        if (keyJ.isDown)
        {
            this.droite.y -= 10
        }
        if (keyN.isDown)
        {
            this.droite.y += 10
        }

    }
}
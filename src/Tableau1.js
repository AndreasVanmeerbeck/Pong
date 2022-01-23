var keyS;
var keyX;
var keyJ;
var keyN;
class Tableau1 extends Phaser.Scene {
    preload() {
        this.load.image('bg', 'assets/backgroundjeu.jpg');
        this.load.image('cercle', 'assets/shine.png');
        this.load.image('carre', 'assets/carre.png');
        this.load.image('raquetteg', 'assets/padg.png');
        this.load.image('raquetted', 'assets/padd.png');



    }


    create() {
        this.hauteur=500;
        this.largeur=1000;


        //Fond
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);

        //Balle
        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'cercle').setOrigin(0, 0);
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.2,1.2);
        this.balle.setVelocityX(Phaser.Math.Between(-600,600));
        this.balle.setVelocityY(Phaser.Math.Between(300,350));
        this.balle.body.setMaxVelocityX(500);
        this.balle.body.setMaxVelocityY(700);
        this.balle.body.setAllowGravity(false)

        //Mur haut
        this.haut = this.physics.add.sprite(0, 0,'carre').setOrigin(0, 0);
        this.haut.setDisplaySize(this.largeur,5);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);
        this.haut.setVisible(false);

        //Mur bas
        this.bas = this.physics.add.sprite(0, this.hauteur-5,'carre').setOrigin(0, 0);
        this.bas.setDisplaySize(this.largeur,5);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);
        this.bas.setVisible(false);

        //Collision
        this.physics.add.collider(this.balle,this.bas);
        this.physics.add.collider(this.balle,this.haut);

        //Raquettes balle/murs
        this.gauche = this.physics.add.sprite(25, 200,'raquetteg').setOrigin(0, 0);
        this.gauche.setVelocityY(0);
        this.gauche.setDisplaySize(20,100);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        this.droite = this.physics.add.sprite(955, 200,'raquetted').setOrigin(0, 0);
        this.droite.setVelocityY(0);
        this.droite.setDisplaySize(20,100);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);

        let me = this;
        //Collision raquettes/balle
        this.physics.add.collider(this.balle,this.gauche, function(){
            console.log("touche gauche");
            me.rebond(me.gauche);
        });

        this.physics.add.collider(this.balle,this.gauche);

        this.physics.add.collider(this.balle,this.droite, function(){
            console.log("touche droit");
            me.rebond(me.droite);
        });

        this.physics.add.collider(this.balle,this.droite);

        this.joueurGauche = new Joueur('Fox','joueurGauche');
        this.joueurDroite = new Joueur('Falco','joueurDroite');
        console.log(this.joueurGauche);

        this.balleAucentre();

        this.initKeyboard();
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

    balleAucentre(){
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.balle.setVelocityX(0)

        this.balle.setVelocityX(Math.random()>0.5?-100:100)
        this.balle.setVelocityY(0)
    }

    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }

    initKeyboard() {
        let me = this;
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        if (keyS.isUp)
        {
            me.gauche.setVelocityY(0);
        }
        if (keyJ.isUp)
        {
            me.droite.setVelocityY(0);
        }
        if (keyX.isUp)
        {
            me.gauche.setVelocityY(0);
        }
        if (keyN.isUp)
        {
            me.droite.setVelocityY(0);
        }

        if (keyS.isDown)
        {
            if (me.gauche.y<me.haut.y + 10){
                me.gauche.setVelocityY(0)
            }
            else{
                me.gauche.setVelocityY(-300);
            }
        }
        if (keyX.isDown)
        {
            if (me.gauche.y+100>me.bas.y-5){
                me.gauche.setVelocityY(0)
            }
            else {
                me.gauche.setVelocityY(300);
            }
        }
        if (keyJ.isDown)
        {
            if (me.droite.y<me.haut.y + 10){
                me.droite.setVelocityY(0)
            }
            else{
                me.droite.setVelocityY(-300);
            }
        }
        if (keyN.isDown)
        {
            if (me.droite.y+100>me.bas.y-5){
                me.droite.setVelocityY(0)
            }
            else {
                me.droite.setVelocityY(300);
            }
        }
    }
    update() {

        if(this.balle.x>this.largeur){
            this.win(this.joueurGauche);
        }
        if(this.balle.x<0){
            this.win(this.joueurDroite);
        }
        this.initKeyboard();
    }
}
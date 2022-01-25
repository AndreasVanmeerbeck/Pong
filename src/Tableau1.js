let keyS;
let keyX;
let keyJ;
let keyN;
class Tableau1 extends Phaser.Scene {
    preload() {
        this.load.image('bg', 'assets/backgroundjeu.jpg');
        this.load.image('cercle', 'assets/shine.png');
        this.load.image('carre', 'assets/carre.png');
        this.load.image('raquetteg', 'assets/padg.png');
        this.load.image('raquetted', 'assets/padd.png');
        //FlipX plutot que 2 raquette

        this.load.audio('melee', 'assets/son/melee.mp3')
        this.load.audio('hit', 'assets/son/hit.wav')

    }


    create() {
        this.hauteur=500;
        this.largeur=1000;

        //Son
        this.melee= this.sound.add('melee', {loop: true});
        this.melee.volume = 0.1;
        this.melee.play();

        this.hit= this.sound.add('hit', {loop: false});
        this.hit.volume = 0.1;

        //Fond
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);

        //Balle
        this.balle = this.physics.add.sprite(0, 0, 'cercle').setOrigin(0, 0);
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.1,1.1);
        this.balle.body.setMaxVelocityX(800);
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


        //Raquettes balle/murs
        this.gauche = this.physics.add.sprite(0, 0,'raquetteg').setOrigin(0, 0);
        this.gauche.setDisplaySize(20,100);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);


        this.droite = this.physics.add.sprite(0, 0,'raquetted').setOrigin(0, 0);
        this.droite.setDisplaySize(20,100);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);

        //Collision raquettes/balle
        this.physics.add.collider(this.balle,this.bas);
        this.physics.add.collider(this.balle,this.haut);

        let me = this;
        //Collision raquettes/balle
        this.physics.add.collider(this.balle,this.gauche, function(){
            me.rebond(me.gauche);
            me.soundFX(me.gauche);
        });

        this.physics.add.collider(this.balle,this.gauche);

        this.physics.add.collider(this.balle,this.droite, function(){
            me.rebond(me.droite);
            me.soundFX(me.droite);
        });


        this.physics.add.collider(this.balle,this.droite);

        this.joueurGauche = new Joueur('Fox','joueurGauche');
        this.joueurDroite = new Joueur('Falco','joueurDroite');

        this.balleAucentre();
        this.initKeyboard();
        this.raquetteAucentre()
    }


    soundFX()
    {
        this.hit.play();
    }


    rebond(raquette){


        let me=this;


        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette =(this.balle.y-raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);

        this.balle.setVelocityY( this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)
    }

    balleAucentre(){
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.balle.setVelocityX(0)
        this.balle.setVelocityY(0)
        this.balle.setVelocityX(Math.random()>0.5?-200:200)
    }

    raquetteAucentre(){
        this.gauche.x = 10
        this.gauche.y = this.hauteur/2-50

        this.droite.x = this.largeur-30
        this.droite.y = this.hauteur/2-50
    }

    win(joueur){
        joueur.score ++;
        this.balleAucentre();
        this.raquetteAucentre();
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
    update(){

        if(this.balle.x>this.largeur){
            this.win(this.joueurGauche);
        }
        if(this.balle.x<0){
            this.win(this.joueurDroite);
        }
        this.initKeyboard();
    }
}
import Phaser from "phaser";
class PlayScene extends Phaser.Scene{
    constructor(){
        super('PlayScene');
    }
    preload() {
        this.load.image('sky','assets/sky.png');
        this.load.image('bomb','assets/bomb.png');
        this.load.image('player','assets/player.png');

    }
    create() {
        this.add.image(0,0,'sky').setOrigin(0,0);
        this.speed = 500;
        this.hits = 0;

        this.text = this.add.text(800-10,0+10, 'Hits: 0',{fontSize: '22px',fill:'#fff'}).setOrigin(1,0);

        this.player = this.physics.add.sprite(0,0,'player').setOrigin(0,0);
        this.player.setCollideWorldBounds(true);

        const bombs = this.physics.add.group();
        bombs.createMultiple({
            classType:Phaser.Physics.Arcade.Sprite,
            quantity: 15,
            key: 'bomb',
            active: true,
            setXY: {
                x: 400,
                y:300,
                stepX: 20,
                stepY: 20
            }
        })
        bombs.getChildren().forEach(bomb => {
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.body.setVelocity(Phaser.Math.Between(-500,500), Phaser.Math.Between(-500,500));
            bomb.setImmovable(true);
        })
        this.physics.add.collider(this.player,bombs, () => {
            console.log('Collision!');
            this.hits++;
            this.text.setText(`Hits: ${this.hits}`);
            this.player
            .setX(400)
            .setY(300)
        });
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    //60 fps => 60 frames per second => 60x times per seond update is called
    //time => is overall time in which update is called
    //delta => is time from the last frame
    update(time, delta){
        const {up, down, left, right} = this.cursors;
        if(up.isDown){
            //shortcut
            this.player.setVelocity(0,-this.speed);
        } else if(down.isDown) {
            this.player.setVelocity(0,this.speed);
        } else if(left.isDown) {
            this.player.setVelocity(-this.speed,0);
        } else if(right.isDown) {
            this.player.setVelocity(this.speed,0);
        } else {
            this.player.setVelocity(0,0);
        }

    }
}
export default PlayScene;
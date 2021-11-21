
import Phaser from "phaser";
import PlayScene from './scenes/Play';

const config = {
  //WebGL
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [PlayScene]
};

new Phaser.Game(config);


class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    })
  }

  preload() {

  }

  create() {
    gameState.bg = new StarBackround(this);
  }

  update() {
    gameState.bg.update()
  }
}

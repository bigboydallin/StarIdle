class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    })
  }

  preload() {

  }

  create() {
    gameState.bg = new StarBackground(this);
    gameState.max = 2**(gameState.layers-1) * 100
    for (let i = 0; i < gameState.layers; i++){
      let maxSize = gameState.max/(2**i)
      gameState.elements.push(new Element(i,maxSize));
    }
    gameState.elements[0].count = gameState.t0Max;
  }

  update() {
    gameState.bg.update()
  }
}

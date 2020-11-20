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
      gameState.stars.push(new Star(this,i));
    }
    gameState.elements[0].count = gameState.max;
    gameState.elements[1].count = gameState.max/4;
    gameState.elements[2].count = gameState.max/16;
  }

  update() {
    gameState.bg.update()
    for (let i = 0; i < gameState.layers; i++){
      gameState.stars[i].update();
    }
  }
}

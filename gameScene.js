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
      //add element
      gameState.elements.push(new Element(i,maxSize));
      //add star visualizer
      gameState.stars.push(new Star(this,i));
      //add display panel
      gameState.panels.push(new ElementPanel(this,i));
    }
    gameState.elements[0].count = gameState.max;
    // these are for testing
    gameState.elements[1].count = gameState.max/4;
    gameState.elements[2].count = gameState.max/16;
    //add power
    gameState.power = new Power;
    gameState.panels.push(new PowerPanel(this));
  }

  update() {
    //update background
    gameState.bg.update()
    // update stars
    for (let i = 0; i < gameState.layers; i++){
      gameState.stars[i].update();
    }
    // update panels
    for (let i = 0; i < gameState.panels.length; i++){
      gameState.panels[i].update()
    }
  }
}

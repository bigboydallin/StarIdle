class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    })
  }

  preload() {

  }

  create() {
    gameState.delta = 0;
    gameState.speed = 100;
    gameState.bg = new StarBackground(this);
    gameState.max = 2**(gameState.layers-1) * 10
    for (let i = 0; i < gameState.layers; i++){
      let maxSize = gameState.max/(2**i)
      //add element
      gameState.elements.push(new Element(i,maxSize));
      //add star visualizer
      gameState.stars.push(new Star(this,i));
      //add display panel
      gameState.panels.push(new ElementPanel(this,i));
      //add converter
      //add converter panel
    }
    for (let i = 0; i < gameState.layers-1; i++){
      gameState.converters.push(new Converter(i));
    }
    gameState.elements[0].count = gameState.max;
    // these are for testing
    //add power
    gameState.power = new Power;
    gameState.panels.push(new PowerPanel(this));
    gameState.converters[0].allocate(1);
  }

  update(time,delta) {
    gameState.delta += delta;
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
    //update power
    gameState.power.setPower()
    while (gameState.delta > gameState.speed){
      //activate converters
      gameState.delta -= gameState.speed;
      for (let i = 0; i < gameState.converters.length; i++){
        gameState.converters[i].update()
      }
    }
    gameState.converters[1].allocate(1);
  }
}

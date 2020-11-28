class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    })
  }

  preload() {
    this.load.image('plus', 'assets/plus.png')
    this.load.image('minus', 'assets/minus.png')
    this.load.image('upgrade-temp', 'assets/upgrade-temp.png')
  }

  create() {
    gameState.delta = 0;
    gameState.speed = 300;
    gameState.bg = new StarBackground(this);
    gameState.max = 2 ** (gameState.layers - 1) * 10;
    this.createElements();
    this.createConverters();
    this.createPower();
    gameState.upgrades = {};
    let effect = () => {console.log('purchased')}
    gameState.upgrades['temp'] = new Upgrade(this,'temp',{1:10},effect,'upgrade-temp')
  }

  createElements() {
    // creates elements and displays for them
    for (let i = 0; i < gameState.layers; i++) {
      let maxSize = gameState.max / (2 ** i)
      //add element
      gameState.elements.push(new Element(i, maxSize));
      //add star visualizer
      gameState.stars.push(new Star(this, i));
      //add display panel
      gameState.panels.push(new ElementPanel(this, i));
    }
    gameState.elements[0].count = gameState.max;
  }

  createConverters() {
    //creates converters and displays
    for (let i = 0; i < gameState.layers - 1; i++) {
      gameState.converters.push(new Converter(i));
      gameState.panels.push(new ConverterPanel(this, i))
    }
  }

  createPower() {
    // creates power and displays
    gameState.power = new Power;
    gameState.panels.push(new PowerPanel(this));
  }

  update(time, delta) {
    gameState.delta += delta;
    //update background
    gameState.bg.update();
    this.updateStars();
    this.updatePanels();
    //update power
    gameState.power.setPower()
    while (gameState.delta > gameState.speed) {
      //activate converters
      this.updateConverters();
      gameState.delta -= gameState.speed;

    }
  }

  updateStars(){
    //updates star visualizers
    for (let i = 0; i < gameState.layers; i++) {
      gameState.stars[i].update();
    }
  }

  updatePanels(){
    // update display panels
    for (let i = 0; i < gameState.panels.length; i++) {
      gameState.panels[i].update()
    }
  }

  updateConverters(){
    // update converters
    for (let i = 0; i < gameState.converters.length; i++) {
      gameState.converters[i].update();
    }
  }
}

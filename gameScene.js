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
    gameState.speed = 200;
    gameState.bg = new StarBackground(this);
    gameState.max = 2 ** (gameState.layers - 1) * 10;
    this.createElements();
    this.createConverters();
    this.createPower();
    gameState.upgrades = {};
    let effect = () => {console.log('purchased')}
    gameState.upgrades['temp'] = new Upgrade(this,'temp',{1:10},effect,'upgrade-temp')
    // add input
  }

  createElements(start = 0) {
    // creates elements and displays for them
    let dragPanel;
    if (start ==0){
      gameState.panels.push(new ElementPanelLabel(this))
      dragPanel = new DragPanel(this,175,400,350);
      gameState.dragPanels.elements = dragPanel;
    }
    else {
      dragPanel = gameState.dragPanels.elements;
    }
    for (let i = start; i < gameState.layers; i++) {
      let maxSize = gameState.max / (2 ** i)
      //add element
      gameState.elements.push(new Element(i, maxSize));
      //add star visualizer
      gameState.stars.push(new Star(this, i));
      //add display panel
      let panel = new ElementPanel(this, i);
      dragPanel.addPanel(panel);
      gameState.panels.push(panel);
    }
    gameState.elements[0].count = gameState.max;
  }

  createConverters(start = 0) {
    //creates converters and displays
    let dragPanel;
    if (start == 0){
      dragPanel = new DragPanel(this,175,400,350);
      gameState.panels.push(new ConverterPanelLabel(this))
      gameState.dragPanels.converters = dragPanel;
      dragPanel.rightAligned = true;
    }
    else {
      dragPanel = gameState.dragPanels.converters;
    }
    for (let i = start; i < gameState.layers - 1; i++) {
      gameState.converters.push(new Converter(i));
      let panel = new ConverterPanel(this, i, dragPanel.x);
      gameState.panels.push(panel);
      dragPanel.addPanel(panel);
    }
  }

  createPower() {
    // creates power and displays
    gameState.power = new Power;
    gameState.panels.push(new PowerPanel(this));
  }

  update(time, delta) {
    //update background
    gameState.bg.update();
    this.updateStars();
    this.updatePanels();
    //update power
    gameState.power.setPower()
    this.updateConverters(delta / gameState.speed)
    let layers = gameState.layers;
    let ele = gameState.elements[layers-1];
    if (ele.amount == ele.max){
      this.prestiege()
    }
    let dragPanel;
    for (dragPanel of Object.values(gameState.dragPanels)){
      dragPanel.update();
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

  updateConverters(ratio){
    // update converters
    for (let i = 0; i < gameState.converters.length; i++) {
      gameState.converters[i].update(ratio);
    }
  }

  prestiege(){
    let newLayers = Math.min(26,gameState.layers + 4);
    let oldLayers = gameState.layers;
    gameState.layers = newLayers;
    gameState.max = 2 ** (gameState.layers - 1) * 10;
    this.createElements(oldLayers);
    this.createConverters(oldLayers-1);
    for (let i = 1;i<newLayers;i++){
      gameState.elements[i].count = 0;
      gameState.elements[i].updateMax();
    }
    gameState.elements[0].count = gameState.max;
    gameState.elements[0].updateMax()
    for (let i = 0;i<newLayers-1;i++){
      gameState.converters[i].deallocate(999);
    }
  }
}

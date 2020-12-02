class Panel {

  constructor(scene, x, y, width, height) {
    this.plate = scene.add.rectangle(x, y, width, height, 0xffffff);
    this.plate.setStrokeStyle(2, 0);
  }


}

class ElementPanel extends Panel {

  constructor(scene, tier) {
    let height = 50;
    let width = 350;
    super(scene, width / 2, tier * height + height / 2, width, height);
    this.height = height;
    this.width = width;
    this.tier = tier;
    this.createInfoTexts(scene);
  }

  createInfoTexts(scene){
    this.infoTexts = {};
    let style = {color: 0xffffff, fontSize: '15px'}
    let tier = this.tier
    let tierF = function() {return `${tier+1}`};
    this.infoTexts.tier = new InfoText(scene,4,this.plate.y,tierF,style);
    let nameF = function() {return `${gameState.elements[tier].name}`};
    this.infoTexts.name = new InfoText(scene,25,this.plate.y,nameF,style);
    let amountF = function() {
      if (gameState.elements[tier].amount < 10000){
          return `${gameState.elements[tier].amount}`
      }
      return `${gameState.elements[tier].amount.toPrecision(3)}`};
    this.infoTexts.amount = new InfoText(scene,120,this.plate.y,amountF,style);
    let createdF = function() {
      if (gameState.elements[tier].created < 10000){
          return `${gameState.elements[tier].created}`
      }
      return `${gameState.elements[tier].created.toPrecision(3)}`};
    this.infoTexts.created = new InfoText(scene,195,this.plate.y,createdF,style);
    let maxF = function() {
      if (gameState.elements[tier].max < 10000){
          return `${gameState.elements[tier].max}`
      }
      return `${gameState.elements[tier].max.toPrecision(3)}`};
    this.infoTexts.max = new InfoText(scene,270,this.plate.y,maxF,style);
  }

  update() {
    this.infoTexts.tier.update()
    this.infoTexts.name.update()
    this.infoTexts.amount.update()
    this.infoTexts.created.update()
    this.infoTexts.max.update()
  }
}

class PowerPanel extends Panel {

  constructor(scene) {
    let height = 50;
    let width = 200;
    super(scene, game.canvas.width / 2, game.canvas.height * 5 / 6, width, height);
    this.height = height;
    this.width = width;
    let power = function() {
      return `Power ${gameState.power.unallocated} / `+
      `${gameState.power.max}`
    }
    this.infoText = new InfoText(scene,0,this.plate.y,power);
  }

  update() {
    let x = game.canvas.width / 2;
    let y = game.canvas.height * 5 / 6;
    this.plate.x = x;
    this.plate.y = y;
    this.infoText.x = x - 80;
    this.infoText.y = y;
    this.infoText.update();
  }
}

class ConverterPanel extends Panel {

  constructor(scene, tier) {
    let height = 50;
    let width = 350;
    super(scene, width / 2, tier * height + height / 2, width, height)
    this.tier = tier;
    this.height = height;
    this.width = width;
    this.outline = scene.add.rectangle(0, tier * height + height / 2, width / 3, height - 15);
    this.outline.setStrokeStyle(1, 0)
    this.bar = scene.add.rectangle(0, tier * height + height / 2, width / 3, height - 15, 0);
    this.createButtons(scene);
    this.createInfoTexts(scene)
  }

  createInfoTexts(scene) {
    this.infoTexts = {};
    let tier = this.tier;
    let y = this.plate.y;
    let elementNameF = function() {
      return `${gameState.elements[tier].name} `
    };
    this.infoTexts.name = new InfoText(scene, 0, y, elementNameF);
    let powerF = function() {
      return `${gameState.converters[tier].currentPower}`
    }
    this.infoTexts.power = (new InfoText(scene, 0, y, powerF));
  }

  createButtons(scene) {
    let y = this.tier * this.height + this.height / 2
    let tier = this.tier;
    let plusAction = function() {
      gameState.converters[tier].allocate(1)
    }
    this.plus = new Button(scene, 0, y, 'plus', plusAction)
    let minusAction = function() {
      gameState.converters[tier].deallocate(1)
    }
    this.minus = new Button(scene, 0, y, 'minus', minusAction)
  }


  update() {
    // update text
    this.infoTexts.name.update()
    this.infoTexts.power.update()
    // adjust x
    this.plate.x = game.canvas.width - this.width / 2;
    this.outline.x = game.canvas.width - this.width / 5;
    this.bar.x = game.canvas.width - this.width / 5;
    this.plus.x = game.canvas.width - this.width / 2 + 20;
    this.minus.x = game.canvas.width - this.width * 3 / 4 + 35;
    this.infoTexts.name.x = game.canvas.width - this.width + 10;
    this.infoTexts.power.x = game.canvas.width - this.width / 2 - 20;
    // update progress bar
    let converter = gameState.converters[this.tier]
    this.bar.width = this.width * converter.progress / converter.speed / 3
  }
}

class Button {

  constructor(scene, x, y, image, action) {
    this.sprite = scene.add.sprite(x, y, image).setInteractive();
    this.sprite.on('pointerdown', action);
  }

  get x() {
    return this.sprite.x;
  }

  set x(value) {
    this.sprite.x = value;
  }

  get y() {
    return this.sprite.y;
  }

  set y(value) {
    this.sprite.y = value;
  }

  get visible(){
    return this.sprite.visible;
  }

  set visible(value){
    this.sprite.visible = value;
  }
}

class InfoText {

  constructor(scene, x, y, action, style = {color: 0xffffff}) {
    this.text = scene.add.text(x, y, "", style);
    this.action = action;
  }

  get x() {
    return this.text.x;
  }

  set x(value) {
    this.text.x = value;
  }

  get y() {
    return this.text.y;
  }

  set y(value) {
    this.text.y = value;
  }

  update() {
    let newText = this.action();
    this.text.setText(newText);
  }
}

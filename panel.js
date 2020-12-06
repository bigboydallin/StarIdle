class Panel {

  constructor(scene, x, y, width, height) {
    this.plate = scene.add.rectangle(x, y, width, height, 0xffffff);
    this.plate.setStrokeStyle(2, 0);
  }

  get x() {
    return this.plate.x;
  }

  set x(value) {
    this.plate.x = value;
  }

  get y() {
    return this.plate.y;
  }

  set y(value) {
    this.plate.y = value;
  }


}

class ElementPanel extends Panel {

  constructor(scene, tier) {
    let height = 50;
    let width = 350;
    super(scene, width / 2, (tier + 1) * height + height / 2, width, height);
    this.height = height;
    this.width = width;
    this.tier = tier;
    this.createInfoTexts(scene);
  }

  get x() {
    return this.plate.x;
  }

  set x(value) {
    let difference = value - this.x;
    this.plate.x = value;
    this.infoTexts.tier.x += difference;
    this.infoTexts.name.x += difference;
    this.infoTexts.amount.x += difference;
    this.infoTexts.created.x += difference;
    this.infoTexts.max.x += difference;
  }

  get y() {
    return this.plate.y;
  }

  set y(value) {
    let difference = value - this.y;
    this.plate.y = value;
    this.infoTexts.tier.y += difference;
    this.infoTexts.name.y += difference;
    this.infoTexts.amount.y += difference;
    this.infoTexts.created.y += difference;
    this.infoTexts.max.y += difference;
  }

  createInfoTexts(scene) {
    this.infoTexts = {};
    let style = {
      color: 0xffffff,
      fontSize: '15px'
    }
    let tier = this.tier
    let tierF = function() {
      return `${tier+1}`
    };
    this.infoTexts.tier = new InfoText(scene, 4, this.plate.y, tierF, style);
    let nameF = function() {
      return `${gameState.elements[tier].name}`
    };
    this.infoTexts.name = new InfoText(scene, 25, this.plate.y, nameF, style);
    let amountF = function() {
      if (gameState.elements[tier].amount < 10000) {
        return `${gameState.elements[tier].amount}`
      }
      return `${gameState.elements[tier].amount.toPrecision(3)}`
    };
    this.infoTexts.amount = new InfoText(scene, 120, this.plate.y, amountF, style);
    let createdF = function() {
      if (gameState.elements[tier].created < 10000) {
        return `${gameState.elements[tier].created}`
      }
      return `${gameState.elements[tier].created.toPrecision(3)}`
    };
    this.infoTexts.created = new InfoText(scene, 195, this.plate.y, createdF, style);
    let maxF = function() {
      if (gameState.elements[tier].max < 10000) {
        return `${gameState.elements[tier].max}`
      }
      return `${gameState.elements[tier].max.toPrecision(3)}`
    };
    this.infoTexts.max = new InfoText(scene, 270, this.plate.y, maxF, style);
  }

  update() {
    this.infoTexts.tier.update()
    this.infoTexts.name.update()
    this.infoTexts.amount.update()
    this.infoTexts.created.update()
    this.infoTexts.max.update()
  }
}

class ElementPanelLabel extends Panel {
  constructor(scene){
    super(scene,175,25,350,50);
    this.plate.depth = 1;
    this.name = scene.add.text(this.x - 150,this.y,'Name',{color: 0xffffff})
    this.name.depth = 2;
    this.current = scene.add.text(this.x-60,this.y,'Current',{color: 0xffffff})
    this.current.depth = 2;
    this.created = scene.add.text(this.x+18,this.y,'Created',{color: 0xffffff})
    this.created.depth = 2;
    this.max = scene.add.text(this.x+95,this.y,'Max',{color: 0xffffff})
    this.max.depth = 2;
  }



  update(){

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
      return `Power ${gameState.power.unallocated} / ` +
        `${gameState.power.max}`
    }
    this.infoText = new InfoText(scene, this.x - 80, this.y, power);
  }

  get x() {
    return this.plate.x;
  }

  set x(value) {
    let difference = value - this.x;
    this.plate.x = value;
    this.infoText.x += difference;
  }

  get y() {
    return this.plate.y;
  }

  set y(value) {
    let difference = value - this.y;
    this.plate.y = value;
    this.infoText.y += difference;
  }

  update() {
    let x = game.canvas.width / 2;
    let y = game.canvas.height * 5 / 6;
    this.x = x;
    this.y = y;
    this.infoText.update();
  }
}

class ConverterPanel extends Panel {

  constructor(scene, tier) {
    let height = 50;
    let width = 350;
    super(scene, width / 2, (tier + 1) * height + height / 2, width, height)
    this.tier = tier;
    this.height = height;
    this.width = width;
    this.outline = scene.add.rectangle(this.x + 110, this.y, width / 3, height - 15);
    this.outline.setStrokeStyle(1, 0)
    this.bar = scene.add.rectangle(this.x + 110, this.y, width / 3, height - 15, 0);
    this.createButtons(scene);
    this.createInfoTexts(scene)
  }

  get x() {
    return this.plate.x;
  }

  set x(value) {
    let difference = value - this.x;
    this.plate.x = value;
    this.outline.x += difference;
    this.bar.x += difference;
    this.infoTexts.name.x += difference;
    this.infoTexts.power.x += difference;
    this.plus.x += difference;
    this.minus.x += difference;
  }

  get y() {
    return this.plate.y;
  }

  set y(value) {
    let difference = value - this.y;
    this.plate.y = value;
    this.outline.y += difference;
    this.bar.y += difference;
    this.infoTexts.name.y += difference;
    this.infoTexts.power.y += difference;
    this.plus.y += difference;
    this.minus.y += difference;
  }

  createInfoTexts(scene) {
    this.infoTexts = {};
    let tier = this.tier;
    let elementNameF = function() {
      return `${gameState.elements[tier].name} `
    };
    this.infoTexts.name = new InfoText(scene, this.x - this.width / 2 + 5, this.y, elementNameF);
    let powerF = function() {
      return `${gameState.converters[tier].currentPower}`
    }
    this.infoTexts.power = (new InfoText(scene, this.x - 18, this.y, powerF));
  }

  createButtons(scene) {
    let tier = this.tier;
    let plusAction = function() {
      gameState.converters[tier].allocate(1)
    }
    this.plus = new Button(scene, this.x + 25, this.y, 'plus', plusAction)
    let minusAction = function() {
      gameState.converters[tier].deallocate(1)
    }
    this.minus = new Button(scene, this.x - 50, this.y, 'minus', minusAction)
  }

  update() {
    // update text
    this.infoTexts.name.update()
    this.infoTexts.power.update()
    // update progress bar
    let converter = gameState.converters[this.tier]
    this.bar.width = this.width * converter.progress / converter.speed / 3
  }
}

class ConverterPanelLabel extends Panel {
  constructor(scene){
    super(scene,game.canvas.width-175,25,350,50)
    this.plate.depth = 1;
    this.name = scene.add.text(this.x - 170,this.y,'Name',{color: 0xffffff})
    this.name.depth = 2;
    this.power = scene.add.text(this.x-40,this.y,'Power',{color: 0xffffff})
    this.power.depth = 2;
    this.progress = scene.add.text(this.x+70,this.y,'Progress',{color: 0xffffff})
    this.progress.depth = 2;
  }

  get x(){
    return this.plate.x;
  }

  set x(value){
    let difference = value - this.x;
    this.plate.x = value;
    this.name.x += difference;
    this.power.x += difference;
    this.progress.x += difference
  }


  update(){
    this.x = game.canvas.width - this.plate.width/2;
  }
}

class DragPanel {

  constructor(scene, x, y, width) {
    this.rectangle = scene.add.rectangle(x, y, width, 5000);
    this.rectangle.setInteractive()
    this.rectangle.isFilled = false;
    this.startY = this.y;
    this.rectangle.on('drag', (pointer, dragX, dragY) => {
      let difference = dragY - this.y;
      if (difference > 0 || this.bottomY > game.canvas.height) {
        this.y = Math.min(dragY, this.startY);
      }
    });
    scene.input.setDraggable(this.rectangle);
    this.height += 1;
    this.panels = [];
    this.rightAligned = false;
  }

  get x() {
    return this.rectangle.x;
  }

  set x(value) {
    let difference = value - this.x;
    this.rectangle.x = value;
    let panel;
    for (panel of this.panels) {
      panel.x += difference;
    }
  }

  get y() {
    return this.rectangle.y;
  }

  set y(value) {
    let difference = value - this.y;
    this.rectangle.y = value;
    let panel;
    for (panel of this.panels) {
      panel.y += difference;
    }
  }

  get height() {
    return this.rectangle.height;
  }

  set height(value) {
    this.rectangle.height = value;
  }

  get width() {
    return this.rectangle.width;
  }

  set width(value) {
    this.rectangle.width = value;
  }

  get bottomY() {
    let bottomPanel = this.panels[this.panels.length - 1];
    return bottomPanel.y + bottomPanel.height / 2;
  }

  addPanel(panel) {
    this.panels.push(panel);
  }

  update() {
    if (this.rightAligned) {
      this.x = game.canvas.width - this.width / 2;
    }
  }
}

class Button {

  constructor(scene, x, y, image, action) {
    this.sprite = scene.add.sprite(x, y, image).setInteractive();
    this.sprite.on('pointerdown', action);
    this.rightAligned = false;
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

  get visible() {
    return this.sprite.visible;
  }

  set visible(value) {
    this.sprite.visible = value;
  }
}

class InfoText {

  constructor(scene, x, y, action, style = {
    color: 0xffffff
  }) {
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

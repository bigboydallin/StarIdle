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
    this.infoText = scene.add.text(10, this.plate.y, "", {
      color: 0xffffff
    });
  }

  update() {
    let text = (
      `${this.tier},` +
      `${gameState.elements[this.tier].name}: ` +
      `${gameState.elements[this.tier].amount}/` +
      `${gameState.elements[this.tier].created}/` +
      `${gameState.elements[this.tier].max}`
    )
    this.infoText.setText(text);
  }
}

class PowerPanel extends Panel {

  constructor(scene) {
    let height = 50;
    let width = 200;
    super(scene, game.canvas.width / 2, game.canvas.height * 5 / 6, width, height);
    this.height = height;
    this.width = width;
    this.infoText = scene.add.text(game.canvas.width / 2, this.plate.y, "", {
      color: 0xffffff
    });
  }

  update() {
    let x = game.canvas.width / 2;
    let y = game.canvas.height * 5 / 6;
    this.plate.x = x;
    this.plate.y = y;
    this.infoText.x = x;
    this.infoText.y = y;
    let text = (
      `Power ${gameState.power.unallocated}/${gameState.power.existing}`
    )
    this.infoText.setText(text);
  }
}

class ConverterPanel extends Panel {

  constructor(scene, tier) {
    let height = 50;
    let width = 350;
    super(scene, width / 2, tier * height + height / 2, width, height)
    this.outline = scene.add.rectangle(0, tier * height + height / 2, width / 3, height - 15);
    this.outline.setStrokeStyle(1, 0)
    this.bar = scene.add.rectangle(0, tier * height + height / 2, width / 3, height - 15, 0);
    // add scprites
    this.plus = scene.add.sprite(0, tier * height + height / 2, 'plus').setInteractive()
    this.minus = scene.add.sprite(0, tier * height + height / 2, 'minus').setInteractive()
    this.plus.on('pointerdown', function() {gameState.converters[tier].allocate(1)});
    this.minus.on('pointerdown', function() {gameState.converters[tier].deallocate(1)});
    this.tier = tier;
    this.height = height;
    this.width = width;
    this.infoText = scene.add.text(0, this.plate.y, "", {
      color: 0xffffff
    });
    this.infoText2 =  scene.add.text(0, this.plate.y, "", {
      color: 0xffffff
    });
  }

  allocate(){
    gameState.converters[this.tier].allocate(1);
  }

  update() {
    // update text
    let text = (
      `${gameState.elements[this.tier].name} `
    );
    this.infoText.setText(text)
    this.infoText2.setText(`${gameState.converters[this.tier].currentPower}`)
    // adjust x
    this.plate.x = game.canvas.width - this.width / 2;
    this.infoText.x = game.canvas.width - this.width + 10;
    this.infoText2.x = game.canvas.width - this.width/2 - 20;
    this.outline.x = game.canvas.width - this.width / 5;
    this.bar.x = game.canvas.width - this.width / 5;
    this.plus.x = game.canvas.width - this.width / 2 + 20;
    this.minus.x = game.canvas.width - this.width * 3 / 4 + 35;
    // update progress bar
    let converter = gameState.converters[this.tier]
    this.bar.width = this.width * converter.progress / converter.speed / 3
  }
}

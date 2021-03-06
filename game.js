const gameState = {
  layers: 10,
  eleRatio: 2,
  elements: [],
  stars: [],
  panels: [],
  converters: [],
  dragPanels: {}
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: 1920,
    height: 1080
  },
  backgroundColor: '203069',
  scene: [GameScene]
};

const game = new Phaser.Game(config);

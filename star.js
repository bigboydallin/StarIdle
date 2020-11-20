class Star {
  constructor(scene,tier) {
    this.tier = tier
    let colour = 0xffffff - (tier+1)*0x000fff*2
    this.circle = scene.add.ellipse(500,500,100,100,colour);
  }

  update() {
    //scale star based on amount of
    let ratio = gameState.elements[this.tier].ratio;
    this.circle.setScale(ratio, ratio);
    // move star to center of screen
    this.circle.x = game.canvas.width/2;
    this.circle.y = game.canvas.height/2;
    // set size based on canvas size
    let size = Math.min(game.canvas.width/3,game.canvas.height*3/4)
    this.circle.setSize(size,size)
  }
}

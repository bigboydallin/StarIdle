class StarBackground {
  constructor(scene) {
    this.starCount = 1000;
    this.maxSize = 4;
    this.stars = [];
    this.width = 5000
    this.height = 5000
    for (let i = 0; i < this.starCount; i++) {
      let x = Math.random() * (this.width + 20) - 10;
      let y = Math.random() * (this.height + 20) - 10;
      let size = Math.floor(Math.random() * this.maxSize);
      this.stars.push(scene.add.ellipse(x, y, size, size, 0xffffff));
    }
    let xmod = Math.random() < 0.5 ? -1 : 1;
    let ymod = Math.random() < 0.5 ? -1 : 1;
    this.xDir = (Math.random() / 5 + 0.1) * xmod;
    this.yDir = (Math.random() / 5 + 0.1) * ymod;
  }

  update() {
    for (let i = 0; i < this.starCount; i++) {
      //move star
      this.stars[i].x += this.xDir;
      this.stars[i].y += this.xDir;
      //wrap star
      if (this.stars[i].x > this.width + 10) {
        this.stars[i].x -= this.width + 10;
      }
      if (this.stars[i].x < -10) {
        this.stars[i].x += this.width + 10;
      }
      if (this.stars[i].y > this.height + 10) {
        this.stars[i].y -= this.height + 10;
      }
      if (this.stars[i].y < -10) {
        this.stars[i].y += this.height + 10;
      }
      //scaleStar
      if (Math.random() > .9)
      this.stars[i].setScale(Math.random()/3 + 0.75)
    }
  }
}

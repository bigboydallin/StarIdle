class Panel{

  constructor(scene,x,y,width,height){
    this.plate = scene.add.rectangle(x,y,width,height,0xffffff);
    this.plate.setStrokeStyle(2,0);
  }


}

class ElementPanel extends Panel{

  constructor(scene,tier){
    let height = 50;
    let width = 350;
    super(scene,width/2,tier*height+height/2,width,height);
    this.height = height;
    this.width = width;
    this.tier = tier;
    this.infoText = scene.add.text(0,this.plate.y,"",{color: 0xffffff});
  }

  update(){
    let text = (
      `${this.tier},`+
      `${gameState.elements[this.tier].name}: `+
      `${gameState.elements[this.tier].amount}/`+
      `${gameState.elements[this.tier].amount}/`+
      `${gameState.elements[this.tier].max}`
    )
    this.infoText.setText(text);
  }
}

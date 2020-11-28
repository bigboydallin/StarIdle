//Class for a purchasable upgrade

class Product {

  constructor(cost, effect, prereq = () => {
    return true
  }) {
    this.cost = cost;
    this.effect = effect;
    this.prereq;
    this.purchased = false;
  }

  get canAfford() {
    for (let tier = 0; tier < gameState.layers; tier++) {
      if (new String(tier) in this.cost) {
        if (!(this.cost[tier] <= gameState.elements[tier].amount)) {
          return false;
        }
      }
    }
    return true;
  }

  spend() {
    for (let tier = 0; tier < gameState.layers; tier++) {
      if (new String(tier) in this.cost) {
        gameState.elements[tier].spend(this.cost[tier]);
      }
    }
  }

  purchase() {
    if (!this.purchased && this.canAfford) {
      this.purchased = true;
      this.spend();
      this.effect();
      return true;
    }
    return false;
  }

}

class Upgrade extends Product {

  constructor(scene, name, cost, effect, image) {
    super(cost, effect);
    this.name = name;
    let bEffect = () => {
      gameState.upgrades[name].purchase()
    }
    this.button = new Button(scene, 390, 30, image, bEffect);
  }

  get x(){
    return this.button.x;
  }

  set x(value){
    this.button.x = value;
  }

  get y(){
    return this.button.y;
  }

  set y(value){
    this.button.y = value;
  }

  get visible(){
    return this.button.visible;
  }

  set visible(value){
    this.button.visible = value;
  }

  purchase(){
    if (super.purchase()){
      this.visible = false;
    }
  }
}

//Class for a purchasable upgrade

class Product {

  constructor(cost) {
    this.name;
    this.cost = cost;
    this.effect = () => {
      console.log("effect");
    };
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

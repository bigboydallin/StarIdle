class Element {

  // represents a Currency



  constructor(tier, max) {
    let NAMES = [
      "Hydrogen",
      "Helium",
      "Lithium",
      "Beryllium",
      "Boron",
      "Carbon",
      "Nitrogen",
      "Oxygen",
      "Fluorine",
      "Neon",
      "Sodium",
      "Magnesium",
      "Aluminium",
      "Silicon",
      "Phosphorus",
      "Sulfur",
      "Chlorine",
      "Argon",
      "Potassium",
      "Calcium"
    ]
    this.tier = tier;
    this.max = max;
    this.name = NAMES[tier];
    this._count = 0;
    this._created = 0;
  }


  get ratio() {
    return this._created / this.max;
  }

  set count(amount) {
    this._count = amount;
    this._created = amount;
  }

  get created() {
    return this._created
  }

  get amount(){
    return this._count
  }

  get visible() {
    return this._created > 0;
  }

  increment(amount) {
    //increases the count and created by amount
    if (amount > 0 && amount + this._count <= this.max) {
      this._count += amount;
      this._created += amount;
      return true;
    }
    return false;
  }

  cash(amount) {
    //increases count by amount
    if (amount > 0) {
      this._count += amount;
    }
  }

  decrement(amount) {
    //decreases count by amount
    if (amount > 0 && (this._count - amount) >= 0) {
      this._count -= amount;
      return true;
    }
    return false;
  }


  spend(amount, target) {
    //decreases count and created by amount and converts it to target
    if (this.tier > target.tier) {
      if (amount > 0 && this._count - amount >= 0) {
        this._count -= amount;
        this._created -= amount;
        if (this.tier - 1 === target.tier) {
          gameState.currencys[this.tier - 1].cash(amount * 2);
        } else {
          gameState.currencys[this.tier - 1].cash(amount * 2);
          gameState.currencys[this.tier - 1].spend(amount * 2, target);
        }
        return true;
      }
    }
    return false;
  }

}

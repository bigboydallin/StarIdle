class Machine {

  constructor(maxPower) {
    this.maxPower = maxPower;
    this.currentPower = 0;
  }

  get full(){
    return this.currentPower == this.maxPower;
  }

  allocate(amount) {
    let total = Math.min(amount, this.maxPower - this.currentPower);
    let allocated = gameState.power.allocate(total);
    this.currentPower += allocated;
    return allocated;
  }

  deallocate(amount) {
    let total = Math.min(amount, this.currentPower);
    let deallocated = gameState.power.deallocate(total);
    this.currentPower -= deallocated;
    return deallocated;
  }
}

class Converter extends Machine {

  constructor(tier){
    super(10);
    this.tier = tier;
    this.ratio = 2;
    this.progress = 0;
    this.speed = 2**tier+1;
    this.multiplier = 3;
  }

  update(ratio = 1){
    this.progress += this.currentPower* ratio;
    while (this.progress > this.speed){
      this.convert();
      this.progress -= this.speed;
    }
    if (this.currentPower == 0){
      this.progress = 0;
    }
  }

  convert(){
    for (let i = 0; i < this.multiplier; i++){
      if (gameState.elements[this.tier].amount - this.ratio >= 0){
          gameState.elements[this.tier].decrement(this.ratio);
          gameState.elements[this.tier+1].increment(1);
      }
    }
  }
}

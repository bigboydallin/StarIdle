class Machine {

  constructor(maxPower) {
    this.maxPower = maxPower;
    this.currentPower = 0;
  }

  allocate(amount) {
    let total = Math.min(amount, this.maxPower - this.currentPower);
    let allocated = gameState.power.allocate(total);
    this.currentPower += allocated;
    return allocated;
  }

  deallocate(amount) {
    let total = Math.min(amount, this.currentPower);
    console.log(total)
    let deallocated = gameState.power.deallocate(total);
    console.log(deallocated)
    this.currentPower -= deallocated;
    return deallocated;
  }
}

class Converter extends Machine {

  constructor(tier){
    super(5);
    this.tier = tier;
    this.ratio = 2;
    this.progress = 0;
    this.speed = 2**tier+1;
    this.multiplier = 3;
  }

  update(){
    this.progress += this.currentPower;
    while (this.progress > this.speed){
      this.convert();
      this.progress -= this.speed;
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

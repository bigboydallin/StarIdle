class Power {

  constructor () {
    this.max = 0;
    this.allocated = 0;
    this.unallocated = 0;
    this.multiplier = 1;
    this.base = 0;
    this.setPower();
  }

  get existing(){
    return this.allocated + this.unallocated;
  }

  allocate(amount){
    let total = Math.min(amount,this.unallocated)
    this.allocated += total;
    this.unallocated -= total;
    return total;
  }

  deallocate(amount,device){
    let total = Math.min(amount,this.allocated)
    this.allocated -= total;
    this.unallocated += total;
    return total;
  }

  freePower(amount){
    let index = 0;
    let debt = amount;
    while (debt > 0){
      let energyReturned = gameState.converters[index].deallocate(debt);
      debt -= energyReturned;
      this.allocated -= energyReturned;
      this.unallocated += energyReturned;
    }
  }

  removeUnallocated(amount){
    if (amount <= this.unallocated){
      this.unallocated -= amount;
      return amount;
    }
    let removed = amount - this.unallocated;
    this.unallocated = 0;
    return removed;
  }

  setPower() {
    let count = this.base;
    for (let i = 0;i<gameState.layers;i++){
      let element = gameState.elements[i];
      count += element.created * element.powerRatio;
    }
    count *= this.multiplier;
    let total = Math.floor(count);
    // adjust if new total is higher
    if (total > this.max){
      this.unallocated += total - this.max;
      this.max = total;
    }
    // adjust i fnew total is lower
    if (total < this.max){
      let debt = this.max - total;
      debt -= this.removeUnallocated(debt);
      if (debt > 0){
        this.freePower(debt);
        debt -= this.removeUnallocated(debt);
      }
      this.max = total;
    }
  }
}

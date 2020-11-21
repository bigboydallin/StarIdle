class Power {

  constructor () {
    this.scale = 2;
    this.max = 0;
    this.allocated = 0;
    this.unallocated = 0;
    this.setPower();
  }

  get existing(){
    return this.allocated + this.unallocated;
  }

  allocate(amount,device){
    let realAmount = Math.min(amount,this.unallocated);
    device.allocate(realAmount);
    this.unallocated -= realAmount;
    this.allocated += realAmount;
  }

  deallocate(amount,device){
    let realAmount = device.deallocate(amount);
    this.unallocated += realAmount;
    this.allocated -= realAmount;
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
    if (amount >= this.unallocated){
      this.unallocated -= amount;
      return amount;
    }
    let removed = this.unallocated;
    this.unallocated = 0;
    return removed;
  }

  setPower() {
    let count = 0;
    for (let i = 0;i<gameState.layers;i++){
      count += gameState.elements[i].ratio * this.scale**i;
    }
    let total = Math.floor(count);
    if (this.max < total){
      this.unallocated += total-this.max;
      this.max = total;
    }
    if (this.max > total){
      let debt = this.max -total
      debt = this.removeUnallocated(debt);
      if (debt > 0){
        this.freePower(debt);
        this.removeUnallocated(debt);
      }
    }
  }
}

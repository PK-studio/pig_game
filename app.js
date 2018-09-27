class dice{
  constructor(){
    this.sides = 6,
    this.state = {
      result: null,
      rolling: null,
    }
    this.calculation = this.calculation.bind(this);
  }
  calculation(){
    this.state.result = Math.floor((Math.random() * this.sides)+1);
    console.log(this.state.result)
  }
  roll(){
    this.state.rolling = setInterval(this.calculation, 1000);
  }
  stop(){
    clearInterval(this.state.rolling);
    return "stop";
  }
  getResult(){
    return this.state.result;
  }
}

dice1 = new dice();
dice1.roll();
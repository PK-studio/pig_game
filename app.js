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

class player{
  constructor(score){
    this.state = {
      score: score
    }
  }
  addToScore(num){
    this.state.score += num;
  }
  resetScore(){
    this.state.score = 0;
  }
  score(){
    return this.state.score;
  }
}

const dice1 = new dice();
const dice2 = new dice();

const player1 = new player(0);
const player2 = new player(0);

let players = [player1,player2]
let turnOfPlayer = players[0];

function checkRules(res1, res2){
  console.log('rolled: ' + res1 +', '+ res2)
  if(res1==1 && res2==1){
    turnOfPlayer.resetScore();
  }
  else if(res1==1 || res2==1){
    return;
  }
  else{
    turnOfPlayer.addToScore(res1+res2);
  }
  
  if(turnOfPlayer.score() >= 100){
    console.log('Score: '+ turnOfPlayer.score());
    return 'The winer is ' + turnOfPlayer;
  }
  else {
    console.log('Score: '+ turnOfPlayer.score());
    changePlayer();
    console.log("next player is: " +turnOfPlayer.constructor.name);
  };
}

function changePlayer(){
  let numOfPlayer = players.indexOf(turnOfPlayer)
  if(numOfPlayer == players.length-1) turnOfPlayer = players[0]
  else turnOfPlayer = players[numOfPlayer + 1];
}

function rollDices(){
  dice1.roll();
  dice2.roll();
}

function stopDicess(){
  dice1.stop();
  dice2.stop();
  checkRules(dice1.getResult(),dice2.getResult())
}
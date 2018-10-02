class Dice{
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
  }
  roll(){
    this.state.rolling = setInterval(this.calculation, 100);
  }
  stop(){
    clearInterval(this.state.rolling);
    return "stop";
  }
  getResult(){
    return this.state.result;
  }
}

class Player{
  constructor(getName){
    this.name = getName;
    this.score = 0;
  };
  addToScore(num){
    this.score += num;
  }
  resetScore(){
    this.score = 0;
  }
  score(){
    return this.score;
  }
  name(){
    return this.name;
  }
}

const dice1 = new Dice();
const dice2 = new Dice();

let players = []
let rollingDice = false;
let playersTurn;

const dataTable = document.getElementById("listOfPlayers");
const inputName = document.getElementById('inputName')
const playBtn = document.getElementById('play')

function checkRules(res1, res2){
  if(res1==1 && res2==1){
    alert("double one's restarts score")
    playersTurn.resetScore();
  }
  else if(res1==1 || res2==1){
    alert("single one's loses turn")
  }
  else{
    playersTurn.addToScore((res1+res2));
  }
  
  if(playersTurn.score >= 100){
    dataTable.innerHTML = `<h2>Winner: ${playersTurn.name}</h2>`;
    players.splice(0, players.length);
  }
  else displayData();
  
}

function addPlayer(playerName){
  if(!playerName) return;
  players.push(new Player(playerName));
  inputName.value = '';
  playersTurn = players[0]
  displayData();
}

function displayData(){
  let output = `<h2>List of players</h2>`
  players.forEach(element => {
    output +=`
    <li>
      <h4>${element.name} : ${element.score}</h4>
    </li>`;
  });
  output  += `will rool player: ${playersTurn.name}`
  dataTable.innerHTML = output;
}

function play(){
  if(players.length < 2) {
    alert("You need at least 2 players")
    return;
  }
  rollingDice = !rollingDice;
  if(rollingDice) {
    playBtn.innerHTML = "Stop Dices"
    rollDices();
  }
  else{
    playBtn.innerHTML = "Roll Dices"
    stopDices();
    changePlayer();
  }
}

function changePlayer(){
    let numOfPlayer = players.indexOf(playersTurn)
    if(numOfPlayer == players.length-1) playersTurn = players[0]
    else playersTurn = players[numOfPlayer + 1];
    displayData();
}

function rollDices(){
  dice1.roll();
  dice2.roll();
}

function stopDices(){
  dice1.stop();
  dice2.stop();
  checkRules(dice1.getResult(),dice2.getResult())
}
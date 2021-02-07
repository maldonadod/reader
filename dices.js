const { Observable, of } = require("rxjs");
const inquirer = require("inquirer");
const { mergeMap, map } = require("rxjs/operators");

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function prompt(message) {
  return new Observable(observer => {
    inquirer
      .prompt({
        type: "input",
        name: "value",
        message
      })
      .then(answer => {
        observer.next(answer.value)
        observer.complete()
      })
  })
}

class Dice {
  constructor(player) {
    this.value = randomIntFromInterval(1, 6)
    this.player = player;
  }
  returnBigger(otherDice) {
    return this.value > otherDice.value ? this : otherDice
  }
}

prompt("player name")
  .pipe(
    map(name => new Dice(name)),
    mergeMap(playerOneDices => {
      return prompt("player name")
        .pipe(
          map(name => new Dice(name)),
          mergeMap(playerTwoDices => of(playerOneDices.returnBigger(playerTwoDices)))
        )
    })
  )
  .subscribe(bigger => {
    console.log(bigger)
  })
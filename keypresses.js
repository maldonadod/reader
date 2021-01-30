const { Observable } = require("rxjs");
const readline = require("readline");

function keypresses() {
  return new Observable(observer => {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "c") {
        process.exit();
      } else {
        observer.next(key);
      }
    });
  })
}

module.exports = keypresses;
const { Observable } = require("rxjs");

function slides() {
  return new Observable(observer => {
    const slides = [
      "slide 1",
      "slide 2",
      "slide 3",
      "slide 4",
      "slide 5",
      "slide 6",
    ]
    for (const slide of slides) {
      observer.next(slide)
    }
    observer.complete()
  })
}

module.exports = slides;
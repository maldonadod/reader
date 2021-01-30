class Carousel {
  constructor() {
    this.slides = []
    this.movements = []
  }
  add(slide) {
    this.slides.push(slide)
  }
  center() {
    const active = this.movements.reduce((acc, movement) => {
      if (movement === "right") {
        const afterCurrent = this.slides[acc + 1]
        return afterCurrent
          ? acc + 1
          : acc
      }
      if (movement === "left") {
        const beforeCurrent = this.slides[acc - 1]
        return beforeCurrent
          ? acc - 1
          : acc
      }
    }, this.slides.length - 1)
    return this.slides[active]
  }
  move(keys) {
    for (const key of keys) {
      if (key === "l") {
        this.movements.push("left")
      } else {
        this.movements.push("right")
      }
    }
  }
}

module.exports = Carousel;
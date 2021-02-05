class Carousel {
  constructor() {
    this.slides = []
    this.activeIndex = 0
  }
  add(slide) {
    this.slides.push(slide)
    this.activeIndex = this.slides.length - 1
  }
  center() {
    return this.slides[this.activeIndex]
  }
  move(keys) {
    this.remainingOnLeft = 0
    this.remainingOnRight = 0
    for (const key of keys) {
      if (key === "l") {
        this.activeIndex = this.activeIndex - 1
        if (this.activeIndex < 0) {
          this.activeIndex = 0
        }
        this.remainingOnLeft = this.activeIndex
      } else {
        this.activeIndex = this.activeIndex + 1
        this.remainingOnRight = this.slides.length - (this.activeIndex + 1)
      }
    }
  }
}

module.exports = Carousel;
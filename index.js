const Carousel = require("./Carousel");
const { filter, tap, pluck, map } = require("rxjs/operators");
const slides = require("./slides");
const keypresses = require("./keypresses");

const carousel = new Carousel()

slides().subscribe(
  slide => carousel.add(slide),
  err => console.log(err),
  () => display(createView(carousel))
);

const moves = keypresses()
.pipe(
  pluck("name"),
  filter(keyName => keyName === "r" || keyName === "l"),
  tap(keyName => carousel.move(keyName))
)

moves
.subscribe(() => {
  display(createView(carousel))
  console.log("remaning moves to right: ", carousel.remainingOnRight)
  console.log("remaning moves to left: ", carousel.remainingOnLeft)
})

function display(view) {
  console.clear()
  console.log(view)
}

function createView(carousel) {
  if (carousel.slides.length === 0) {
    return "( Loading... )"
  }
  return carousel.slides.map(slide => {
    if (carousel.center() === slide) {
      return `[ ${slide.toUpperCase()} ]`
    }
    return slide
  }).join(", ")
}
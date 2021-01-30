const Carousel = require("./Carousel");
const { filter, tap, pluck } = require("rxjs/operators");
const slides = require("./slides");
const keypresses = require("./keypresses");

const carousel = new Carousel()

slides().subscribe(
  slide => carousel.add(slide),
  err => console.log(err),
  () => display(createView(carousel))
);

keypresses()
.pipe(
  pluck("name"),
  filter(keyName => keyName === "r" || keyName === "l"),
  tap(keyName => carousel.move(keyName))
).subscribe(() => {
  display(createView(carousel))
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
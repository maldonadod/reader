const { expect } = require("chai")
const Carousel = require("../Carousel")

it("test 1", () => {
  const carousel = new Carousel()

  carousel.add("slide 1")

  expect(carousel.center()).to.eqls("slide 1")
})
it("test 2", () => {
  const carousel = new Carousel()

  carousel.add("slide 1")
  carousel.add("slide 2")

  expect(carousel.center()).to.eqls("slide 2")
})
it("test 3", () => {
  const carousel = new Carousel()

  carousel.add("slide 1")
  carousel.add("slide 2")
  carousel.add("slide 3")
  
  carousel.move("l")

  expect(carousel.center()).to.eqls("slide 2")
})
it("test 4", () => {
  const carousel = new Carousel()

  carousel.add("slide 1")
  carousel.add("slide 2")
  carousel.add("slide 3")
  
  carousel.move("rl")

  expect(carousel.center()).to.eqls("slide 2")
})
it("test 5", () => {
  const carousel = new Carousel()

  carousel.add("slide 1")
  carousel.add("slide 2")
  carousel.add("slide 3")
  
  carousel.move("lll")

  expect(carousel.center()).to.eqls("slide 1")
})
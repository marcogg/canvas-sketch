const canvasSketch = require('canvas-sketch')
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = ({ context, width, height }) => {

  // Declaring variables empty, used only once across the project
  let x, y, w, h
  const num = 20
  const degrees = -30

  const rects = []

  for (let i = 0; i < num; i++) {
    x = random.range(0, width)
    y = random.range(0, height)
    w = random.range(200, 600)
    h = random.range(40, 200)

    rects.push({ x, y, w, h })
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)


    rects.forEach(rect => {
      const { x, y, w, h } = rect

      context.save()
      context.translate(x, y)
      context.strokeStyle = 'blue'

      skewRect({ context, w, h, degrees })
      context.stroke()
      context.restore()
    })

    // Below line creates a rectangle automatically
    // context.strokeRect(w * -0.5, h * -0.5, w, h);

    // Below this line creates a rectangle point by point
    // context.beginPath();
    // context.moveTo(w * -0.5, h * -0.5)
    // context.lineTo(w * 0.5, h * -0.5)
    // context.lineTo(w * 0.5, h * 0.5)
    // context.lineTo(w * -0.5, h * 0.5)
    // context.closePath();

    // A cleaner way to view it starting fro 0
    // context.beginPath();
    // context.moveTo(0, 0);
    // context.lineTo(w, 0);
    // context.lineTo(w, h);
    // context.lineTo(0, h)
    // context.closePath();
    // context.stroke();

    // radius = 200
    // angle = math.degToRad(-15)

    // rx = Math.cos(angle) * w
    // ry = Math.sin(angle) * w

    // context.beginPath()
    // context.moveTo(0, 0)
    // context.lineTo(x, y)
    // context.stroke()

    // context.translate(rx * -0.5, (ry + h) * -0.5)

    // context.beginPath();
    // context.moveTo(0, 0)
    // context.lineTo(rx, ry)
    // context.lineTo(rx, ry + h)
    // context.lineTo(0, h)
    // context.closePath()
    // context.stroke()


    // context.restore();
  }
}

// Refactorized as a function
const skewRect = ({ context, w = 600, h = 200, degrees = -45 }) => {
  const angle = math.degToRad(degrees)
  const rx = Math.cos(angle) * w
  const ry = Math.sin(angle) * w

  context.save()
  context.translate(rx * -0.5, (ry + h) * -0.5)

  context.beginPath();
  context.moveTo(0, 0)
  context.lineTo(rx, ry)
  context.lineTo(rx, ry + h)
  context.lineTo(0, h)
  context.closePath()
  context.stroke()


  context.restore();
}

canvasSketch(sketch, settings);

const canvasSketch = require('canvas-sketch')
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const Color = require('canvas-sketch-util/color')

const risoColors = require('riso-colors')

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = ({ context, width, height }) => {

  // Declaring variables empty, used only once across the project
  let x, y, w, h, fill, stroke, blend
  const num = 20
  const degrees = -30

  // Creating an array for limiting random colors for those within it
  const rects = []
  const rectColors = [
    random.pick(risoColors),
    random.pick(risoColors),
    random.pick(risoColors)
  ]

  const bgColor = random.pick(rectColors).hex

  for (let i = 0; i < num; i++) {
    x = random.range(0, width)
    y = random.range(0, height)
    w = random.range(200, 600)
    h = random.range(40, 200)

    // fill = `rgba(0,0,${random.range(0, 255)})`
    fill = random.pick(rectColors).hex
    stroke = random.pick(rectColors).hex

    // Updating the array of rect with properties in an object
    rects.push({ x, y, w, h, fill, stroke })
  }

  return ({ context, width, height }) => {
    context.fillStyle = bgColor
    context.fillRect(0, 0, width, height)


    rects.forEach(rect => {
      const { x, y, w, h, fill, stroke } = rect

      context.save()
      context.translate(x, y)
      context.strokeStyle = stroke
      context.fillStyle = fill
      context.lineWidth = 10

      // Blending mode
      context.globalCompositeOperation = 'overlay'

      skewRect({ context, w, h, degrees })

      shadowColor = Color.offsetHSL(fill, 0, 0, -20)

      context.shadowColor = Color.style(shadowColor.rgba)
      shadowColor.rgba[3] = 0.5
      context.shadowOffsetX = -10
      context.shadowOffsetY = 20

      context.fill()
      context.shadowColor = null
      context.stroke()

      // Blending mode
      context.globalCompositeOperation = 'source-over'

      context.lineWidth = 2
      context.strokeStyle = 'black'
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

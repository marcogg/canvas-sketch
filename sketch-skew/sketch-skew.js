const canvasSketch = require('canvas-sketch')
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const Color = require('canvas-sketch-util/color')

const risoColors = require('riso-colors')

const settings = {
  dimensions: [1080, 1080],
  animate: true
};
const randomNum = Date.now()
const coolSeed = '2024.07.31-20.49.01'

const sketch = ({ context, width, height }) => {

  random.setSeed(randomNum)
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

  // Creating a const to pick a random color
  const bgColor = random.pick(rectColors).hex

  // A default object with mask properties
  const mask = {
    radius: width * 0.4,
    sides: 3,
    x: width * 0.5,
    y: height * 0.5
  }

  for (let i = 0; i < num; i++) {
    x = random.range(0, width)
    y = random.range(0, height)
    w = random.range(200, 600)
    h = random.range(40, 200)

    fill = random.pick(rectColors).hex
    stroke = random.pick(rectColors).hex

    rects.push({ x, y, w, h, fill, stroke })
  }

  return ({ context, width, height }) => {
    context.fillStyle = bgColor
    context.fillRect(0, 0, width, height)

    // Clipping mask
    context.save()
    context.translate(mask.x, mask.y)

    drawPolygon({ context, radius: mask.radius, sides: mask.sides })

    context.clip()

    // Loop for rects

    rects.forEach(rect => {
      const { x, y, w, h, fill, stroke } = rect

      context.save()
      context.translate(-mask.x, -mask.y)
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

    context.restore()

    // Polygon outline
    context.save()
    context.translate(mask.x, mask.y)

    drawPolygon({ context, radius: mask.radius - context.lineWidth, sides: mask.sides })

    context.globalCompositeOperation = "color-burn"
    context.lineWidth = 30
    context.strokeStyle = rectColors[0].hex
    context.stroke()

    context.restore()
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

const drawPolygon = ({ context, radius = 100, sides = 3 }) => {
  const slice = Math.PI * 2 / sides

  context.beginPath()
  context.moveTo(0, -radius)

  for (let i = 1; i < sides; i++) {
    const theta = i * slice - Math.PI * 0.5
    context.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius)
  }
  context.closePath()
}

canvasSketch(sketch, settings);

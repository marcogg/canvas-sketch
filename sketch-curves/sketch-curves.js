const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const math = require('canvas-sketch-util/math')
const colormap = require('colormap')


const settings = {
  dimensions: [1080, 1080],
  animate: true
};

// There are many arguments comming by default, canvasSketch, height, width, are just a few, we just need to declare them as parameters in the fn
const sketch = ({ width, height }) => {
  const cols = 50
  const rows = 50
  const numCells = cols * rows

  // Grid
  const gw = width * 0.8
  const gh = height * 0.8
  // Cell
  const cw = gw / cols
  const ch = gw / rows
  // margin
  const mx = (width - gw) * 0.5
  const my = (height - gh) * 0.5

  const points = []
  let x, y, n, lineWidth, color
  let frequency = 0.002
  let amplitude = 90

  const colors = colormap({
    colormap: 'magma',
    nshades: amplitude
  })

  for (let i = 0; i < numCells; i++) {
    x = (i % cols) * cw
    y = Math.floor(i / cols) * ch

    n = random.noise2D(x, y, frequency, amplitude)
    // x += n
    // y += n

    lineWidth = math.mapRange(n, -amplitude, amplitude, 0, 1)
    color = colors[Math.floor(math.mapRange(n, -amplitude, amplitude, 0, amplitude))]

    points.push(new Point({ x, y, lineWidth, color }))
  }

  // This is where we start drawing
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.save()
    context.translate(mx, my)
    context.translate(cw * 0.5, ch * 0.5)
    context.strokeStyle = 'red'
    context.lineWidth = 4

    // update positions
    points.forEach(point => {
      n = random.noise2D(point.iX + frame * 3, point.iY, frequency, amplitude)
      point.x = point.iX + n
      point.y = point.iY + n
    })

    let lastX, lastY

    // Draw lines
    for (let r = 0; r < rows; r++) {

      for (let c = 0; c < cols - 1; c++) {
        const curr = points[r * cols + c + 0]
        const next = points[r * cols + c + 1]
        // Copy-pasted from curves intro
        const mx = curr.x + (next.x - curr.x) * 0.5;
        const my = curr.y + (next.y - curr.y) * 0.5;

        if (!c) {
          lastX = curr.x
          lastY = curr.y
        }

        context.beginPath()
        context.lineWidth = curr.lineWidth
        context.strokeStyle = curr.color

        context.moveTo(lastX, lastY)
        context.quadraticCurveTo(curr.x, curr.y, mx, my);

        context.stroke()

        lastX = mx - c / cols * 250
        lastY = my - r / cols * 250
      }
    }

    points.forEach(point => {
      // Hiding points
      point.draw(context)
    })
  };
};

canvasSketch(sketch, settings);

// Class Point
class Point {
  constructor({ x, y, lineWidth, color }) {
    this.x = x
    this.y = y
    this.lineWidth = lineWidth
    this.color = color

    this.iX = x
    this.iY = y
  }

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.fillStyle = this.color

    context.beginPath()
    context.arc(0, 0, 2, 0, Math.PI * 2)
    context.fill()

    context.restore()
  }
}
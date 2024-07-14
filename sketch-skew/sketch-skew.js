const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {

  // Declaring variables empty, used only once across the project
  let x, y, w, h
  let radius, angle, rx, ry

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    x = width * 0.5
    y = height * 0.5
    w = width * 0.6
    h = height * 0.1

    context.translate(x, y)
    // context.translate(w * -0.5, h * -0.5)
    context.strokeStyle = 'blue'

    skewRect({ context })
    context.stroke()
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
  };
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

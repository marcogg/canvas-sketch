const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {

  // Declaring variables empty, used only once across the project
  let x, y, w, h;
  let radius, angle

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    x = width * 0.5;
    y = height * 0.5;
    w = width * 0.6;
    h = height * 0.1;

    context.translate(x, y);
    context.translate(w * -0.5, h * -0.5);
    context.strokeStyle = 'blue';
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
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(w, 0);
    context.lineTo(w, h);
    context.lineTo(0, h)
    context.closePath();

    context.stroke();

    context.restore();
  };
}

canvasSketch(sketch, settings);

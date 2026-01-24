const canvasSketch = require('canvas-sketch');
const ease = require('eases')

const settings = {
  resize:true,
  animate:true,
  dimensions: [ window.innerWidth, window.innerHeight ],

}

const dotsAmount = 120
const dots=[]
let elCanvas




// HERE IS WHERE THE MAGIC HAPPENS
const sketch = ({width, height, canvas}) => {

  elCanvas = canvas
  canvas.addEventListener('mouseHovering', openingEffect)



  // Drawing Return
  return ({ context, width, height }) => {
    context.fillStyle = '#212121';
    context.fillRect(0, 0, width, height);

  };
};

// CONSTRUCTORS
class Circle {
  // MAIN CONSTRUCTOR
  constructor({x,y,radius=10, color}){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color

    //Acceleration
    this.ax = 0
    this.ay=0
    
    // Velocity
    this.vx=0
    this.vy=0
  }

  // UPDATE POSITION

}

const openingEffect = () => {

}

canvasSketch(sketch, settings);

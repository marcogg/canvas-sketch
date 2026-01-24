import canvasSketchUtil from "canvas-sketch-util"
import canvasSketch from "canvas-sketch"

const settings = {
  dimensions: [1000, 1000],
  animate:true
};

const sketch = () => {

    // Creating cirlces
    const lines = []
    const numLines = 100
    let lineWidth

    for (let i = 0; i<numLines; i++){

        let beginX = Math.floor(Math.random() * 1000)
        let beginY = Math.floor(Math.random() * 1000)
        let endX = Math.floor(Math.random() * 1000)
        let endY = Math.floor(Math.random() * 1000)
        lineWidth = Math.floor(Math.random())
        console.log(beginX, beginY, endX, endY)
        

        lines.push(new Line ({beginX, beginY, endX, endY, lineWidth}))
      }

      
      return ({ context, width, height }) => {
        context.fillStyle = '#1e1e1e'
        context.fillRect(0, 0, width, height)
        
        lines.forEach(line => {
          line.draw(context)
        })
      // console.log(lines)
  }
}

class Line {
  constructor({ beginX, beginY, endX, endY, lineWidth }) {
    this.beginX = beginX
    this.beginY = beginY
    this.endX = endX
    this.endY = endY
    this.lineWidth = lineWidth
  }

  draw(context) {
    context.save()
    context.beginPath()
    context.lineWidth = this.lineWidth
    context.moveTo(this.beginX, this.beginY)
    context.lineTo(this.endX, this.endY)
    context.strokeStyle ='#12ef78'
    context.stroke()
    context.restore()
  }
}


canvasSketch(sketch, settings)
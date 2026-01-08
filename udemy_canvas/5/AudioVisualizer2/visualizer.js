
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const microphone = new Microphone();

class Figure {
    constructor(x, y, movementSize, isClockWise){
        this.x = x;
        this.y = y;
        this.size = 8;
        this.counter =  0;
        this.movementSize = movementSize;
        this.color = 'white';
        this.isClockWise = isClockWise;
    }

    draw(context){
        context.fillStyle = this.color;
        context.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);            
        context.fill();
    }

    circularMovement(){
        if (this.counter > 360){
            this.counter = 0;
        }

        if (this.isClockWise){

            this.x += (Math.cos(this.counter/ 180 * Math.PI) / 4) * this.movementSize;
            this.y += (Math.sin(this.counter/ 180 * Math.PI)/ 4) * this.movementSize;
        } else{
            this.y += (Math.cos(this.counter/ 180 * Math.PI) / 4) * this.movementSize;
            this.x += (Math.sin(this.counter/ 180 * Math.PI)/ 4) * this.movementSize;
        }

        this.counter++;
    }


    teleport(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }

    changeSize(value){
        const sound = value*200;
        if (sound > this.size){
            this.size = sound;
        } else{
            this.size -= this.size * 0.01;
        }

    }
}



let figures = [];
for (let i = 0; i < 10; i++) {
    figures.push(new Figure(Math.random() * canvas.width, Math.random()* canvas.height, 1, Math.random() > 0.5));
}

function animate(){
    if (microphone.initialized){

        ctx.clearRect(0,0,canvas.width, canvas.height);
        const samples = microphone.getSamples();
        const volume = microphone.getVolume();
        figures.forEach((figure,index) => {
            figure.draw(ctx);
            figure.circularMovement();
            if (Math.random() > 0.999){
                figure.teleport();
            }
            
            figure.changeSize(samples[index]);
        })
    }
    requestAnimationFrame(animate);
}

for (let i = 0; i < 5; i++) {
    animate();
}
//animate();



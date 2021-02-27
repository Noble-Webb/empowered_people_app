import SLandAnimal from "./SLandAnimal";

class HimalayanQuail extends SLandAnimal {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 0
        this.spriteY = 8
        this.hsp = .5
        this.name = "Anthony's woodrat"

    }

    loop(){
        this.hb = {
            left: this.x,
            right: this.x + 15,
            top: this.y,
            bottom: this.y + 15
        }
        this.animates()
    }
    animates(){
        this.animateClock += 1 //cathes each frame
        if (this.animateClock % 15 === 0) { //flips sprites every half-second of 30 frames 
            this.animateFrame = !this.animateFrame
        }

        this.animateFrame ? this.spriteY = 8 : this.spriteY = 9
    }
    draw(){
        this.ctx.drawImage(
            this.spriteSheet,
            this.spriteX * 16,
            this.spriteY * 16,
            16,
            16,
            this.x,
            this.y,
            16,
            16
          );
    }
}




export default HimalayanQuail;
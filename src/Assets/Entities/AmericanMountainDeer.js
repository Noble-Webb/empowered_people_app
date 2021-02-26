import LLandAnimal from "./LLandAnimal";


class AmericanMountainDeer extends LLandAnimal {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 0
        this.spriteY = 4
        this.hsp = .5
        this.name = "American mastodon"
    }

    animates(hsp){
        this.animateClock += 1
        if (this.animateClock % 30 === 0) {
            this.animateFrame = !this.animateFrame
        }
        hsp > 0 ? this.spriteX = 0 : this.spriteX = 2
        this.animateFrame ? this.spriteY = 4 : this.spriteY = 5
    }
   
}




export default AmericanMountainDeer;  
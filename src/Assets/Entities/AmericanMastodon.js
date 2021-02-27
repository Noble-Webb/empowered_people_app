import LLandAnimal from "./LLandAnimal";


class AmericanMastodon extends LLandAnimal {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 4
        this.spriteY = 8
        this.hsp = .5
        this.name = "American mastodon"
    }

    animates(hsp){
        this.animateClock += 1
        if (this.animateClock % 30 === 0) {
            this.animateFrame = !this.animateFrame
        }
        hsp > 0 ? this.spriteX = 4 : this.spriteX = 6
        this.animateFrame ? this.spriteY = 8 : this.spriteY = 9
    }
   
}




export default AmericanMastodon;
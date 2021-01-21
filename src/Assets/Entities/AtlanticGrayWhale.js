import React, { useState, useEffect } from "react";
import Entity from "./Entity"
import WaterAnimal from "./WaterAnimal"
import SpriteSheet from "../PlayerSpriteSheet.png";

class AtlanticGrayWhale extends WaterAnimal {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 0
        this.spriteY = 6
        this.hsp = .5
        this.name = 'Atlantic gray whale'
        
    }

    animates(hsp){

        this.animateClock += 1
        if (this.animateClock % 30 === 0) {
            this.animateFrame = !this.animateFrame
        }
        hsp === .5 ? this.spriteX = 0 : this.spriteX = 2
        this.animateFrame ? this.spriteY = 6 : this.spriteY = 7
    }
    
}




export default AtlanticGrayWhale;
import React, { useState, useEffect } from "react";
import Entity from "./Entity"
import SpriteSheet from "../PlayerSpriteSheet.png";
import LLandAnimal from "./LLandAnimal";

class DireWolf extends LLandAnimal {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 0
        this.spriteY = 4
        this.hsp = .5
        this.name = "Dire Wolf"
        this.id = 1059
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




export default DireWolf;
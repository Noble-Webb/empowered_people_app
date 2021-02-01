import React, { useState, useEffect } from "react";
import Entity from "./Entity"
import SpriteSheet from "../PlayerSpriteSheet.png";
import Raptor from "./Raptor";
  
class AiobrnisIncrediblis extends Raptor {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 0
        this.spriteY = 2
        this.name = "Aiobrnis incrediblis"
    }

    animates(){
        this.animateClock += 1
        if (this.animateClock % 30 === 0) {
            this.animateFrame = !this.animateFrame
        }

        this.animateFrame ? this.spriteY = 2 : this.spriteY = 3
    }
}




export default AiobrnisIncrediblis;
import React, { useState, useEffect } from "react";
import Entity from "./Entity"
import SpriteSheet from "../PlayerSpriteSheet.png";

class Rodent extends Entity {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 5
        this.spriteY = 0
        this.hsp = .5
        this.description = 'The Hispaniolan edible rat (Brotomys voratus) is an extinct species of rodent in the family Echimyidae. It was endemic to Hispaniola (the Dominican Republic and Haiti). Its natural habitat was subtropical or tropical moist lowland forests. This species is known from a single report from Gonzalo Fernández de Oviedo y Valdés, who documented an animal called the mohuy, similar to living spiny rats. Oviedo described the Hispaniolan edible rat as a highly sought after meat, writing, "...there are many persons who have seen it and eaten it, and who praise this meat as better than all the others we have spoken about."'

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

        this.animateFrame ? this.spriteY = 0 : this.spriteY = 1
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




export default Rodent;
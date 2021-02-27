import React, { useState, useEffect } from "react";
import Entity from "./Entity"
import SpriteSheet from "../PlayerSpriteSheet.png";
import SLandAnimal from "./SLandAnimal";

class AnthonyWoodrat extends SLandAnimal {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 5
        this.spriteY = 0
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




export default AnthonyWoodrat;
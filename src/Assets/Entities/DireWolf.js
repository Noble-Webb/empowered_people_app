import React, { useState, useEffect } from "react";
import Entity from "./Entity"
import SpriteSheet from "../PlayerSpriteSheet.png";

class DireWolf extends Entity {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 0
        this.spriteY = 4
        this.name = "Dire Wolf"
    }

    loop(){
        this.hb = {
            left: this.x,
            right: this.x + 15,
            top: this.y,
            bottom: this.y + 15
        }
        this.animates()
        // console.log(this.entityLoop)
        //checks for the player's direction 
        if(this.entityLoop[0].x > this.x ){
            this.spriteX = 0
        }else {
            this.spriteX = 2
        }
    }
    animates(){
        this.animateClock += 1
        if (this.animateClock % 30 === 0) {
            this.animateFrame = !this.animateFrame
        }

        this.animateFrame ? this.spriteY = 4 : this.spriteY = 5
    }
    draw(){
        this.ctx.drawImage(
            this.spriteSheet,
            this.spriteX * 16,
            this.spriteY * 16,
            32,
            16,
            this.x,
            this.y,
            32,
            16   
          );
    }
}




export default DireWolf;
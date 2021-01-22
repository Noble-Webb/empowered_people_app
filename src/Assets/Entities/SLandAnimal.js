import React, { useState, useEffect } from "react";
import Entity from "./Entity"
import SpriteSheet from "../PlayerSpriteSheet.png";

class SLandAnimal extends Entity {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 0
        this.spriteY = 0
    }

    collidingWithMap(x, y) {
        let tileX = Math.floor(x / 16);
        let tileY = Math.floor(y / 16);
        let truth = false;
        if (this.map[tileY][tileX] > 13) {
          truth = true;
        }
        return truth;
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




export default SLandAnimal;


// this.animates(this.hsp)
//         let sideToCheck
//         if (this.hsp === .5) {
//             sideToCheck = this.hb.right
//         } else {
//             sideToCheck = this.hb.left
//         }

//         if (this.collidingWithMap(sideToCheck + this.hsp, this.hb.top)) {
//             // debugger
//             this.hsp = -this.hsp
//         }
//         this.x += this.hsp
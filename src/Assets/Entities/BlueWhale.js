import React, { useState, useEffect } from "react";
import Entity from "./Entity"
import SpriteSheet from "../PlayerSpriteSheet.png";

class BlueWhale extends Entity {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 0
        this.spriteY = 6
        this.hsp = .5
    }

    collidingWithMap(x, y) {
        let tileX = Math.floor(x / 16);
        let tileY = Math.floor(y / 16);
        let truth = false;
        if (this.map[tileY][tileX] != 58) {
          truth = true;
        }
        return truth;
      }

    loop(){
        this.hb = {
            left: this.x,
            right: this.x + 32,
            top: this.y,
            bottom: this.y + 15
        }
        this.animates(this.hsp)
        let sideToCheck
        if (this.hsp === .5) {
            sideToCheck = this.hb.right
        } else {
            sideToCheck = this.hb.left
        }

        if (this.collidingWithMap(sideToCheck + this.hsp, this.hb.top)) {
            // debugger
            this.hsp = -this.hsp
        }
        this.x += this.hsp
    }
    animates(hsp){

        this.animateClock += 1
        if (this.animateClock % 30 === 0) {
            this.animateFrame = !this.animateFrame
        }
        hsp === .5 ? this.spriteX = 0 : this.spriteX = 2
        this.animateFrame ? this.spriteY = 6 : this.spriteY = 7
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




export default BlueWhale;
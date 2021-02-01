import React, { useState, useEffect } from "react";
import Entity from "./Entity"
import SpriteSheet from "../PlayerSpriteSheet.png";
  
class Raptor extends Entity {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 0
        this.spriteY = 0
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
    // draw(){
    //     this.ctx.drawImage(
    //         this.spriteSheet,
    //         this.spriteX * 16,
    //         this.spriteY * 16,
    //         16,
    //         16,
    //         this.x,
    //         this.y,
    //         16,
    //         16   
    //       );
    // }
}






export default Raptor;
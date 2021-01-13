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
        this.name = 'Gray Whale'
        this.description = 'The gray whale (Eschrichtius robustus), also known as the grey whale, gray back whale, Pacific gray whale, or California gray whale, is a baleen whale that migrates between feeding and breeding grounds yearly. It reaches a length of 14.9 meters (49 ft), a weight of up to 41 tonnes (90,000 lb) and lives between 55 and 70 years, although one female was estimated to be 75-80 years of age. The common name of the whale comes from the gray patches and white mottling on its dark skin. Gray whales were once called devil fish because of their fighting behavior when hunted. The gray whale is the sole living species in the genus Eschrichtius, which in turn is the sole living genus in the family Eschrichtiidae. This mammal is descended from filter-feeding whales that appeared at the beginning of the Oligocene, over 30 million years ago.'
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
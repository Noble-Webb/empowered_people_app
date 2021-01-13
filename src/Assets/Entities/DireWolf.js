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
        this.description = 'The dire wolf was about the same size as the largest modern gray wolves (Canis lupus): the Yukon wolf and the northwestern wolf. C. d. guildayi weighed on average 60 kilograms (132 lb) and C. d. dirus was on average 68 kg (150 lb). Its skull and dentition matched those of C. lupus, but its teeth were larger with greater shearing ability, and its bite force at the canine tooth was the strongest of any known Canis species. These characteristics are thought to be adaptations for preying on Late Pleistocene megaherbivores, and in North America its prey are known to have included horses, ground sloths, mastodons, bison, and camels. As with other large Canis hypercarnivores today, the dire wolf is thought to have been a pack hunter. Its extinction occurred during the Quaternary extinction event along with most of the American megafauna of the time, including a number of other carnivores, that occurred soon after the appearance of humans in the New World. Its reliance on megaherbivores has been proposed as the cause of its extinction, along with climatic change and competition with other species, or a combination of those factors. Dire wolves lived as recently as 9,500 years ago, according to dated remains.'
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
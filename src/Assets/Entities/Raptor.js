import React, { useState, useEffect } from "react";
import Entity from "./Entity"
import SpriteSheet from "../PlayerSpriteSheet.png";

class Raptor extends Entity {
    constructor(props, x,y) {
        super(props,x,y)
        this.bindCameraToEntity = false
        this.movesWithKeysCheck = false
        this.spriteX = 0
        this.spriteY = 2
        this.description = "The Guadalupe caracara (Caracara lutosa) or mourning caracara is an extinct bird of prey belonging to the falcon family (Falconidae). It was, together with the closely related crested and southern caracara, formerly placed in the genus Polyborus. It was also known as the quelili or the calalie. Described as 'evil' and 'vicious' by early observers, it was driven to extinction by a hunting and poisoning campaign led by goat herders on Guadalupe Island. As described by Edward Palmer: The 'Calalie' is abundant on every part of the island; and no bird could be a more persistent or more cruel enemy of the poultry and domestic animals. It is continually on the watch, and in spite of every precaution often snatches its prey from the very doors of the houses. The destruction of the wild goats is not so great, as these animals are better able to protect themselves than the tame ones. No sooner is one kid born - while the mother is in labor with the second - than the birds pounce upon it; and should the old one be able to interfere, she is also assaulted. No kid is safe from their attacks. Should a number be together, the birds unite their forces, and, with great noise and flapping of their wings, generally manage to separate the weakest one and dispatch it. They sometimes fasten upon the tongue when the poor creature opens its mouth to bleat, and have been known to tear it out, leaving the animal to perish, if not otherwise destroyed. Sometimes the anus is the point of first attack. The birds are cruel in the extreme, and the torture sometimes inflicted upon the defenceless animals is painful to witness... Even when food is plenty, they often attack living animals instead of contenting themselves with the carcasses of those already dead, seeming to delight in killing. Should one of their number be disabled or wounded, it is instantly dispatched by the rest."
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
        this.animateClock += 1
        if (this.animateClock % 30 === 0) {
            this.animateFrame = !this.animateFrame
        }

        this.animateFrame ? this.spriteY = 2 : this.spriteY = 3
    }
}




export default Raptor;
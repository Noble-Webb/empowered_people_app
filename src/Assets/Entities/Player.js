import React, { useState, useEffect } from "react";
import SpriteSheet from "../PlayerSpriteSheet.png";

class Entity {
  constructor(props, x, y) {
    this.keys = props.keys;
    this.count = props.count;
    this.canvas = props.canvas;
    this.ctx = props.ctx;
    this.x = x;
    this.y = y;
    this.map = props.map;
    this.bindCameraToEntity = true;
    this.lockCameraToMap = true;
    this.spriteX = 0;
    this.spriteY = 0;
    this.animateClock = 0;
    this.animateFrame = false;
    this.spriteSheet = document.createElement("img");
    this.spriteSheet.setAttribute("src", SpriteSheet);
    this.spriteSheet.setAttribute("hidden", true);
    this.animatesWithMovements = true;
    this.movesWithKeysCheck = true;
    document.getElementById("sheet-holder").appendChild(this.spriteSheet);
  }
  bindCamera() {
    let cameraX = this.x - parseInt(this.canvas.dataset.camerawidth) / 2 + 8;
    let cameraY = this.y - parseInt(this.canvas.dataset.cameraheight) / 2 + 8;
    if (this.lockCameraToMap) {
    }
    if (cameraX < 0) {
      cameraX = 0;
    }
    if (
      cameraX + parseInt(this.canvas.dataset.camerawidth) >
      this.canvas.width
    ) {
      cameraX = this.canvas.width - parseInt(this.canvas.dataset.camerawidth);
    }
    if (cameraY < 0) {
      cameraY = 0;
    }
    if (
      cameraY + parseInt(this.canvas.dataset.cameraheight) >
      this.canvas.height
    ) {
      cameraY = this.canvas.height - parseInt(this.canvas.dataset.cameraheight);
    }
    this.canvas.dataset.x = cameraX;
    this.canvas.dataset.y = cameraY;
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
  movesWithKeys() {
    let hsp = this.keys.right - this.keys.left;
    let vsp = this.keys.down - this.keys.up;
    let sideToCheck = null;
    if (this.animatesWithMovements) {
      this.animates(hsp, vsp);
    }

    if (hsp > 0) {
      sideToCheck = this.hb.right;
    } else {
      sideToCheck = this.hb.left;
    }
    if (
      this.collidingWithMap(sideToCheck + hsp, this.hb.top) ||
      this.collidingWithMap(sideToCheck + hsp, this.hb.bottom)
    ) {
      hsp = 0;
    }
    this.x += hsp;
    if (vsp > 0) {
      sideToCheck = this.hb.bottom;
    } else {
      sideToCheck = this.hb.top;
    }
    if (
      this.collidingWithMap(this.hb.left, sideToCheck + vsp) ||
      this.collidingWithMap(this.hb.right, sideToCheck + vsp)
    ) {
      vsp = 0;
    }
    this.y += vsp;
  }
  animates(hsp, vsp) {
    if (hsp !== 0 || vsp !== 0) {
      this.animateClock += 1;
      if (this.animateClock % 10 === 0) {
        this.animateFrame = !this.animateFrame;
      }

      if (vsp > 0) {
        this.spriteX = 0;
      } else if (vsp < 0) {
        this.spriteX = 2;
      }
      if (hsp > 0) {
        this.spriteX = 1;
      } else if (hsp < 0) {
        this.spriteX = 3;
      }
    } else {
      this.animateFrame = false;
    }

    if (this.animateFrame) {
      this.spriteY = 1;
    } else {
      this.spriteY = 0;
    }
  }

  setProps(props) {
    this.keys = props.keys;
    this.count = props.count;
  }

  loop() {
    this.hb = {
      left: this.x + 3,
      right: this.x + 12,
      top: this.y + 10,
      bottom: this.y + 15,
    };
    if (this.movesWithKeysCheck) {
      this.movesWithKeys();
    }

    // console.log(this.x,this.y)

    if (this.bindCameraToEntity) {
      this.bindCamera();
    }
  }
  random(start, range) {
    return start + Math.floor(Math.random() * range);
  }

  draw() {
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

export default Entity;
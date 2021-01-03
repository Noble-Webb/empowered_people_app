import React, { Component, useState, useEffect } from "react";
import Entity from "../Assets/Entities/Entity";
import Player from "../Assets/Entities/Player"
import TileDraw from "./TileDraw";
import TileSet from '../container/Assets/Tilesets/TileSet.png'
function Engine() {
  const [mounted, setMounted] = useState(false);
  const [timer, setTimer] = useState(null)
  let map = [
    [58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,], 
    [18,19,12,12,12,12,12,18,29,58,12,12,12,12,12,12,12,12,34,24,], 
    [20,21,12,12,12,12,12,20,21,58,12,12,12,12,12,12,12,12,32,40,], 
    [18,19,6,6,6,6,6,18,29,58,12,12,12,6,6,6,6,6,6,6,], 
    [20,21,6,6,6,6,6,20,21,58,12,12,12,6,6,6,6,6,6,6,], 
    [18,19,6,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6,], 
    [20,21,6,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6,], 
    [18,19,6,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6], 
    [20,21,4,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6,], 
    [18,19,4,12,12,12,12,12,12,12,12,12,12,9,9,9,9,9,9,9,], 
    [20,21,4,4,4,4,4,12,12,12,12,12,12,4,4,4,4,4,4,4,], 
    [18,19,4,4,4,4,4,4,4,4,4,4,4,4,50,13,13,50,49,48,], 
    [20,21,4,48,48,48,42,42,14,15,26,26,26,26,26,13,13,26,26,26,], 
    [26,26,13,26,26,55,49,49,16,17,4,4,4,4,4,4,4,4,4,4,], 
    [26,26,13,26,26,55,49,49,22,23,4,4,4,4,4,4,4,4,4,4,], 
    [62,62,13,62,62,47,62,62,62,38,39,4,4,4,4,4,50,4,4,4,], 
    [4,11,11,4,11,4,11,4,11,46,47,4,4,50,4,4,4,4,11,11,], 
    [11,4,11,11,4,11,4,11,4,11,54,4,4,4,4,4,4,50,4,4,], 
    [4,11,11,4,4,11,4,4,11,4,54,4,4,4,4,4,4,4,4,4,], 
    [11,11,4,11,11,4,11,11,4,11,54,4,4,4,4,4,4,4,50,50,],
  ];

  let up = false;
  let down = false;
  let left = false;
  let right = false;
  let entityLoop = {};
  let count = 0;
  let mainCanvas = null;
  let mainCtx = null;
  let tileMap = new TileDraw(map);
  let cameraX = 0;
  let cameraY = 0;
  let camera = null;
  let cameraCtx = null;
  let cameraWidth = 160;
  let cameraHeight = 120;
  let entityCount = 0

  document.addEventListener("keydown", (e) => checkKeyDown(e));
  document.addEventListener("keyup", (e) => checkKeyUp(e));

  function setProps() {
    return {
      keys: {up: up,
      down: down,
      left: left,
      right: right},
      count: count,
      canvas: camera,
      ctx: cameraCtx,
      map: map,
    };
  }

  function checkKeyDown(e) {
    switch (e.key) {
      case "w":
        up = true;
        break;
      case "s":
        down = true;
        break;
      case "a":
        left = true;
        break;
      case "d":
        right = true;
        break;
    }
  }
  function checkKeyUp(e) {
    switch (e.key) {
      case "w":
        up = false;
        break;
      case "s":
        down = false;
        break;
      case "a":
        left = false;
        break;
      case "d":
        right = false;
        break;
    }
  }

  function cameraCallBack(x, y) {
    console.log(x, y);
    cameraX = x;
    cameraY = y;
  }

  function blankScreen() {
    mainCanvas = document.getElementById("window-canvas");
    mainCtx = mainCanvas.getContext("2d");
    mainCtx.fillStyle = "black";
    mainCtx.fillRect(0, 0, 640, 480);
  }
  function loop() {
    tileMap.drawBuffer();
    count += 1;
    for (const entity in entityLoop) {
      entityLoop[entity].setProps(setProps());
      // entity.loop()
    }
    for (const entity in entityLoop) {
      entityLoop[entity].loop();
    }
    for (const entity in entityLoop) {
      entityLoop[entity].draw();
    }
    mainCtx.drawImage(
      camera,
      parseInt(camera.dataset.x),
      parseInt(camera.dataset.y),
      cameraWidth,
      cameraHeight,
      0,
      0,
      mainCanvas.width,
      mainCanvas.height
    );
  }
  useEffect(() => {
      
    if (mounted === false) {
      setTimer( setInterval(() => loop(), 16.66))
      blankScreen();
      setMounted(true);
      camera = document.getElementById("camera-canvas");
      cameraCtx = camera.getContext("2d");
      entityLoop = { 0: new Entity(setProps(), 304, 48) };
      mainCanvas = document.getElementById("window-canvas");
      mainCtx = mainCanvas.getContext("2d");
      tileMap.draw();
    }
    return function cleanup(){
        clearInterval(timer)
    }
  }, [] );

  return (
    <div className="full-screen" id="main-screen" width="100%" height="100%">
      <canvas
        height="180"
        width="320"
        id="window-canvas"
        style={{ width: "100%", height: "80%" }}
      ></canvas>
      <canvas
        height={tileMap.height}
        width={tileMap.width}
        id="buffer-canvas"
        hidden={true}
      />
      <canvas
        data-X={0}
        data-Y={0}
        data-cameraWidth={cameraWidth}
        data-cameraHeight={cameraHeight}
        height={tileMap.height}
        width={tileMap.width}
        id="camera-canvas"
        hidden={true}
      />
      <img src={TileSet} id="tile-set" hidden={true} />
      <div id="sheet-holder"></div>
    </div>
  );
}

export default Engine;
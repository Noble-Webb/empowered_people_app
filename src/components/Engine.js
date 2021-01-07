import React, { Component, useState, useEffect, useRef} from "react";
import Entity from "../Assets/Entities/Entity";
import Player from "../Assets/Entities/Player"
import Raptor from "../Assets/Entities/Raptor";
import DireWolf from "../Assets/Entities/DireWolf";
import BlueWhale from "../Assets/Entities/BlueWhale";
import Rodent from "../Assets/Entities/Rodent";
import TileDraw from "./TileDraw";
import TileSet from '../container/Assets/Tilesets/TileSet.png'
import Main from '../container/Assets/Musics/main.MP3'
import Intro from '../container/Assets/Musics/intro.MP3'


function Engine() {
  const [mounted, setMounted] = useState(false);
  const [timer, setTimer] = useState(null);
  const [mouseDownTime, setMouseDownTime] = useState(0);
  const [clickedThing, setClickedThing] = useState("Use the keys 'wasd' to navigate the world. and click on an animal to learn more about it.");
  const audio = useRef(null)
  const intro = useRef(new Audio(Intro))
  const main = useRef(new Audio(Main))

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
  let action = false;
  let clear = false;
  let go = false;
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
  document.addEventListener("mousedown", (e) => handleMouseDown(e));
  document.addEventListener("mouseup", (e) => handleMouseUp(e));

  function setProps() {
    return {
      keys: {up: up,
      down: down,
      left: left,
      right: right,
      action: action,
      clear: clear},
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
      case "e":
        action = true;
        break;  
      case " ":
        clear = true;
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
      case "e":
        action = false;
        break;
        case " ":
          clear = false;
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
    if(window.location.pathname === "/games/play"){
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
    mainCtx.translate(0.5, 0.5)
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
    mainCtx.fillStyle = "blue";
    mainCtx.fillRect(
      mainCanvas.dataset.mousex,
      mainCanvas.dataset.mousey,
      3,
      3
    );} else{ 
      clearInterval(timer)
    }
    mainCtx.translate(-0.5, -0.5)
  }

  function handleMouseMove(e) {
    let offset = e.target.getBoundingClientRect();
    let newMouseX = Math.floor(
      ((e.clientX - offset.left) * e.target.width) / e.target.clientWidth
    );
    let newMouseY = Math.floor(
      ((e.clientY - offset.top) * e.target.height) / e.target.clientHeight
    );

    let mainCanvas = document.getElementById("window-canvas");
    mainCanvas.dataset.mousex = newMouseX;
    mainCanvas.dataset.mousey = newMouseY;
    
  }
 function playAudio() {
   audio.current.removeEventListener("ended", null)
    audio.current = main.current 
    audio.current.play()
    audio.current.addEventListener("ended", ()=> playAudio())
 }

  useEffect(() => {
      
    if (mounted === false) {
      audio.current = intro.current
      audio.current.play()
      audio.current.addEventListener("ended", ()=> playAudio())
      
        setTimer( setInterval(() => loop(), 16.66))
      blankScreen();
      setMounted(true);
      camera = document.getElementById("camera-canvas");
      cameraCtx = camera.getContext("2d");
      entityLoop = { 
        0: new Entity(setProps(), 304, 48), 
        1: new Raptor(setProps(), 16, 16), 
        2: new DireWolf(setProps(), 65, 48), 
        3: new BlueWhale(setProps(), 80, 104), 
        4: new Rodent(setProps(), 160, 16) };

      mainCanvas = document.getElementById("window-canvas");
      mainCtx = mainCanvas.getContext("2d");
      tileMap.draw();
      // debugger 
    }
    return function cleanUp(){
      setMounted(false)
      audio.current.pause()
      console.log("yooo")
    }
  }, [] );
  
  function handleMouseDown(e) {
    const mainCanvas = document.getElementById("window-canvas");
    const camera = document.getElementById("camera-canvas");
    if (mouseDownTime === 0) {
      let newMouseTime = mouseDownTime + 1;
      setMouseDownTime(newMouseTime);
      // debugger 
      let mouseX = mainCanvas.dataset.mousex;
      let mouseY = mainCanvas.dataset.mousey;
      let diffW = camera.dataset.camerawidth / mainCanvas.width;
      let diffH = camera.dataset.cameraheight / mainCanvas.height;
      mouseX = mouseX * diffW;
      mouseY = mouseY * diffH;
      mouseX = parseInt(mouseX) + parseInt(camera.dataset.x);
      mouseY = parseInt(mouseY) + parseInt(camera.dataset.y);
      for (const entity in entityLoop) {
        let e = entityLoop[entity];

        if (
          mouseX >= e.cb.left &&
          mouseX <= e.cb.right &&
          mouseY >= e.cb.top &&
          mouseY <= e.cb.bottom
        ) {
    // Music.play()

          setClickedThing(e.description);
        }
      }
    }
  }

    function handleMouseUp(e) {
    setMouseDownTime(0);
  }
function clearClick(){
  // console.log("hey")
  setClickedThing(" ") 
}
function play(){
  console.log("hey")
  audio.current.pause()
  
}
  return (
    <React.Fragment>
      <div className="floating-">
    <h3><span id='Hey'>{clickedThing}</span></h3> 
    <audio id='myAudio' src={Main}></audio>
    <button onClick={()=> play()} > Stop the music?</button>
    {clickedThing === " " ? null : <button onClick={()=> clearClick()}>Clear</button>}
    </div>
    <div className="full-screen" id="main-screen" width="100%" height="100%">
      <canvas
        height="180"
        width="320"
        id="window-canvas"
        style={{ width: "60%", height: "auto" }}
        onMouseMove={(e) => handleMouseMove(e)}
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
    </React.Fragment>
  );
}


export default Engine;
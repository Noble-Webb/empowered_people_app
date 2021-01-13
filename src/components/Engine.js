import React, { Component, useState, useEffect, useRef} from "react";
import Entity from "../Assets/Entities/Entity";
import Player from "../Assets/Entities/Player";
import Raptor from "../Assets/Entities/Raptor";
import DireWolf from "../Assets/Entities/DireWolf";
import BlueWhale from "../Assets/Entities/mammals";
import Rodent from "../Assets/Entities/Rodent";
import TileDraw from "./TileDraw";
import TileSet from '../container/Assets/Tilesets/TileSet.png';
import Main from '../container/Assets/Musics/main.MP3';
import Intro from '../container/Assets/Musics/intro.MP3';


function Engine() {
  const [mounted, setMounted] = useState(false);
  const [timer, setTimer] = useState(null);
  const [mouseDownTime, setMouseDownTime] = useState(0);
  const [clickedThing, setClickedThing] = useState("Use the keys 'wasd' to navigate the world. and click on an animal to learn more about it.");
  const audio = useRef(null)
  const intro = useRef(new Audio(Intro))
  const main = useRef(new Audio(Main))

  // let map = [
  //   [58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,], 
  //   [18,19,12,12,12,12,12,18,29,58,12,12,12,12,12,12,12,12,34,24,], 
  //   [20,21,12,12,12,12,12,20,21,58,12,12,12,12,12,12,12,12,32,40,], 
  //   [18,19,6,6,6,6,6,18,29,58,12,12,12,6,6,6,6,6,6,6,], 
  //   [20,21,6,6,6,6,6,20,21,58,12,12,12,6,6,6,6,6,6,6,], 
  //   [18,19,6,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6,], 
  //   [20,21,6,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6,], 
  //   [18,19,6,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6], 
  //   [20,21,4,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6,], 
  //   [18,19,4,12,12,12,12,12,12,12,12,12,12,9,9,9,9,9,9,9,], 
  //   [20,21,4,4,4,4,4,12,12,12,12,12,12,4,4,4,4,4,4,4,], 
  //   [18,19,4,4,4,4,4,4,4,4,4,4,4,4,50,13,13,50,49,48,], 
  //   [20,21,4,48,48,48,42,42,14,15,26,26,26,26,26,13,13,26,26,26,], 
  //   [26,26,13,26,26,55,49,49,16,17,4,4,4,4,4,4,4,4,4,4,], 
  //   [26,26,13,26,26,55,49,49,22,23,4,4,4,4,4,4,4,4,4,4,], 
  //   [62,62,13,62,62,47,62,62,62,38,39,4,4,4,4,4,50,4,4,4,], 
  //   [4,11,11,4,11,4,11,4,11,46,47,4,4,50,4,4,4,4,11,11,], 
  //   [11,4,11,11,4,11,4,11,4,11,54,4,4,4,4,4,4,50,4,4,], 
  //   [4,11,11,4,4,11,4,4,11,4,54,4,4,4,4,4,4,4,4,4,], 
  //   [11,11,4,11,11,4,11,11,4,11,54,4,4,4,4,4,4,4,50,50,],
  // ];

  let map =[[28,29,28,29,28,29,21,20,21,20,21,20,21,20,21,20,21,20,28,29,21,55,58,58,58,16,39,20,28,29,21,54,20,21,20,21,20,21,20,21],[29,28,29,21,20,21,4,4,4,4,1,2,2,3,4,4,4,4,20,28,19,55,58,58,58,22,16,39,20,28,19,16,63,63,63,63,63,63,63,63],[28,29,28,19,4,1,2,2,2,2,6,12,12,6,3,4,4,4,4,20,21,55,58,58,58,58,22,16,39,20,21,22,26,26,26,26,26,26,26,26],[29,28,29,21,1,6,12,12,6,9,9,6,12,12,6,2,2,3,4,18,19,55,58,58,58,58,58,22,16,39,4,22,26,26,26,26,26,26,26,26],[21,20,21,4,5,12,12,12,7,48,48,8,6,12,12,12,12,7,18,29,21,55,58,58,58,58,58,58,22,16,39,30,26,26,26,26,26,26,26,26],[19,4,4,4,8,6,12,12,7,48,48,48,8,12,12,12,12,7,20,21,49,55,58,58,58,58,58,58,58,22,16,39,35,34,37,50,18,19,18,29],[21,4,4,4,4,5,12,12,7,48,48,48,38,63,63,63,63,63,63,63,63,17,58,58,58,58,58,58,58,58,22,55,43,44,45,50,20,28,29,28],[19,4,4,4,4,8,9,9,10,48,48,48,55,26,26,26,26,26,26,26,26,23,15,58,58,58,58,58,58,58,58,55,32,40,32,27,4,20,28,29],[28,19,4,18,19,4,4,4,4,4,48,48,55,26,26,26,26,26,26,26,26,23,55,58,58,58,58,58,58,58,58,55,4,11,4,4,4,4,20,28],[29,28,19,20,21,4,4,4,4,4,4,4,55,26,26,26,26,26,26,26,26,31,55,58,58,58,58,58,58,58,58,55,4,11,4,4,4,4,18,29],[21,20,21,4,4,4,4,4,4,4,4,4,55,18,19,18,19,49,49,49,18,19,55,62,62,62,62,62,62,62,62,47,4,11,4,4,4,4,20,28],[63,63,63,63,63,63,63,13,63,63,63,63,17,20,28,29,21,49,49,18,29,21,55,51,52,53,50,50,50,4,4,4,4,11,4,4,4,4,18,29],[26,26,26,26,26,26,26,13,26,26,26,26,23,18,29,28,19,4,4,20,28,19,55,59,60,61,50,4,4,4,4,4,4,11,4,4,4,4,20,28],[26,26,26,26,26,26,26,13,26,26,26,26,23,20,28,29,21,25,25,25,20,21,55,33,40,33,4,42,42,42,42,42,4,11,4,4,4,4,18,29],[26,26,26,26,26,26,26,13,26,26,26,26,31,18,29,21,4,33,41,33,18,19,55,4,11,4,4,42,11,11,11,42,4,11,4,4,4,4,20,28],[18,19,18,19,50,4,5,6,6,2,2,2,3,20,21,4,4,4,4,4,20,21,55,4,11,11,11,11,11,34,11,11,11,11,4,4,4,4,18,29],[29,28,29,28,19,4,8,6,6,6,6,6,6,2,2,2,2,3,4,4,4,50,55,4,4,4,4,42,11,11,11,42,4,4,4,4,4,4,20,28],[21,20,21,20,21,4,4,8,6,6,6,6,6,6,6,6,6,6,2,2,2,2,55,4,4,4,4,42,42,11,42,42,4,4,4,24,24,24,18,29],[63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,39,6,6,6,6,6,6,55,42,42,42,4,27,4,11,4,4,4,4,4,32,41,32,20,28],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,55,6,6,6,6,6,6,55,12,12,7,4,4,4,11,11,11,11,11,11,11,11,4,4,20],[58,58,58,58,4,4,4,1,2,12,58,58,58,10,54,55,6,6,6,6,6,6,55,12,12,7,4,4,4,11,4,4,4,18,19,4,4,4,49,38],[58,58,58,58,4,4,1,6,12,12,58,58,10,49,54,16,63,63,63,63,13,63,17,12,12,7,4,4,4,11,4,4,18,29,21,4,4,49,49,54],[58,58,58,58,4,4,5,12,6,9,9,10,18,19,54,22,26,26,26,26,13,26,23,12,12,7,4,4,4,11,4,4,20,21,4,49,49,49,49,54],[58,58,58,4,1,2,6,12,7,4,49,49,20,21,54,30,26,26,26,26,13,26,31,42,42,42,4,4,4,11,4,38,63,63,63,63,63,63,63,17],[58,58,4,4,5,6,12,12,6,2,3,4,49,49,54,4,35,36,37,4,11,4,4,4,4,4,4,4,4,11,4,55,26,26,26,26,26,26,26,23],[58,4,4,1,58,58,12,12,12,6,12,2,2,2,54,4,43,44,45,25,11,11,11,11,11,11,11,11,11,11,4,55,26,26,26,26,26,26,26,31],[58,4,1,58,58,58,9,6,12,12,12,12,58,58,54,4,33,41,33,33,4,4,4,11,4,4,4,4,4,4,4,55,6,6,6,7,49,58,58,58],[58,4,8,58,58,10,4,8,6,12,12,58,58,58,54,4,4,4,4,4,4,4,4,11,4,4,4,4,4,4,4,55,6,6,6,10,49,58,58,58],[58,4,4,8,10,4,4,4,8,6,12,12,58,58,16,63,63,63,63,63,63,63,63,13,63,63,63,63,63,63,63,17,6,6,10,49,4,58,58,58],[58,4,4,4,4,4,58,4,4,8,6,12,9,9,22,26,26,26,26,26,26,26,26,13,26,26,26,26,26,26,26,23,9,10,49,4,4,58,58,58],[58,4,4,4,4,58,58,58,49,49,5,7,18,19,30,26,26,26,26,26,26,26,26,13,26,26,26,26,26,26,26,31,18,19,48,4,58,58,58,58],[58,58,4,4,58,58,58,58,49,49,5,7,20,21,49,49,1,6,6,7,4,5,12,12,12,58,58,58,58,6,9,10,20,21,48,4,58,58,58,58],[58,58,4,4,58,58,58,49,49,49,5,6,2,2,2,2,6,6,6,10,4,5,12,12,12,12,6,6,6,10,4,48,48,4,4,4,58,58,58,58],[58,58,58,58,58,4,4,4,1,2,6,12,12,12,12,6,6,6,10,4,1,6,6,6,6,6,9,9,10,4,4,4,4,4,58,58,58,58,58,58],[58,58,58,4,4,4,4,1,6,6,12,12,12,6,6,9,9,10,4,4,5,6,6,6,6,10,4,4,4,58,58,58,58,58,58,58,58,58,58,58],[58,58,58,4,4,4,4,8,6,6,12,12,6,6,10,18,19,4,4,4,5,6,6,6,10,4,4,4,58,58,58,58,58,58,58,58,58,58,58,58],[58,58,58,58,58,4,4,4,8,9,9,9,9,10,4,20,21,4,4,4,8,9,9,9,4,4,4,4,58,58,58,58,58,58,58,58,58,58,58,58],[58,58,58,58,58,58,58,4,4,4,4,4,4,4,4,4,4,4,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58],[58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58],[58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58],]

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
  //take (camera width / 4) * 3   4:3 ratio
  let cameraWidth = 190;// multiple of 4
  let cameraHeight = 142.5;// mutiple 3
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
      entityLoop: entityLoop
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
        0: new Entity(setProps(), 288, 244), 
        1: new Raptor(setProps(), 241, 188), 
        2: new Raptor(setProps(), 28, 40), 
        3: new Raptor(setProps(), 528, 72), 

        4: new DireWolf(setProps(), 86, 66),
        5: new DireWolf(setProps(), 248, 74), 
        10: new DireWolf(setProps(), 49, 160), 

        6: new BlueWhale(setProps(), 385, 112), 

        7: new Rodent(setProps(), 375, 316), 
        8: new Rodent(setProps(), 602, 303),
        9: new Rodent(setProps(), 64, 367) };

      mainCanvas = document.getElementById("window-canvas");
      mainCtx = mainCanvas.getContext("2d");
      tileMap.draw();
      // debugger 
    }
    return function cleanUp(){
      setMounted(false)
      audio.current.pause()
      // console.log("yooo")
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
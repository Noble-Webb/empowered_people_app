import React, { Component, useState, useEffect, useRef} from "react";
import Entity from "../Assets/Entities/Entity";
import WaterAnimal from "../Assets/Entities/WaterAnimal";
import LLandAnimal from "../Assets/Entities/LLandAnimal";
import Player from "../Assets/Entities/Player";
import Raptor from "../Assets/Entities/Raptor";
import DireWolf from "../Assets/Entities/DireWolf";
import AtlanticGrayWhale from "../Assets/Entities/AtlanticGrayWhale";
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

        6: new AtlanticGrayWhale(setProps(), 385, 112), 

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
        let animal = ''
        if (
          mouseX >= e.cb.left &&
          mouseX <= e.cb.right &&
          mouseY >= e.cb.top &&
          mouseY <= e.cb.bottom
        ) {
          fetch('http://localhost:3002/mammals')
          .then(resp => resp.json())
          .then(mammals =>{
           return  mammals.find(
              mammal =>{
                // debugger 
              if(mammal.common_name.toLowerCase() === e.name.toLowerCase()){
                animal = mammal.description
              }
              console.log(animal)
              setClickedThing(animal);
              }
            )
          })
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

// import React, { Component, useState, useEffect, useRef } from "react";
// import Entity from "../Assets/Entities/Entity";
// import Player from "../Assets/Entities/Player";
// import TileDraw from "./TileDraw";
// import TileSet from '../container/Assets/Tilesets/TileSet.png';
// import Raptor from "../Assets/Entities/Raptor";
// import DireWolf from "../Assets/Entities/DireWolf";
// import BlueWhale from "../Assets/Entities/BlueWhale";
// import Urlis from "../Assets/Urlis";
// import Exit from "../Assets/Exit";

// function Engine() {
//   const [mounted, setMounted] = useState(false);
//   const [mouseDownTime, setMouseDownTime] = useState(0);
//   const [clickedThing, setClickedThing] = useState("Loading...");
//   const playerCoord = useRef({ x: 64, y: 48 });
//   const loaded = useRef(false);
//   const tileMap = useRef(null);
//   const loading = useRef(false);
//   const moveRight = useRef(false);
//   const moveLeft = useRef(false);
//   const moveDown = useRef(false);
//   const moveUp = useRef(false);
//   const mapNumber = useRef(1);
//   const map = useRef([]);
//   const entityLoop = useRef({});
//   const exitLoop = useRef({});
//   const loopInterval = useRef(null);
//   let up = false;
//   let down = false;
//   let left = false;
//   let right = false;
//   let action = false;

//   let count = 0;
//   let mainCanvas = null;
//   let mainCtx = null;
//   let cameraX = 0;
//   let cameraY = 0;
//   let camera = null;
//   let cameraCtx = null;
//   let cameraWidth = 160;
//   let cameraHeight = 120;
//   let entityCount = 0;

//   document.addEventListener("keydown", (e) => checkKeyDown(e));
//   document.addEventListener("keyup", (e) => checkKeyUp(e));
//   document.addEventListener("mousedown", (e) => handleMouseDown(e));
//   document.addEventListener("mouseup", (e) => handleMouseUp(e));

//   function setProps() {
//     let camera = document.getElementById("camera-canvas");
//     let cameraCtx = camera.getContext("2d");
//     return {
//       keys: { up: up, down: down, left: left, right: right, action: action },
//       count: count,
//       canvas: camera,
//       ctx: cameraCtx,
//       map: map.current,
//     };
//   }

//   function checkKeyDown(e) {
//     switch (e.key) {
//       case "w":
//         up = true;
//         break;
//       case "s":
//         down = true;
//         break;
//       case "a":
//         left = true;
//         break;
//       case "d":
//         right = true;
//         break;
//       case "e":
//         action = true;
//         break;
//     }
//   }
//   function checkKeyUp(e) {
//     switch (e.key) {
//       case "w":
//         up = false;
//         break;
//       case "s":
//         down = false;
//         break;
//       case "a":
//         left = false;
//         break;
//       case "d":
//         right = false;
//         break;
//       case "e":
//         action = false;
//         break;
//     }
//   }

//   function cameraCallBack(x, y) {
//     console.log(x, y);
//     cameraX = x;
//     cameraY = y;
//   }

//   function blankScreen() {
//     mainCanvas = document.getElementById("window-canvas");
//     mainCtx = mainCanvas.getContext("2d");
//     mainCtx.fillStyle = "black";
//     mainCtx.fillRect(0, 0, 640, 480);
//   }
//   function loop() {
//     tileMap.current.drawBuffer();
//     count += 1;
//     for (const entity in entityLoop.current) {
//       entityLoop.current[entity].setProps(setProps());
//       // entity.loop()
//     }
//     for (const entity in entityLoop.current) {
//       entityLoop.current[entity].loop();
//     }
//     for (const entity in entityLoop.current) {
//       entityLoop.current[entity].draw();
//     }
//     for (const exit in exitLoop.current) {
//       let player = entityLoop.current[0];
//       exitLoop.current[exit].setProps({
//         player: player,
//         moveMaps: () =>
//           moveMaps(exitLoop.current[exit].goTo, exitLoop.current[exit].kind),
//       });
//     }
//     for (const exit in exitLoop.current) {
//       exitLoop.current[exit].loop();
//     }
//     mainCtx.translate(0.5,0.5)
//     mainCtx.drawImage(
//       camera,
//       parseInt(camera.dataset.x),
//       parseInt(camera.dataset.y),
//       cameraWidth,
//       cameraHeight,
//       0,
//       0,

//       mainCanvas.width,
//       mainCanvas.height
//     );

//     mainCtx.fillStyle = "blue";
//     mainCtx.fillRect(
//       mainCanvas.dataset.mousex,
//       mainCanvas.dataset.mousey,
//       3,
//       3
//     );
//     mainCtx.translate(-0.5,-0.5)
//   }

//   function moveMaps(goTo, kind) {
//     clearInterval(loopInterval.current);
//     setClickedThing("loading...");
//     playerCoord.current = {x: entityLoop.current[0].x, y: entityLoop.current[0].y}
//     mapNumber.current = goTo;
//     tileMap.current = null;
//     setMounted(false);
//     map.current = [];
//     loading.current = false;
//     entityLoop.current = {};
//     exitLoop.current = {};
//     switch (kind) {
//       case "right":
//         moveRight.current = true;
//         break;
//       case "left":
//         moveLeft.current = true;
//         break;
//       case "up":
//         moveUp.current = true;
//         break;
//       case "down":
//         moveDown.current = true;
//         break;
//     }
//   }

//   function handleMouseMove(e) {
//     let offset = e.target.getBoundingClientRect();
//     let newMouseX = Math.floor(
//       ((e.clientX - offset.left) * e.target.width) / e.target.clientWidth
//     );
//     let newMouseY = Math.floor(
//       ((e.clientY - offset.top) * e.target.height) / e.target.clientHeight
//     );

//     let mainCanvas = document.getElementById("window-canvas");
//     mainCanvas.dataset.mousex = newMouseX;
//     mainCanvas.dataset.mousey = newMouseY;
//     // debugger
//   }
//   useEffect(() => {
//     if (mounted === false && map.current.length > 0) {
//       console.log("moving");
//       loopInterval.current = setInterval(() => loop(), 16.66);
//       blankScreen();
//       setMounted(true);
//       camera = document.getElementById("camera-canvas");
//       cameraCtx = camera.getContext("2d");

//       mainCanvas = document.getElementById("window-canvas");
//       mainCtx = mainCanvas.getContext("2d");
//       tileMap.current.draw();
//     }
//     if (map.current.length === 0 && loading.current === false) {
//       loading.current = true;
//       fetch(Urlis + "/map/show/" + `${mapNumber.current}`)
//         .then((resp) => resp.json())
//         .then((newMap) => {
//           //If you want to create a default map, this is the place
//           let brandNew = newMap.tiles.split("[").filter((string) => {
//             return string !== "";
//           });
//           let newMapReturn = [];
//           let count = 0;
//           for (const string in brandNew) {
//             newMapReturn[count] = brandNew[string]
//               .split(",")
//               .filter((s) => {
//                 return s !== "";
//               })
//               .filter((s) => {
//                 return s !== "]";
//               })
//               .map((s) => {
//                 return parseInt(s);
//               });
//             count += 1;
//           }
//           map.current = newMapReturn;
//           tileMap.current = new TileDraw(map.current);
//           function asyncEntities(entities) {
//             let newEntities = entities.split("\n");
//             let emptyEntities = [];
//             for (const index in newEntities) {
//               let entity = newEntities[index].split(" ");
//               switch (entity[0]) {
//                 // Add any new Entity creation to this loop

//                 case "Direwolf":
//                   emptyEntities[index] = new DireWolf(
//                     setProps(),
//                     parseInt(entity[1]),
//                     parseInt(entity[2])
//                   );
//                   break;
//                 case "Bluewhale":
//                   emptyEntities[index] = new BlueWhale(
//                     setProps(),
//                     parseInt(entity[1]),
//                     parseInt(entity[2])
//                   );
//                   break;
//                 case "Raptor":
//                   emptyEntities[index] = new Raptor(
//                     setProps(),
//                     parseInt(entity[1]),
//                     parseInt(entity[2])
//                   );
//                   break;
//               }
//             }
//             let currentX
//             let currentY
//             if (entityLoop.length > 0){
//               currentX = entityLoop.current[0].x
//               currentY = entityLoop.current[0].y
//             } else {
//               currentX = playerCoord.current.x
//               currentY = playerCoord.current.y
//             }

//             entityLoop.current = {
//               0: new Player(
//                 setProps(),
//                 currentX,
//                 currentY
//               ),
//             };

//             playerCoord.current = {x: currentX, y: currentY}
//             if (moveRight.current){
//               // debugger
//               entityLoop.current[0].x = 8
//               entityLoop.current[0].y = currentY
//               moveRight.current = false
//             }
//             if (moveLeft.current){
//               entityLoop.current[0].x = tileMap.current.width - 24
//               entityLoop.current[0].y = currentY
//               moveLeft.current = false
//             }
//             if (moveUp.current){
//               entityLoop.current[0].y = tileMap.current.height - 24
//               entityLoop.current[0].x = currentX
//               moveUp.current = false
//             }
//             if (moveDown.current){
//               entityLoop.current[0].y = 8
//               entityLoop.current[0].x = currentX
//               moveDown.current = false
//             }
//             for (const index in emptyEntities) {
//               entityLoop.current[parseInt(index) + 1] =
//                 emptyEntities[parseInt(index)];
//             }
//           }
//           exitLoop.current = {}
//           function asyncExits(exits) {
//             let lines = exits.split('\n')
//             for (const index in lines) {
//               let commands = lines[index].split(' ')
//               exitLoop.current[index] = new Exit({}, commands[0], commands[1], commands[2], commands[3], commands[4], commands[5])
//             }
//           }

//           function loadCallback(entities) {
//             setTimeout(() => asyncEntities(entities), 16);
//             setTimeout(() => asyncExits(newMap.exits), 16);
//             setClickedThing("Nada");
//           }

//           setTimeout(() => loadCallback(newMap.entities), 200);
//         });
//     }
//   });
//   function handleMouseDown(e) {
//     console.log(entityLoop.current);
//     const mainCanvas = document.getElementById("window-canvas");
//     const camera = document.getElementById("camera-canvas");
//     if (mouseDownTime === 0) {
//       let newMouseTime = mouseDownTime + 1;
//       setMouseDownTime(newMouseTime);
//       let mouseX = mainCanvas.dataset.mousex;
//       let mouseY = mainCanvas.dataset.mousey;
//       let diffW = camera.dataset.camerawidth / mainCanvas.width;
//       let diffH = camera.dataset.cameraheight / mainCanvas.height;
//       mouseX = mouseX * diffW;
//       mouseY = mouseY * diffH;
//       mouseX = parseInt(mouseX) + parseInt(camera.dataset.x);
//       mouseY = parseInt(mouseY) + parseInt(camera.dataset.y);
//       for (const entity in entityLoop.current) {
//         let e = entityLoop.current[entity];
//         if (
//           mouseX >= e.cb.left &&
//           mouseX <= e.cb.right &&
//           mouseY >= e.cb.top &&
//           mouseY <= e.cb.bottom
//         ) {
//           setClickedThing(e.name);
//         }
//       }
//     }
//   }

//   function handleMouseUp(e) {
//     setMouseDownTime(0);
//   }

//   function RenderPlayArea() {
//     return (
//       <React.Fragment>
//         <div
//           className="full-screen"
//           id="main-screen"
//           width="50%"
//           height="50%"
//         >
//           <canvas
//             data-mousex="0"
//             data-mousey="0"
//             height="240"
//             width="320"
//             id="window-canvas"
//             style={{ width: "50%", height: "50%" }}
//             onMouseMove={(e) => handleMouseMove(e)}
//           ></canvas>
//           <canvas
//             height={tileMap.current.height}
//             width={tileMap.current.width}
//             id="buffer-canvas"
//             hidden={true}
//           />
//           <canvas
//             data-X={0}
//             data-Y={0}
//             data-cameraWidth={cameraWidth}
//             data-cameraHeight={cameraHeight}
//             height={tileMap.current.height}
//             width={tileMap.current.width}
//             id="camera-canvas"
//             hidden={true}
//           />
//           <img src={TileSet} id="tile-set" hidden={true} />
//           <div id="sheet-holder"></div>
//         </div>
//       </React.Fragment>
//     );
//   }

//   return (
//     <React.Fragment>
//       <h2>{clickedThing !== "Nada" ? clickedThing : "Nothing is Clicked"}</h2>
//       {tileMap.current !== null ? RenderPlayArea() : null}
//     </React.Fragment>
//   );
// }

// export default Engine;

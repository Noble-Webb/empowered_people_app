import TileSet from '../container/Assets/Tilesets/TileSet.png'
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";



  function Canvas(props) {

    const handleSubmit= (e) => {
      // e.preventDefault();
      const target = props.users.id  
      
      const editedProfile = {
        username: props.users.username,
        profile_pic: props.users.profile_pic,
        family: props.users.family,
        map_suggestion: e.target.value
      }
      // debugger 
      //  props.handleSubmit(target, editedProfile)
      const reqObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:  JSON.stringify(editedProfile)
      }
  
      fetch(`http://localhost:3002/users/${target}`, reqObj)
      .then(resp => resp.json())
      .then(updatedUser => {
        console.log(updatedUser)
          
          }
      )
    }

    const [mouseX, setMouseX] = useState(0); //mouse coordinates in the map
    const [mouseY, setMouseY] = useState(0);
    const [tileMouseX, setTileMouseX] = useState(0); //mouse coordinates in the tilemap selector
    const [tileMouseY, setTileMouseY] = useState(0);
    const [tileX, setTileX] = useState(0); //coordinates of the tilemap's selected sprite
    const [tileY, setTileY] = useState(0);
    const [tileWidth, setTileWidth] = useState(40); //how wide the tilemap is
    const [tileHeight, setTileHeight] = useState(40); //how tall the tilemap is
    const [rendered, setRendered] = useState(false); //sees if the component is doing its first render. If it is it defines all of the dimensions of the canvas
    const [drawFirstBuffer, setDrawFirstBuffer] = useState(true); //sees if buffer has been drawn to yet, if not it builds the scene array and draws the grid to the buffer
    const [sceneArray, setSceneArray] = useState([[0]]); //the output array of the scene
    const canvasWidth = 1000; //defines the size of the canvas in the window. Resize as needed for styling
    useEffect(() => {
      if (tileWidth < 1) {
          setTileWidth(1);
        }
        if (tileHeight < 1) {
          setTileHeight(1);
        }
      const mainCanvas = document.getElementById("main-canvas");
      const tileCanvas = document.getElementById("tile-canvas");
      function summer(total, num) {
          return total + num;
        }
      if (drawFirstBuffer) {
        //checks if the buffer has been drawn or if the tile width and height has changed. if so it creates a new array and sets it properly
        const bufferCanvas = document.getElementById("buffer-canvas");
        const bctx = bufferCanvas.getContext("2d");
        bufferCanvas.width = (tileWidth * 17) + (1* (tileWidth < 1));
        bufferCanvas.height = (tileHeight * 17) + (1 * (tileHeight < 1));
        bctx.fillStyle = "white";
        bctx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);
        for (var i = 1; i < tileWidth; i++) {
          bctx.beginPath();
          bctx.strokeStyle = "black";
          bctx.lineWidth = "1";
          bctx.moveTo(i * 17, 0);
          bctx.lineTo(i * 17, tileHeight * 17);
          bctx.stroke();
        }
        for (var i = 1; i < tileHeight; i++) {
          bctx.beginPath();
          bctx.strokeStyle = "black";
          bctx.lineWidth = "1";
          bctx.moveTo(0, i * 17);
          bctx.lineTo(tileWidth * 17, i * 17);
          bctx.stroke();
        }
        let oldScene = sceneArray;
        let scene = Array(tileHeight);
        for (var i = 0; i < tileHeight; i++) {
          scene[i] = Array(tileWidth);
          for (var j = 0; j < tileWidth; j++) {
            scene[i][j] = 0;
          }
        }
        let hasTiles = false
        oldScene.forEach((row) => {
            if (row.reduce(summer) > 0) {
                hasTiles = true
            }
        })
        if (hasTiles) {
            console.log("Scene has tiles")
          let rowCount = 0;
          oldScene.forEach((row) => {
            let colCount = 0;
            if (rowCount < tileHeight) {
              row.forEach((value) => {
                if (colCount < tileWidth) {
                    scene[rowCount][colCount] = oldScene[rowCount][colCount]
                      let yy = Math.floor(value/ 8)
                      let xx = value - yy
                    drawTile(colCount,rowCount,xx,yy)
                }
                colCount += 1
              });
            }
            rowCount += 1
          });
        }
        setSceneArray(scene);
        setDrawFirstBuffer(false);
      }
      tileCanvas.width = canvasWidth / 2;
      tileCanvas.height = canvasWidth / 2;
      mainCanvas.width = canvasWidth;
      mainCanvas.height = canvasWidth;
      setRendered(true);
    });
    function drawTile(x,y,tilex,tiley) {
      let tiles = document.getElementById("tile-set");
      const bufferCanvas = document.getElementById("buffer-canvas");
      const bctx = bufferCanvas.getContext("2d");
      bctx.drawImage(
        tiles,
        tilex * 16,
        tiley * 16,
        16,
        16,
        x * 17,
        y * 17,
        16,
        16
      );
    }
    if (rendered) {
      const mainCanvas = document.getElementById("main-canvas");
      const ctx = mainCanvas.getContext("2d");
      const bufferCanvas = document.getElementById("buffer-canvas");
      const bctx = bufferCanvas.getContext("2d");
      const tileCanvas = document.getElementById("tile-canvas");
      const tctx = tileCanvas.getContext("2d");
      const image = document.getElementById("tile-set");
      ctx.fillStyle = "red";
      ctx.drawImage(bufferCanvas, 0, 0, canvasWidth, canvasWidth);
      tctx.drawImage(image, 0, 0, canvasWidth / 2, canvasWidth / 2);
      ctx.fillStyle = "blue";
      // ctx.drawRect
      ctx.fillRect(mouseX - 8, mouseY - 8, 16, 16);
      tctx.beginPath();
      tctx.lineWidth = "4";
      tctx.strokeStyle = "blue";
      tctx.rect(
        tileX * (canvasWidth / 2 / 8),
        tileY * (canvasWidth / 2 / 8),
        canvasWidth / 2 / 8,
        canvasWidth / 2 / 8
      );
      tctx.stroke();
      tctx.fillRect(tileMouseX - 8, tileMouseY - 8, 16, 16);
    }
    function handleMouseMove(e) {
      let offset = e.target.getBoundingClientRect();
      setMouseX(e.clientX - offset.left);
      setMouseY(e.clientY - offset.top);
    }
    function handleTileMove(e) {
      let offset = e.target.getBoundingClientRect();
      setTileMouseX(e.clientX - offset.left);
      setTileMouseY(e.clientY - offset.top);
    }
    function handleTileClick(e) {
      setTileX(Math.floor(tileMouseX / (canvasWidth / 2 / 8)));
      setTileY(Math.floor(tileMouseY / (canvasWidth / 2 / 8)));
    }
    function handleMapClick(e) {
      let xx = Math.floor(mouseX / (canvasWidth / tileWidth));
      let yy = Math.floor(mouseY / (canvasWidth / tileHeight));
      drawTile(xx,yy,tileX,tileY)
      let newScene = sceneArray;
      newScene[yy][xx] = tileX + tileY * 8;
      setSceneArray(newScene);
    }
    function handleTileChange(e) {
      if (e.target.name === "tile-width") {
          if (e.target.value) {
          setTileWidth(e.target.value);
          } else {
          setTileWidth(1)
          }
      } else if (e.target.name === "tile-height") {
          if (e.target.value) {
              setTileHeight(e.target.value);
              } else {
              setTileHeight(1)
              }
      }
      setDrawFirstBuffer(true);
    }
    function sceneArrayBuilder() {
      let newString = "[";
      sceneArray.forEach((row) => {
        newString += `[${row}],`;
      });
      newString += "]";
      return newString;
    }

    return (
      <div>
        <h2>Editor</h2>
        <h3>Current Tile {`${tileX}, ${tileY}`}</h3>
        <form>
          <input
            type="number"
            name="tile-width"
            placeholder="tile-width"
            value={tileWidth}
            onChange={(e) => handleTileChange(e)}
          ></input>
          <input
            type="number"
            name="tile-height"
            placeholder="tile-height"
            value={tileHeight}
            onChange={(e) => handleTileChange(e)}
          ></input>
        </form>
        <div className="container-fluid">
          <canvas
            id="main-canvas"
            onMouseMove={(e) => handleMouseMove(e)}
            onClick={(e) => handleMapClick(e)}
          ></canvas>
          <canvas id="buffer-canvas" hidden="true"></canvas>
          <img id="tile-set" src={TileSet} hidden="true"></img>
          <canvas
            id="tile-canvas"
            onMouseMove={(e) => handleTileMove(e)}
            onClick={(e) => handleTileClick(e)}
          ></canvas>
        </div>
        <input type="text" value={sceneArrayBuilder()} />
        <button
          type="button"
          value={sceneArrayBuilder()}
          onClick={(e)=>handleSubmit(e)} 
          className="btn btn-primary"><span aria-hidden="true">&times;</span> Submit Suggestion</button>
      </div>
    );
  }
  const mapStateToProps = state => {
    return ({
      users: state.users,
      auth: state.auth, 
      posts: state.posts,
      games: state.games
    })
  }
export default connect(mapStateToProps, null)(Canvas);




// import React, {useState, useEffect} from 'react'
// const Canvas = () => {
//         const [mouseX, setMouseX] = useState(0)
//         const [mouseY, setMouseY] = useState(0)
//         function _onMouseMove(e){
//             setMouseX(e.pageX)
//             setMouseY(e.pageY)
//         }

// useEffect(() => {
    
//     // let image = new Image();
//     let image = document.getElementById("image")
//     // image.src = '../container/Assets/Tilesets/TileSet.jpg';
   
//     const tileWidth = 16,
//     tileHeight = 16;
    
//     const mapRows = 20,
//     mapColumns = 20;
    
//     const sourceWidth = 128,
//     sourceHeight = 128;
    
//     let tiles = new Array(mapColumns * mapRows);
    
//     let mapHeight = mapRows * tileHeight;
    
//     let mapWidth = mapColumns * tileWidth;
    
//     let sourceX, sourceY, sourceTile;
    
//     let canvas = document.getElementById('myCanvas');
    
//     let context = canvas.getContext('2d');
    
//     let mouseDown;
    
//     canvas.addEventListener('mousedown', doMouseDown);
    
//     document.addEventListener('contextmenu', event => event.preventDefault());
    
//     canvas.addEventListener('mousemove', doMouseMove);
    
//     canvas.addEventListener('click', doMouseClick);
    
//     canvas.addEventListener('mouseup', doMouseUp);
    
//     image.addEventListener('load', redrawSource);
    
//     // draw the grid
//     let newTiles = []
    
//     for (let i = 0; i <=mapRows; i++) {
//         newTiles[i] = new Array(mapColumns)
//     }

//     for (let i = 0; i <= mapColumns; i++) {
//         context.moveTo(i * tileWidth, 0);
        
//         context.lineTo(i * tileWidth, mapHeight);
//     }
    
//     context.stroke();
    
//     for (let i = 0; i <= mapRows; i++) {
//         context.moveTo(0, i * tileHeight);
        
//         context.lineTo(mapWidth, i * tileHeight);
//     }
    
//     context.stroke();
    
//     function redrawSource() {
//         // debugger
//         context.drawImage(image, 0, 0, sourceWidth, sourceHeight, 0, mapHeight, sourceWidth, sourceHeight);
//     }
//     // redrawSource(image)
//     function doMouseUp(e) {
//         mouseDown = false;
//         // update the string    
//         let string = 'let tiles = [';
//             for (let i = 0; i < mapRows; i ++){
//                 string = string + "["
//                 for (let j = 0; j < mapColumns; j ++){
//                     if (tiles[(i * mapColumns) + j]){
//                     string = string + `${tiles[(i * mapColumns) + j]},`
//                     } else {
//                         string += "0,"
//                     }
//                 }
//                 string = string + "],\n"
//             }
//             string = string + '];';
//         document.getElementById('result').innerHTML = string;
//     }

//     function doMouseDown(e) {
//         mouseDown = true;
        
//         let x = mouseX;
        
//         let y = mouseY;
        
//         let gridX = Math.floor(x / tileWidth) * tileWidth;
       
//         let gridY = Math.floor(y / tileHeight) * tileHeight;
       
//         if (y > mapHeight && y < (mapHeight + sourceHeight) && x < sourceWidth) { // source
//             let tileX = Math.floor(x / tileWidth);
            
//             let tileY = Math.floor((y - mapHeight) / tileHeight);
            
//             sourceTile = tileY * (sourceWidth / tileWidth) + tileX;
            
//             sourceX = gridX;
            
//             sourceY = gridY - mapHeight;
            
//             redrawSource();
            
//             drawBox();
//         }
//     }
    
//     //create blue outline to track where the user's mouse is in real time. 
//     function doMouseMove(e) {
//         let x = mouseX - e.offsetX;
//         // debugger
//         let y = mouseY- e.offsetY;
        
//         let gridX, gridY;
        
//         gridX = Math.floor(x / tileWidth) * tileWidth;
        
//         gridY = Math.floor(y / tileHeight) * tileHeight;
        
//         if (y > mapHeight && y < (mapHeight + sourceHeight) && x < sourceWidth) { // source
            
//             context.clearRect(0, mapHeight, sourceWidth, sourceHeight);
            
//             redrawSource();
            
//             context.beginPath();
            
//             context.strokeStyle = 'blue';
            
//             context.rect(gridX, gridY, tileWidth, tileHeight);
            
//             context.stroke();
            
//             drawBox();
//         }
//         //if user clicks then draw previously selected tile in the current  x&y location  
//         if (mouseDown === true) drawTile(e);
//     }
    
//     function drawBox() {
//         context.beginPath();
//         // debugger 
//         context.strokeStyle = 'red';
        
//         context.rect(sourceX, sourceY + mapHeight, tileWidth, tileHeight);
        
//         context.stroke();
//     }
   
//     function doMouseClick(e) {
//         drawTile(e);
//     }
    
//     //draw previously selected tile in the current  x&y location  
    
//     function drawTile(e) {
//         //window coordinates 
//         let x = mouseX;
//         let y = mouseY;
//         let gridX, gridY;
//        console.log(e)
//         gridX = Math.floor(x / tileWidth) * tileWidth;//map editor width
       
//         gridY = Math.floor(y / tileHeight) * tileHeight;//map editor height 
        
//         //stops it from actions on tiles that are not designated 
//         if (y < mapHeight && x < mapWidth) { 
//             context.clearRect(gridX, gridY, tileWidth, tileHeight);
            
//             context.drawImage(image, sourceX, sourceY, tileWidth, tileHeight, gridX, gridY, tileWidth, tileHeight);
            
//             let tileX = Math.floor(x / tileWidth);// each tile's width 
            
//             let tileY = Math.floor(y / tileHeight);// each tile's height
            
//             let targetTile = tileY * mapColumns + tileX;//user's designated tile
            
//             tiles[targetTile] = sourceTile;
            
//             if (e.button === 2) { //clears tile if user hits 2
//                 context.clearRect(gridX, gridY, tileWidth, tileHeight);
                
//                 context.beginPath();
                
//                 context.strokeStyle = 'black';
                
//                 context.rect(gridX, gridY, tileWidth, tileHeight);
                
//                 context.stroke();
                
//                 tiles[targetTile] = null
//             };
//         }
//     }
    
// })

// const mapEditor = {
//     border: '1px solid black',
//     position: 'relative',
//     left: 0.5,
//     top:0,
//     width: '600',
//     height: '500'
// }
//     return ( 
        
//         <div onMouseMove={_onMouseMove.bind(this)}>
            
//             {/* <iframe title='mapMaker' src="../container/mapeditor.html" style={mapEditor}></iframe> */}

//             <canvas id='myCanvas' className='mapEditor' width='600' height='500' style={mapEditor} ></canvas>
//             <img  src={TileSet} width='600' height='200' id='image' hidden={true}/>
//             <p id='result' >Click on the image at the bottom to select a tile, then click on the grid to draw.</p>
//         </div>
//     );
// }

// export default Canvas
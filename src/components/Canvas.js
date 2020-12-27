import TileSet from '../container/Assets/Tilesets/TileSet.png'
import React, {useState, useEffect} from 'react'
const Canvas = () => {
        const [mouseX, setMouseX] = useState(0)
        const [mouseY, setMouseY] = useState(0)
        function _onMouseMove(e){
            setMouseX(e.pageX)
            setMouseY(e.pageY)
        }

useEffect(() => {
    
    // let image = new Image();
    let image = document.getElementById("image")
    // image.src = '../container/Assets/Tilesets/TileSet.jpg';
   
    const tileWidth = 16,
    tileHeight = 16;
    
    const mapRows = 20,
    mapColumns = 20;
    
    const sourceWidth = 128,
    sourceHeight = 128;
    
    let tiles = new Array(mapColumns * mapRows);
    
    let mapHeight = mapRows * tileHeight;
    
    let mapWidth = mapColumns * tileWidth;
    
    let sourceX, sourceY, sourceTile;
    
    let canvas = document.getElementById('myCanvas');
    
    let context = canvas.getContext('2d');
    
    let mouseDown;
    
    canvas.addEventListener('mousedown', doMouseDown);
    
    document.addEventListener('contextmenu', event => event.preventDefault());
    
    canvas.addEventListener('mousemove', doMouseMove);
    
    canvas.addEventListener('click', doMouseClick);
    
    canvas.addEventListener('mouseup', doMouseUp);
    
    image.addEventListener('load', redrawSource);
    
    // draw the grid
    let newTiles = []
    
    for (let i = 0; i <=mapRows; i++) {
        newTiles[i] = new Array(mapColumns)
    }

    for (let i = 0; i <= mapColumns; i++) {
        context.moveTo(i * tileWidth, 0);
        
        context.lineTo(i * tileWidth, mapHeight);
    }
    
    context.stroke();
    
    for (let i = 0; i <= mapRows; i++) {
        context.moveTo(0, i * tileHeight);
        
        context.lineTo(mapWidth, i * tileHeight);
    }
    
    context.stroke();
    
    function redrawSource() {
        // debugger
        context.drawImage(image, 0, 0, sourceWidth, sourceHeight, 0, mapHeight, sourceWidth, sourceHeight);
    }
    // redrawSource(image)
    function doMouseUp(e) {
        mouseDown = false;
        // update the string    
        let string = 'let tiles = [';
            for (let i = 0; i < mapRows; i ++){
                string = string + "["
                for (let j = 0; j < mapColumns; j ++){
                    if (tiles[(i * mapColumns) + j]){
                    string = string + `${tiles[(i * mapColumns) + j]},`
                    } else {
                        string += "0,"
                    }
                }
                string = string + "],\n"
            }
            string = string + '];';
        document.getElementById('result').innerHTML = string;
    }

    function doMouseDown(e) {
        mouseDown = true;
        
        let x = mouseX;
        
        let y = mouseY;
        
        let gridX = Math.floor(x / tileWidth) * tileWidth;
       
        let gridY = Math.floor(y / tileHeight) * tileHeight;
       
        if (y > mapHeight && y < (mapHeight + sourceHeight) && x < sourceWidth) { // source
            let tileX = Math.floor(x / tileWidth);
            
            let tileY = Math.floor((y - mapHeight) / tileHeight);
            
            sourceTile = tileY * (sourceWidth / tileWidth) + tileX;
            
            sourceX = gridX;
            
            sourceY = gridY - mapHeight;
            
            redrawSource();
            
            drawBox();
        }
    }
    
    //create blue outline to track where the user's mouse is in real time. 
    function doMouseMove(e) {
        let x = mouseX - e.offsetX;
        // debugger
        let y = mouseY- e.offsetY;
        
        let gridX, gridY;
        
        gridX = Math.floor(x / tileWidth) * tileWidth;
        
        gridY = Math.floor(y / tileHeight) * tileHeight;
        
        if (y > mapHeight && y < (mapHeight + sourceHeight) && x < sourceWidth) { // source
            
            context.clearRect(0, mapHeight, sourceWidth, sourceHeight);
            
            redrawSource();
            
            context.beginPath();
            
            context.strokeStyle = 'blue';
            
            context.rect(gridX, gridY, tileWidth, tileHeight);
            
            context.stroke();
            
            drawBox();
        }
        //if user clicks then draw previously selected tile in the current  x&y location  
        if (mouseDown === true) drawTile(e);
    }
    
    function drawBox() {
        context.beginPath();
        // debugger 
        context.strokeStyle = 'red';
        
        context.rect(sourceX, sourceY + mapHeight, tileWidth, tileHeight);
        
        context.stroke();
    }
   
    function doMouseClick(e) {
        drawTile(e);
    }
    
    //draw previously selected tile in the current  x&y location  
    
    function drawTile(e) {
        //window coordinates 
        let x = mouseX;
        let y = mouseY;
        let gridX, gridY;
       console.log(e)
        gridX = Math.floor(x / tileWidth) * tileWidth;//map editor width
       
        gridY = Math.floor(y / tileHeight) * tileHeight;//map editor height 
        
        //stops it from actions on tiles that are not designated 
        if (y < mapHeight && x < mapWidth) { 
            context.clearRect(gridX, gridY, tileWidth, tileHeight);
            
            context.drawImage(image, sourceX, sourceY, tileWidth, tileHeight, gridX, gridY, tileWidth, tileHeight);
            
            let tileX = Math.floor(x / tileWidth);// each tile's width 
            
            let tileY = Math.floor(y / tileHeight);// each tile's height
            
            let targetTile = tileY * mapColumns + tileX;//user's designated tile
            
            tiles[targetTile] = sourceTile;
            
            if (e.button === 2) { //clears tile if user hits 2
                context.clearRect(gridX, gridY, tileWidth, tileHeight);
                
                context.beginPath();
                
                context.strokeStyle = 'black';
                
                context.rect(gridX, gridY, tileWidth, tileHeight);
                
                context.stroke();
                
                tiles[targetTile] = null
            };
        }
    }
    
})

const mapEditor = {
    border: '1px solid black',
    position: 'relative',
    left: 0.5,
    top:0,
    width: '600',
    height: '500'
}
    return ( 
        
        <div onMouseMove={_onMouseMove.bind(this)}>
            
            {/* <iframe title='mapMaker' src="../container/mapeditor.html" style={mapEditor}></iframe> */}

            <canvas id='myCanvas' className='mapEditor' width='600' height='500' style={mapEditor} ></canvas>
            <img  src={TileSet} width='600' height='200' id='image' hidden={true}/>
            <p id='result' >Click on the image at the bottom to select a tile, then click on the grid to draw.</p>
        </div>
    );
}

export default Canvas

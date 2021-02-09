import TileSet from '../container/Assets/Tilesets/TileSet.png'


class TileDraw {
  
  constructor(map) {
    this.map = map
    this.width = this.map[0].length * 30;
    this.height = this.map.length * 30;
    this.canvas = document.getElementById("buffer-canvas");
    this.tiles = document.getElementById("tile-set");
    this.camera = document.getElementById("camera-canvas")
  }

  draw() {
    this.canvas = document.getElementById("buffer-canvas");
    this.tiles = document.getElementById("tile-set");
    let mainCanvas = document.getElementById("camera-canvas")
    let ctx = this.canvas.getContext("2d");
    let yy = 0;
    this.map.forEach((row) => {
      let xx = 0;
      row.forEach((value) => {
        let sy = Math.floor(value / 8);
        let sx = value - sy * 8;
        ctx.drawImage(this.tiles, sx * 16, sy * 16, 16, 16, xx * 16, yy * 16, 16, 16);
        xx += 1;
      });
      yy += 1;
    });
    let mainCtx = mainCanvas.getContext('2d')
    mainCtx.drawImage(this.canvas, 0, 0)
  }

  drawBuffer() {
    this.canvas = document.getElementById("buffer-canvas");
    this.tiles = document.getElementById("tile-set");
    let mainCanvas = document.getElementById("camera-canvas")
    let mainCtx = mainCanvas.getContext('2d')
    mainCtx.drawImage(this.canvas, 0, 0)
  }
}

export default TileDraw;
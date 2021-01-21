export default class Exit {
    constructor(props, x, y, height, width, goTo, kind) {
      this.props = props;
      this.goTo = goTo
      this.kind = kind
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.kind = kind
  
      this.hb = {
        left: x,
        right: x + width,
        top: y,
        bottom: y + height,
      };
    }
  
    setProps(props) {
      this.props = props;
    }
  
    loop() {
      let minAx = this.props.player.hb.left
      let minAy = this.props.player.hb.top
      let maxAx = this.props.player.hb.right
      let maxAy = this.props.player.hb.bottom
      let minBx = this.hb.left
      let minBy = this.hb.top
      let maxBx = this.hb.right
      let maxBy = this.hb.bottom
      let aLeftOfB = maxAx < minBx
      let aRightOfB = minAx > maxBx
      let aAboveB = minAy > maxBy
      let aBelowB = maxAy < minBy
      if (!( aLeftOfB || aRightOfB || aAboveB || aBelowB)){
          console.log("Stuff")
          // debugger
          this.props.moveMaps(this.goTo, this.kind)
      }
    }
  
    draw() {
      return null
    }
  }
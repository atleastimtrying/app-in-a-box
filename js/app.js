(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Display = (function() {

    function Display(app) {
      this.app = app;
      this.mouseOff = __bind(this.mouseOff, this);
      this.mouseOn = __bind(this.mouseOn, this);
      this.setCanvasScale = __bind(this.setCanvasScale, this);
      this.draw = __bind(this.draw, this);
      this.canvas = $('#big');
      this.small = $('#small');
      this.blocksSlider = $('#blocks');
      this.scaleSlider = $('#scale');
      this.colour = 'rgb(0,0,0)';
      this.ctx = this.canvas[0].getContext('2d');
      this.lctx = this.small[0].getContext('2d');
      this.isDown = false;
      this.setCanvasScale();
      this.addListeners();
    }

    Display.prototype.draw = function() {
      this.ctx.fillStyle = this.colour;
      this.ctx.fillRect(this.x, this.y, this.scale, this.scale);
      return this.lctx.fillRect(this.x / this.scale, this.y / this.scale, 1, 1);
    };

    Display.prototype.outOfBounds = function() {
      return this.x > this.canvas.width || this.y > this.canvas.height || this.x < 0 || this.y < 0;
    };

    Display.prototype.addListeners = function() {
      this.canvas.mousemove(this.app.draw);
      this.canvas.mousedown(this.mouseOn);
      this.canvas.mouseup(this.mouseOff);
      this.canvas.mouseout(this.mouseOff);
      this.blocksSlider.change(this.setCanvasScale);
      return this.scaleSlider.change(this.setCanvasScale);
    };

    Display.prototype.setCanvasScale = function() {
      this.blocks = this.blocksSlider.val();
      this.scale = this.scaleSlider.val();
      this.canvas.css({
        width: "" + (this.blocks * this.scale) + "px",
        height: "" + (this.blocks * this.scale) + "px"
      });
      this.canvas[0].width = this.blocks * this.scale;
      this.canvas[0].height = this.blocks * this.scale;
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, this.canvas[0].width, this.canvas[0].height);
      this.small.css({
        width: "" + this.blocks + "px",
        height: "" + this.blocks + "px"
      });
      this.small[0].width = this.blocks;
      return this.small[0].height = this.blocks;
    };

    Display.prototype.mouseOn = function() {
      return this.isDown = true;
    };

    Display.prototype.mouseOff = function() {
      return this.isDown = false;
    };

    return Display;

  })();

  window.App = (function() {

    function App() {
      this.draw = __bind(this.draw, this);      this.display = new Display(this);
    }

    App.prototype.draw = function(event) {
      var ex, why;
      ex = event.clientX - event.target.offsetLeft;
      why = event.clientY - event.target.offsetTop;
      this.display.x = Math.floor(ex / this.display.scale) * this.display.scale;
      this.display.y = Math.floor(why / this.display.scale) * this.display.scale;
      if (this.display.isDown) return this.display.draw();
    };

    return App;

  })();

  $(function() {
    return window.app = new App();
  });

}).call(this);

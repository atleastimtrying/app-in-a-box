(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Display = (function() {

    function Display(app) {
      this.app = app;
      this.mouseUp = __bind(this.mouseUp, this);
      this.mouseDown = __bind(this.mouseDown, this);
      this.draw = __bind(this.draw, this);
      this.canvas = $('#big');
      this.small = $('#small');
      this.colour = 'black';
      this.blocks = 32;
      this.scale = 10;
      this.setCanvasScale();
      this.ctx = this.canvas[0].getContext('2d');
      this.lctx = this.small[0].getContext('2d');
      this.isDown = false;
      this.blocks = 32;
      this.scale = 10;
      this.x = 0;
      this.y = 0;
      this.addListeners();
    }

    Display.prototype.draw = function() {
      this.ctx.fillStyle = this.colour;
      this.ctx.fillRect(this.x, this.y, this.scale, this.scale);
      return this.lctx.fillRect(this.x / this.scale, this.y / this.scale, 1, 1);
    };

    Display.prototype.addListeners = function() {
      this.canvas.mousemove(this.app.draw);
      this.canvas.mousedown(this.mouseDown);
      return $(window).mouseup(this.mouseUp);
    };

    Display.prototype.setCanvasScale = function() {
      this.canvas.css({
        width: "" + (this.blocks * this.scale) + "px",
        height: "" + (this.blocks * this.scale) + "px",
        border: '2px grey dotted'
      });
      this.canvas[0].width = this.blocks * this.scale;
      this.canvas[0].height = this.blocks * this.scale;
      this.small.css({
        width: "" + this.blocks + "px",
        height: "" + this.blocks + "px",
        border: '2px grey dotted'
      });
      this.small[0].width = this.blocks;
      return this.small[0].height = this.blocks;
    };

    Display.prototype.mouseDown = function() {
      return this.isDown = true;
    };

    Display.prototype.mouseUp = function() {
      return this.isDown = false;
    };

    return Display;

  })();

  window.App = (function() {

    function App() {
      this.draw = __bind(this.draw, this);      this.display = new Display(this);
    }

    App.prototype.draw = function(event) {
      this.display.x = Math.floor(event.pageX / this.display.scale) * this.display.scale;
      this.display.y = Math.floor(event.pageY / this.display.scale) * this.display.scale;
      if (this.display.isDown) return this.display.draw();
    };

    return App;

  })();

  $(function() {
    return window.app = new App();
  });

}).call(this);

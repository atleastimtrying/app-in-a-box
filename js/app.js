(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.App = (function() {

    function App() {
      this.draw = __bind(this.draw, this);
      this.mouseOff = __bind(this.mouseOff, this);
      this.mouseOn = __bind(this.mouseOn, this);
      this.setCanvasScale = __bind(this.setCanvasScale, this);
      this.save = __bind(this.save, this);
      this.prepareImg = __bind(this.prepareImg, this);
      this.start = __bind(this.start, this);
      this.updateColours = __bind(this.updateColours, this);      this.canvas = $('#big');
      this.small = $('#small');
      this.colour = 'rgb(0,0,0)';
      this.ctx = this.canvas[0].getContext('2d');
      this.lctx = this.small[0].getContext('2d');
      this.isDown = false;
      $('#drawPane').hide();
      $('#startButton').click(this.start);
      $('#saveModal').on('show', this.prepareImg);
      $('#saveButton').click(this.save);
      $('#blocks').change(function() {
        return $('#blocksDisplay').html($('#blocks').val());
      });
      $('#scale').change(function() {
        $('#scaleDisplay').html($('#scale').val());
        return $('#scalePreview').css({
          width: $('#scale').val(),
          height: $('#scale').val()
        });
      });
      $('#red').change(this.updateColours);
      $('#green').change(this.updateColours);
      $('#blue').change(this.updateColours);
    }

    App.prototype.updateColours = function() {
      var blue, green, red;
      red = $('#red').val();
      green = $('#green').val();
      blue = $('#blue').val();
      this.colour = "rgb(" + red + ", " + green + ", " + blue + ")";
      return $('#colourPreview').css({
        background: this.colour
      });
    };

    App.prototype.start = function() {
      $('.hero-unit').hide();
      $('#drawPane').show();
      this.setName();
      this.setCanvasScale();
      return this.addListeners();
    };

    App.prototype.prepareImg = function() {
      var src;
      src = this.small[0].toDataURL("preview.png");
      return $('#preview').attr('src', src);
    };

    App.prototype.save = function() {
      var name, src;
      name = $('#saveName').val();
      src = this.small[0].toDataURL("" + name + ".png");
      return window.open(src, this.blocks, this.blocks);
    };

    App.prototype.setName = function() {
      this.title = $('#name').val();
      $('#title').html(this.title);
      return $('#saveName').val(this.title);
    };

    App.prototype.addListeners = function() {
      this.canvas.mousemove(this.draw);
      this.canvas.mousedown(this.mouseOn);
      this.canvas.mouseup(this.mouseOff);
      return this.canvas.mouseout(this.mouseOff);
    };

    App.prototype.setCanvasScale = function() {
      this.blocks = $('#blocks').val();
      this.scale = $('#scale').val();
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
      this.small[0].height = this.blocks;
      this.lctx.fillStyle = 'white';
      return this.lctx.fillRect(0, 0, this.blocks, this.blocks);
    };

    App.prototype.mouseOn = function() {
      return this.isDown = true;
    };

    App.prototype.mouseOff = function() {
      return this.isDown = false;
    };

    App.prototype.draw = function(event) {
      var ex, why;
      if (this.isDown) {
        ex = event.clientX - event.target.offsetLeft;
        why = event.clientY - event.target.offsetTop;
        this.x = Math.floor(ex / this.scale) * this.scale;
        this.y = Math.floor(why / this.scale) * this.scale;
        this.ctx.fillStyle = this.colour;
        this.ctx.fillRect(this.x, this.y, this.scale, this.scale);
        this.lctx.fillStyle = this.colour;
        return this.lctx.fillRect(this.x / this.scale, this.y / this.scale, 1, 1);
      }
    };

    return App;

  })();

  $(function() {
    return window.app = new App();
  });

}).call(this);

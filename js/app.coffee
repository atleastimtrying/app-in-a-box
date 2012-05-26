class Input
  initialize: ->
    @isDown = false
    canvas.addEventListener 'mousemove', @draw, false
    canvas.addEventListener 'mousedown', @mouseDown, false
    window.addEventListener 'mouseup', @mouseUp, false

class Display
  initialize: ->
    @canvas = document.getElementById 'big'
    @small = document.getElementById 'small'
    @ctx = canvas.getContext '2d'
    @lctx = small.getContext '2d'
    @blocks = 32
    @scale = 10
    @x = 0
    @y = 0

  draw: ->
    @ctx.fillStyle = @colour
    @ctx.fillRect x, y, scale, scale
    @lctx.fillRect x/scale, y/scale, 1, 1

  setCanvasScale: ->
    canvas.width = blocks * scale
    canvas.height = blocks * scale
    small.width = blocks
    small.height = blocks
    
class App
  initialize: ->
    @display = new Display
    @input = new Input
    @isDown = false
    @colour = 'black'
    
  draw:(event)->
    @display.x = Math.floor(event.pageX / @display.scale) * @display.scale
    @display.y = Math.floor(event.pageY / @display.scale) * @display.scale
    @display.draw() if input.isDown
  

};
window.onload = ->
    window.app = new App
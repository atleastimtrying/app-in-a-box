class window.Display
  constructor: (@app)->
    @canvas = $ '#big'
    @small = $ '#small'
    @colour = 'black'
    @blocks = 32
    @scale = 10
    @setCanvasScale()
    @ctx = @canvas[0].getContext '2d'
    @lctx = @small[0].getContext '2d'
    @isDown = false
    @blocks = 32
    @scale = 10
    @x = 0
    @y = 0
    @addListeners()

  draw: =>
    @ctx.fillStyle = @colour
    @ctx.fillRect @x, @y, @scale, @scale
    @lctx.fillRect @x / @scale, @y / @scale, 1, 1

  addListeners: ->
    @canvas.mousemove @app.draw
    @canvas.mousedown @mouseDown
    $(window).mouseup @mouseUp

  setCanvasScale: ->
    @canvas.css 
      width: "#{@blocks * @scale}px"
      height: "#{@blocks * @scale}px"
      border: '2px grey dotted'
    @canvas[0].width = @blocks * @scale
    @canvas[0].height = @blocks * @scale
    @small.css 
      width: "#{@blocks}px"
      height: "#{@blocks}px"
      border: '2px grey dotted'
    @small[0].width = @blocks
    @small[0].height = @blocks

  mouseDown: => @isDown = true

  mouseUp: => @isDown = false
    
class window.App
  constructor: ->
    @display = new Display(@)
    
  draw:(event)=>
    @display.x = Math.floor(event.pageX / @display.scale) * @display.scale
    @display.y = Math.floor(event.pageY / @display.scale) * @display.scale
    @display.draw() if @display.isDown

$ ->
  window.app = new App()
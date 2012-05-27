class window.Display
  constructor: (@app)->
    @canvas = $ '#big'
    @small = $ '#small'
    @blocksSlider = $ '#blocks'
    @scaleSlider = $ '#scale'
    @colour = 'rgb(0,0,0)'
    @ctx = @canvas[0].getContext '2d'
    @lctx = @small[0].getContext '2d'
    @isDown = false
    @setCanvasScale()
    @addListeners()

  draw: =>
    @ctx.fillStyle = @colour
    @ctx.fillRect @x, @y, @scale, @scale
    @lctx.fillRect @x / @scale, @y / @scale, 1, 1

  outOfBounds: ->
    return @x > @canvas.width or @y > @canvas.height or @x < 0 or @y < 0

  addListeners: ->
    @canvas.mousemove @app.draw
    @canvas.mousedown @mouseOn
    @canvas.mouseup @mouseOff
    @canvas.mouseout @mouseOff
    @blocksSlider.change @setCanvasScale
    @scaleSlider.change @setCanvasScale

  setCanvasScale: =>
    @blocks = @blocksSlider.val()
    @scale = @scaleSlider.val()
    @canvas.css 
      width: "#{@blocks * @scale}px"
      height: "#{@blocks * @scale}px"
    @canvas[0].width = @blocks * @scale
    @canvas[0].height = @blocks * @scale
    @ctx.fillStyle = 'white'
    @ctx.fillRect 0, 0, @canvas[0].width, @canvas[0].height 
    @small.css 
      width: "#{@blocks}px"
      height: "#{@blocks}px"
    @small[0].width = @blocks
    @small[0].height = @blocks

  mouseOn: => @isDown = true

  mouseOff: => @isDown = false
    
class window.App
  constructor: ->
    @display = new Display(@)
    
  draw:(event)=>
    ex = event.clientX - event.target.offsetLeft
    why = event.clientY - event.target.offsetTop
    @display.x = Math.floor(ex / @display.scale) * @display.scale
    @display.y = Math.floor(why / @display.scale) * @display.scale
    @display.draw() if @display.isDown

$ ->
  window.app = new App()
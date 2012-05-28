class window.App
  constructor: ->
    @canvas = $ '#big'
    @small = $ '#small'
    @colour = 'rgb(0,0,0)'
    @ctx = @canvas[0].getContext '2d'
    @lctx = @small[0].getContext '2d'
    @isDown = false
    $('#drawPane').hide()
    $('#startButton').click @start
    $('#saveModal').on 'show', @prepareImg
    $('#saveButton').click @save
    $('#blocks').change -> $('#blocksDisplay').html $('#blocks').val()
    $('#scale').change -> 
      $('#scaleDisplay').html $('#scale').val()
      $('#scalePreview'). css 
        width: $('#scale').val()
        height: $('#scale').val()
    $('#red').change @updateColours 
    $('#green').change @updateColours
    $('#blue').change @updateColours
  
  updateColours: =>
    red = $('#red').val()
    green = $('#green').val()
    blue = $('#blue').val()
    @colour = "rgb(#{red}, #{green}, #{blue})"
    $('#colourPreview').css background: @colour
  
  start: =>
    $('.hero-unit').hide()
    $('#drawPane').show()
    @setName()
    @setCanvasScale()
    @addListeners()
  
  prepareImg: =>
    src = @small[0].toDataURL "preview.png"
    $('#preview').attr('src', src)

  save: =>
    name = $('#saveName').val()
    src = @small[0].toDataURL "#{name}.png"
    window.open src, @blocks, @blocks

  setName: ->
    @title = $('#name').val()
    $('#title').html @title
    $('#saveName').val @title

  addListeners: ->
    @canvas.mousemove @draw
    @canvas.mousedown @mouseOn
    @canvas.mouseup @mouseOff
    @canvas.mouseout @mouseOff

  setCanvasScale: =>
    @blocks = $('#blocks').val()
    @scale = $('#scale').val()
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
    @lctx.fillStyle = 'white'
    @lctx.fillRect 0, 0, @blocks, @blocks 

  mouseOn: => @isDown = true

  mouseOff: => @isDown = false

  draw:(event)=>
    if @isDown
      ex = event.clientX - event.target.offsetLeft
      why = event.clientY - event.target.offsetTop
      @x = Math.floor(ex / @scale) * @scale
      @y = Math.floor(why / @scale) * @scale
      @ctx.fillStyle = @colour
      @ctx.fillRect @x, @y, @scale, @scale
      @lctx.fillStyle = @colour
      @lctx.fillRect @x / @scale, @y / @scale, 1, 1
$ ->
  window.app = new App()
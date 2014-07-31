_id = 
    bgCanvas: 'blur-bg'
    coverHolder: 'cover-holder'

# elements ...
bgCanvas = null
coverHolder = null

# varibles
winSize = 
   width: $(window).width()
   height: $(window).height()
curCover = ''

getEle = () ->
  # do nothing

_view = 
  init: () ->
    console.log 'initialize view ing'

  newFXcanvas: () ->
    canvas = fx.canvas()
    return canvas

  updateCanvas: (canvas, $img) ->
    drawSize = _data.getDrawSize( $img.get(0) )
    $modalBG.append(canvas);
    canvas.width = drawSize.w;
    canvas.height = drawSize.h;
    t = canvas.texture($img.get(0))

    $(canvas).css({
      position: 'absolute'
      top: '50%'
      left: '50%'
      'margin-top': -(drawSize.h/2)
      'margin-left': -(drawSize.w/2)
    })
    canvas.draw(t, drawSize.w,drawSize.h)
    canvas.triangleBlur(35)
    canvas.brightnessContrast(0.1, 0)
    canvas.update()


_data = 
  getDrawSize: (imgEl) ->
    iw = imgEl.width
    ih = imgEl.height
    rate = winSize.width/winSize.height
    if iw/ih > rate
      return { w: iw*(winSize.height/ih), h: winSize.height }
    else
      return { w: winSize.width, h: ih*(winSize.width/iw) }


_event =
  bind: () ->
    $(window).on('resize', _event.adjust);

  adjust: (e) ->
    winSize = 
      width: $(window).width()
      height: $(window).height()
    _event.adjustBlurCanvas();

  adjustBlurCanvas: () ->
    bgCanvas.width = winSize.width
    bgCanvas.height = winSize.height
    # re paint ?


window.showCard = ($entryEl, $img, curMate) ->
  mateName = $entryEl.attr('data-id')
  cacheCanvas = $cache.find("canvas[data-id='#{mateName}']");
  if mateName is curMate
    mophingCard.show($entryEl)
  else
    # 将现有的canvas缓存起来
    curCanvas = $("canvas[data-id='#{curMate}']")
    if curCanvas.length > 0
      cache.appendChild( curCanvas.get(0) )

  # 如果已经有了 适配当前id的缓存
  if cacheCanvas.length > 0
    # 挪动ele
    modalBG.appendChild( cacheCanvas.get(0) )
    # show
    setTimeout () ->
      mophingCard.show($entryEl)
    , 50
    

  # 没有缓存
  # 会触发img on load event
  else
    $entryEl.addClass 'loading'
    $img.one 'load', () ->
      # new and render canvas
      canvas = _view.newFXcanvas()
      canvas.setAttribute('data-id', mateName)
      # append 
      _view.updateCanvas canvas, $img
      # show mophing 
      setTimeout () ->
        mophingCard.show($entryEl)
      , 300
      


window.hideCard = () ->
  console.log 'move canvas ele to #cache'
  console.log 'no need to cache img'


mophingCard = null
$cache = null
cache = null
$modalBG = null
modalBG = null
$(document).ready () ->
  mophingCard = new Morphing({selector: '#card'})
  $cache = $('#cache')
  cache = $cache.get(0)

  $modalBG = $('#card .modal-bg')
  modalBG = $modalBG.get(0)

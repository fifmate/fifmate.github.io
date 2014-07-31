C = 'active'
dW = 600
dH = 400

# dW = dW/2
# dH = dH/2


class Morphing
  constructor: (opt) ->
    @el = $(opt.selector)
    @content = @el.find('.modal-content')
    @bind()

  show: (entryEl,targetStyle) ->
    pos = entryEl.offset()
    cptStyle = window.getComputedStyle(entryEl.get(0))
    translateVal = "translateX(#{pos.left - $(window).scrollLeft()}px) translateY(#{pos.top - $(window).scrollTop()}px)"
    styleObj = 
      # top: pos.top - $(window).scrollTop()
      # left: pos.left - $(window).scrollLeft()
      '-webkit-transform': translateVal
      '-moz-transform': translateVal
      'transform': translateVal
      height: parseFloat(cptStyle.height)
      width: parseFloat(cptStyle.width)
      opacity: 0.375

    @content.css(styleObj)

    @lylow = JSON.stringify styleObj
    
    # 默认样式 + 自定义样式
    translateVal = "translateX(200px) translateY(100px)"
    defaultStyle =
      # top: '50%'
      # left: '50%'
      # 'transform': "translate(#{-dW/2} #{-dH/2})"
      '-webkit-transform': translateVal
      '-moz-transform': translateVal
      'transform': translateVal
      height: dH
      width: dW
      opacity: 1
    if targetStyle
      for i in targetStyle
        defaultStyle[i] = targetStyle[i]

    self = @;
    setTimeout( () ->
      self.el.addClass('active')
      self.content.css(defaultStyle)
    , 25)

  hide: () ->
    @content.css( JSON.parse(@lylow) )
    self = @
    setTimeout ()->
      self.el.removeClass('active')
      self.content.css( 'opacity', 0 )
    # , 300
    , 250
  bind: () ->
    @el.find('.modal-close').on 'click', () =>
      @hide()



window.Morphing = Morphing
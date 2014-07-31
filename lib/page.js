(function() {
  var $cache, $modalBG, bgCanvas, cache, coverHolder, curCover, getEle, modalBG, mophingCard, winSize, _data, _event, _id, _view;

  _id = {
    bgCanvas: 'blur-bg',
    coverHolder: 'cover-holder'
  };

  bgCanvas = null;

  coverHolder = null;

  winSize = {
    width: $(window).width(),
    height: $(window).height()
  };

  curCover = '';

  getEle = function() {};

  _view = {
    init: function() {
      return console.log('initialize view ing');
    },
    newFXcanvas: function() {
      var canvas;
      canvas = fx.canvas();
      return canvas;
    },
    updateCanvas: function(canvas, $img) {
      var drawSize, t;
      drawSize = _data.getDrawSize($img.get(0));
      $modalBG.append(canvas);
      canvas.width = drawSize.w;
      canvas.height = drawSize.h;
      t = canvas.texture($img.get(0));
      $(canvas).css({
        position: 'absolute',
        top: '50%',
        left: '50%',
        'margin-top': -(drawSize.h / 2),
        'margin-left': -(drawSize.w / 2)
      });
      canvas.draw(t, drawSize.w, drawSize.h);
      canvas.triangleBlur(35);
      canvas.brightnessContrast(0.1, 0);
      return canvas.update();
    }
  };

  _data = {
    getDrawSize: function(imgEl) {
      var ih, iw, rate;
      iw = imgEl.width;
      ih = imgEl.height;
      rate = winSize.width / winSize.height;
      if (iw / ih > rate) {
        return {
          w: iw * (winSize.height / ih),
          h: winSize.height
        };
      } else {
        return {
          w: winSize.width,
          h: ih * (winSize.width / iw)
        };
      }
    }
  };

  _event = {
    bind: function() {
      return $(window).on('resize', _event.adjust);
    },
    adjust: function(e) {
      winSize = {
        width: $(window).width(),
        height: $(window).height()
      };
      return _event.adjustBlurCanvas();
    },
    adjustBlurCanvas: function() {
      bgCanvas.width = winSize.width;
      return bgCanvas.height = winSize.height;
    }
  };

  window.showCard = function($entryEl, $img, curMate) {
    var cacheCanvas, curCanvas, mateName;
    mateName = $entryEl.attr('data-id');
    cacheCanvas = $cache.find("canvas[data-id='" + mateName + "']");
    if (mateName === curMate) {
      mophingCard.show($entryEl);
    } else {
      curCanvas = $("canvas[data-id='" + curMate + "']");
      if (curCanvas.length > 0) {
        cache.appendChild(curCanvas.get(0));
      }
    }
    if (cacheCanvas.length > 0) {
      modalBG.appendChild(cacheCanvas.get(0));
      return setTimeout(function() {
        return mophingCard.show($entryEl);
      }, 50);
    } else {
      $entryEl.addClass('loading');
      return $img.one('load', function() {
        var canvas;
        canvas = _view.newFXcanvas();
        canvas.setAttribute('data-id', mateName);
        _view.updateCanvas(canvas, $img);
        return setTimeout(function() {
          return mophingCard.show($entryEl);
        }, 300);
      });
    }
  };

  window.hideCard = function() {
    console.log('move canvas ele to #cache');
    return console.log('no need to cache img');
  };

  mophingCard = null;

  $cache = null;

  cache = null;

  $modalBG = null;

  modalBG = null;

  $(document).ready(function() {
    mophingCard = new Morphing({
      selector: '#card'
    });
    $cache = $('#cache');
    cache = $cache.get(0);
    $modalBG = $('#card .modal-bg');
    return modalBG = $modalBG.get(0);
  });

}).call(this);

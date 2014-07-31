(function() {
  var C, Morphing, dH, dW;

  C = 'active';

  dW = 600;

  dH = 400;

  Morphing = (function() {
    function Morphing(opt) {
      this.el = $(opt.selector);
      this.content = this.el.find('.modal-content');
      this.bind();
    }

    Morphing.prototype.show = function(entryEl, targetStyle) {
      var cptStyle, defaultStyle, i, pos, self, styleObj, translateVal, _i, _len;
      pos = entryEl.offset();
      cptStyle = window.getComputedStyle(entryEl.get(0));
      translateVal = "translateX(" + (pos.left - $(window).scrollLeft()) + "px) translateY(" + (pos.top - $(window).scrollTop()) + "px)";
      styleObj = {
        '-webkit-transform': translateVal,
        '-moz-transform': translateVal,
        'transform': translateVal,
        height: parseFloat(cptStyle.height),
        width: parseFloat(cptStyle.width),
        opacity: 0.375
      };
      this.content.css(styleObj);
      this.lylow = JSON.stringify(styleObj);
      translateVal = "translateX(200px) translateY(100px)";
      defaultStyle = {
        '-webkit-transform': translateVal,
        '-moz-transform': translateVal,
        'transform': translateVal,
        height: dH,
        width: dW,
        opacity: 1
      };
      if (targetStyle) {
        for (_i = 0, _len = targetStyle.length; _i < _len; _i++) {
          i = targetStyle[_i];
          defaultStyle[i] = targetStyle[i];
        }
      }
      self = this;
      return setTimeout(function() {
        self.el.addClass('active');
        return self.content.css(defaultStyle);
      }, 25);
    };

    Morphing.prototype.hide = function() {
      var self;
      this.content.css(JSON.parse(this.lylow));
      self = this;
      return setTimeout(function() {
        self.el.removeClass('active');
        return self.content.css('opacity', 0);
      }, 250);
    };

    Morphing.prototype.bind = function() {
      return this.el.find('.modal-close').on('click', (function(_this) {
        return function() {
          return _this.hide();
        };
      })(this));
    };

    return Morphing;

  })();

  window.Morphing = Morphing;

}).call(this);

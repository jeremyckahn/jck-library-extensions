define([

  'jquery'
  ,'underscore'

  ,'auto-update-textfield'

  // Doesn't return anything
  ,'jquery-mousewheel'

], function (

  $
  ,_

  ,AutoUpdateTextFieldView

) {
  'use strict';

  var $win = $(window);
  var rNumber = /-?[1234567890.]*/;
  var FLOATING_POINT_PRECISION = 6;
  var TOKEN_CHUNK = '__TOKEN__';

  return AutoUpdateTextFieldView.extend({

    events: _.extend({
      mousewheel: 'onMousewheel'
      ,focus: 'onFocus'
    }, AutoUpdateTextFieldView.prototype.events)

    ,increment: 10

    ,mousewheelIncrement: 1

    /**
     * @param {number} tweakAmount
     */
    ,tweakVal: function (tweakAmount) {
      // Ensure that parsedNumber is not NaN
      var parsedNumber = parseFloat(this.getNumberValue()) || 0;

      // jshint maxlen: 150
      // Have to do weird number munging here to prevent IEEE 754 floating
      // point issues:
      // http://stackoverflow.com/questions/8503157/ieee-754-floating-point-arithmetic-rounding-error-in-c-sharp-and-javascript
      var precisionRestrictedNumber = +(
          parsedNumber + tweakAmount).toPrecision(FLOATING_POINT_PRECISION);
      this.setNumberValue(precisionRestrictedNumber);
      this.onValReenter(precisionRestrictedNumber);
    }

    /**
     * @return {number}
     */
    ,getNumberValue: function () {
      var rawVal = this.$el.val();
      var firstNumberString = rawVal.match(rNumber)[0];
      this.tokenPattern = rawVal.replace(firstNumberString, TOKEN_CHUNK);

      var firstNumber = firstNumberString.length ? +firstNumberString : 0;
      return firstNumber;
    }

    /**
     * @param {number} number
     */
    ,setNumberValue: function (number) {
      var formattedValue;

      formattedValue = this.tokenPattern ?
        this.tokenPattern.replace(TOKEN_CHUNK, number) :
        ''+number;

      this.$el.val(formattedValue);
    }

    /**
     * The extra, unused parameters part of jquery-mousewheel's API.
     * @param {jQuery.Event} evt
     * @param {number} delta
     * @param {number} deltaX
     * @param {number} deltaY
     */
    ,onMousewheel: function (evt, delta, deltaX, deltaY) {
      evt.preventDefault();
      this.tweakVal(-deltaY * this.mousewheelIncrement);
    }

    /** @override */
    ,onArrowUp: function () {
      this.tweakVal(this.increment);
    }

    /** @override */
    ,onArrowDown: function () {
      this.tweakVal(-this.increment);
    }

    ,onFocus: function () {
      this.mousewheelHandler = _.bind(this.onMousewheel, this);
      $win.on('mousewheel', this.mousewheelHandler);
      $win.one('click', _.bind(this.freeMousewheel, this));
    }

    ,onBlur: function () {
      AutoUpdateTextFieldView.prototype.onBlur.apply(this, arguments);
      this.freeMousewheel();
    }

    ,freeMousewheel: function () {
      if (this.mousewheelHandler) {
        $win.off('mousewheel', this.mousewheelHandler);
        this.mousewheelHandler = null;
      }
    }

    ,teardown: function () {
      this.freeMousewheel();
      AutoUpdateTextFieldView.prototype.teardown.call(this);
    }

  });

});

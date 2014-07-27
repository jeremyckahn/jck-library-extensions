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
  var FLOATING_POINT_PRECISION = 6;

  return AutoUpdateTextFieldView.extend({

    events: _.extend({
      mousewheel: 'onMousewheel'
      ,focus: 'onFocus'
    }, AutoUpdateTextFieldView.prototype.events)

    ,increment: 10

    /**
     * @param {number} tweakAmount
     */
    ,tweakVal: function (tweakAmount) {
      /* jshint maxlen: 150 */
      // Have to do weird number munging here to prevent IEEE 754 floating
      // point issues:
      // http://stackoverflow.com/questions/8503157/ieee-754-floating-point-arithmetic-rounding-error-in-c-sharp-and-javascript
      var parsedNumber = parseFloat(this.$el.val());
      var precisionRestrictedNumber = +(
          parsedNumber + tweakAmount).toPrecision(FLOATING_POINT_PRECISION);
      this.$el.val(precisionRestrictedNumber);
      this.onValReenter(precisionRestrictedNumber);
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
      this.tweakVal(-deltaY);
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

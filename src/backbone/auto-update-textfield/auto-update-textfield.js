define([

  'jquery'
  ,'underscore'
  ,'backbone'

], function (

  $
  ,_
  ,Backbone

) {
  'use strict';

  return Backbone.View.extend({

    events: {
      'keyup': 'onKeyup'
      ,'keydown': 'onKeydown'
      ,'blur': 'onBlur'
    }

    ,onKeyup: function () {
      var val = this.$el.val();
      this.onValReenter(val);
    }

    /**
     * @param {jQuery.Event} evt
     */
    ,onKeydown: function (evt) {
      var which = +evt.which;

      if (which === 38) { // up
        this.onArrowUp(evt);
      } else if (which === 40) { // down
        this.onArrowDown(evt);
      } else if (which === 13) { // enter
        this.onEnterDown(evt);
      } else if (which === 27) { // escape
        this.onEscapeDown(evt);
      }
    }

    ,teardown: function () {
      this.remove();
      _.empty(this);
    }

    ,onEscapeDown: function () {
      this.$el.trigger('blur');
    }

    // Bindable events

    ,onBlur: $.noop // function(jQuery.Event)

    ,onArrowUp: $.noop // function (jQuery.Event)

    ,onArrowDown: $.noop // function (jQuery.Event)

    ,onEnterDown: $.noop // function (jQuery.Event)

    ,onValReenter: $.noop // function (jQuery.Event)

  });

});

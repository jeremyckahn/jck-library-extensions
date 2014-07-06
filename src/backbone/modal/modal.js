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

  var $win = $(window);

  return Backbone.View.extend({

    fadeToggleSpeed: 200

    /**
     * @param opts
     *   @param {Element} el
     *   @param {jQuery} $triggerEl
     */
    ,initialize: function (opts) {
      this.$triggerEl = opts.$triggerEl;

      this.$el
        .css('display', 'none')
        .removeClass('hid');

      this._windowKeyhandler = _.bind(this.onWindowKeydown, this);
      this._windowClickhandler = _.bind(this.onWindowClick, this);
      this.$triggerEl.on('click', _.bind(this.onTriggerClick, this));
    }

    /**
     * @param {jQuery.Event} evt
     */
    ,onTriggerClick: function (evt) {
      this.toggle();
      evt.stopPropagation();
      evt.preventDefault();
    }

    /**
     * @param {jQuery.Event} evt
     */
    ,onWindowKeydown: function (evt) {
      if (evt.keyCode === 27) { // escape
        this.hide();
      }
    }

    /**
     * @param {jQuery.Event} evt
     */
    ,onWindowClick: function (evt) {
      var target = evt.target;
      if (!$.contains(this.$el[0], target) && this.$el[0] !== target) {
        this.hide();
      }
    }

    ,show: function () {
      this.$el.fadeIn(this.fadeToggleSpeed);
      $win
        .on('keydown', this._windowKeyhandler)
        .on('click', this._windowClickhandler);
    }


    ,hide: function () {
      this.$el.fadeOut(this.fadeToggleSpeed);
      $win
        .off('keydown', this._windowKeyhandler)
        .off('click', this._windowClickhandler);
    }

    ,toggle: function () {
      if (this.$el.is(':visible')) {
        this.hide();
      } else {
        this.show();
      }
    }

  });

});

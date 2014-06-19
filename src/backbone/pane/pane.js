define([

  'jquery'
  ,'underscore'
  ,'backbone'

  // Extensions
  ,'jquery-dragon'

], function (

  $
  ,_
  ,Backbone

) {
  'use strict';

  var $win = $(window);

  return Backbone.View.extend({

    FADE_TOGGLE_SPEED: 200

    ,containerTemplate: [
      '<div class="pane"></div>'
    ].join('')

    ,handleTemplate: [
      '<div class="pane-handle"></div>'
    ].join('')

    ,contentWrapperTemplate: [
      '<div class="pane-content"></div>'
    ].join('')

    /**
     * @param {Object} opts
     *   @param {Element} el
     */
    ,initialize: function () {
      this.$handle = $(this.handleTemplate);
      this.$el.wrap($(this.containerTemplate));
      this.$el = this.$el.parent();
      this.$el
        .wrapInner($(this.contentWrapperTemplate))
        .prepend(this.$handle)
        .css({
          left: $win.width() - this.$el.outerWidth(true)
        })
        .dragon({
          within: this.$el.parent()
          ,handle: '.pane-handle'
        });
      $win.on('resize', _.bind(this.onResize, this));
    }

    ,onResize: function () {
      var width = this.$el.outerWidth(true);
      var winWidth = $win.width();

      if ((this.$el.offset().left + width) > winWidth) {
        this.$el.css('left', winWidth - width);
      }
    }

    ,getSize: function () {
      return {
        height: this.$el.height()
        ,width: this.$el.width()
      };
    }

    ,toggle: function () {
      this.$el.fadeToggle(this.FADE_TOGGLE_SPEED);
    }

  });
});

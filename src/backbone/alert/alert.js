define([

  'jquery'
  ,'underscore'
  ,'backbone'

], function (

  $
  ,_
  ,Backbone

) {

  return Backbone.View.extend({

    toggleFadeSpeed: 200

    ,alertTimeout: 6000

    ,contentWrapperTemplate: '<p></p>'

    /**
     * @param {Object}
     *   @param {Element} el
     */
    ,initialize: function () {
      this.fadeOutTimeout_ = 0;
      this.$contentEl_ = $(this.contentWrapperTemplate);
      this.$el.append(this.$contentEl_);
    }

    /**
     * @param {string} alertMessage
     */
    ,show: function (alertMessage) {
      clearTimeout(this.fadeOutTimeout_);
      this.$contentEl_.text(alertMessage);
      this.$el.fadeIn(this.toggleFadeSpeed);
      this.fadeOutTimeout_ = setTimeout(
        _.bind(this.hide, this), this.alertTimeout);
    }

    ,hide: function () {
      this.$el.fadeOut(this.toggleFadeSpeed);
    }

  });
});

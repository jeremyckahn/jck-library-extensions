define([

  'jquery'
  ,'backbone'

], function (

  $
  ,Backbone

) {
  'use strict';

  var TabsView = Backbone.View.extend({

    ACTIVE_CLASS: 'tabs-active'

    ,events: {
      'click .tabs li': 'onTabClick'
    }

    /**
     * @param {Object} opts
     *   @param {Element} el The tab container element.
     */
    ,initialize: function () {
      this.$tabs = this.$el.find('.tabs').children();
      this.$contents = this.$el.find('.tabs-contents').children();
      this.selectTab(this.$tabs.eq(0));
    }

    /**
     * @param {jQuery.Event} evt
     */
    ,onTabClick: function (evt) {
      evt.preventDefault();
      this.selectTab($(evt.currentTarget));
    }

    /**
     * @param {jQuery} $tab
     */
    ,selectTab: function ($tab) {
      this.$tabs.removeClass(this.ACTIVE_CLASS);
      $tab.addClass(this.ACTIVE_CLASS);
      this.$contents.css('display', 'none');
      $('#' + $tab.data('target')).css('display', 'block');
    }
  });

  return TabsView;
});

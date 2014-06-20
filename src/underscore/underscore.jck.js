define([

  'underscore'

], function (

  _

) {
  'use strict';

  /**
   * Removes all properties from an Object.
   * @param {Object} obj
   */
  _.empty = function (obj) {
    _.each(obj, function (value, key) {
      delete obj[key];
    });
  };

});

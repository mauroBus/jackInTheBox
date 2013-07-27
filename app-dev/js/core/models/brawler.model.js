define([
    'class',
    'knockout',
    'jquery'
  ],
  function(Inheritance, ko, $) {
    'use strict';
    /**
     * The basic application model that has the basic functionality
     *  to be extended for every model in the application.
     * @author  Mauro Buselli <mauro.buselli@globant.com>
     */
    var BrawlerModel = Class.extend({

      url: null,
      attributes: null, // hash of attributes

      init: function(attrs) {
        this.url = (attrs && attrs.url) ? attrs.url : '';
        this.attributes = {};
        this.set(this.attributes);
      },

      // params: hash: {key: value}
      set: function(attrs) {
        for (var attr in attrs) {
          this.attributes[attr] = attrs[attr];
        }
      },

      // attr : attribute name
      get: function(attr) {
        var value = this.attributes[attr];
        return $.isFunction(value) ? value() : value;
      },

      fetch: function() {
        var dfd = new $.Deferred();
        var _this = this;

        $.ajax({
          url: this.url,
          type: 'GET',
          dataType: 'json'
        })
        .done(function(data) {
          _this.parse.call(_this, data);
          dfd.resolve();
        })
        .fail(function(error) {
          dfd.reject(error);
        });

        return dfd.promise();
      },

      /**
       * Loads the model data given the service data.
       * To be overriden by subclasses
       * @param  {Object} data Service response
       */
      parse: function(data) {},

      /**
       * Copies this model from other model
       * @param  {BrawlerModel} aModel A model to copy from
       * @param {Array} exclideAttrs Attributes to exclude being copied.
       */
      copyFrom: function(aModel, excludeAttrs) {
        var prop, value, ownMethods;

        ownMethods = ['init', 'fetch', 'parse', 'copyFrom'].concat(excludeAttrs);

        for (prop in aModel) {
          value = aModel[prop];
          if (aModel.hasOwnProperty(prop) && this[prop] && !(prop in ownMethods)) {
            if (value.name !== 'dependentObservable') {
              if ($.isFunction(value)) {
                this[prop]( value() );
              }
              else {
                this[prop] = value;
              }
            }
          }
        }
      }

    });

    return BrawlerModel;
  }
);

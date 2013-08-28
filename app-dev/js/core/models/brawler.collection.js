define([
    'class',
    'brawlerModel',
    'knockout'
  ],
  function(Inheritance, BrawlerModel, ko) {
    'use strict';

    /**
     * The basic Application Collection that has the basic functionality
     *  to be extended for every collection in the application.
     * @author  Mauro Buselli <maurobuselli@gmail.com>
     */
    window.BrawlerCollection = BrawlerModel.extend({

      collection: null,
      url: null,
      ItemConstructor: null,
      fetchCbks: null,

      init: function(data) {
        this.collection = ko.observableArray([]);
        this.url = data ? data.url || '' : '';
        this.ItemConstructor = data ? data.itemConstructor || function(){} : function(){};
        this.fetchCbks = [];
        this.mixinObsArrayMethods();
        window.ko = ko;
      },

      parse: function(data) {
        for (var itemNr in data) {
          var newItem = new this.ItemConstructor(data[itemNr]);
          this.collection.push(newItem);
        }
      },

      fetch: function() {
        var _this = this,
          dfd = new $.Deferred();

        this._super()
          .done(function() {
            _this.fetchCbks.forEach(function(cbk) {
              cbk.call();
            });
            dfd.resolve();
          })
          .fail(function() {
            dfd.reject();
          });

        return dfd.promise();
      },

      addFetchListener: function(callback) {
        this.fetchCbks.push(callback);
      },

      getItems: function() {
        return this.collection();
      },

      getObservable: function() {
        return this.collection;
      },

      /**
       * Mix in each Array method as a proxy to `BrawlerCollection`.
       * @private
       */
      mixinObsArrayMethods: function() {
        // var methods = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice', 'toSource', 'toString', 'indexOf', 'lastIndexOf', 'forEach', 'every', 'some', 'filter', 'map', 'reduce', 'reduceRight'];
        var methods = ko.observableArray.fn;

        for (var method in methods) {
          this[method] = function(method) {
            return function() {
              // return Array.prototype[method].apply(this, [this.collection()].concat(Array.prototype.slice.call(arguments)));
              return this.collection[method].apply(this.collection, arguments);
            };
          }(method);
        };
      }

    });

    return BrawlerCollection;
  }
);

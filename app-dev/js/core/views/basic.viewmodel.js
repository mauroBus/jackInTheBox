define([
    'class',
    'knockout',
    'jquery',
    'jqueryui',
    'pubsub'
  ],
  /**
   * This is a basic View Model that has the basic initialize functionality
   * to be inherit for every view model.
   * @exports basic/view/model
   * @version 0.6
   * @author  Mauro Buselli <mauro.buselli@globant.com>
   */
  function(Inheritance, ko, $, jQueryUI, EventEmmiter) {
    'use strict';
    /**
    * This is a basic View Model that has the basic initialize functionality
    * to be inherit for every view model.
    * @version 1.1
    * @author  Mauro Buselli <mauro.buselli@globant.com>
    * @params Object options options:{ [ el: id/class ][, template: ] [, effects: {...}]  } -> effects: jQuery UI effects.
    */
    var BasicBrawlerViewModel = Class.extend(
	/** @lends BasicViewModel.prototype */
    {
      defaultEffects: { // default effects
        onShow: {
          effect: 'fade',
          easing: 'linear',
          mode: 'show',
          duration: 650
        },
        onHide: {
          effect: 'fade',
          easing: 'linear',
          mode: 'hide',
          direction: 'up',
          duration: 400
        }
      },

      // View Template to be filled with the view-model view.
      template: '',

      // DOM's element name where renderizes the view template
      el: '',
      $el: null,

      // View Model effects applied on show and on hide.
      effects: {},

      // View Model UUID. Unique View Model instance ID.
      // Utility either to store the view on a hash or to
      // render the view on a unique DOM's element id.
      uuid: null,

      // The views state.
      state: null,

      staticId: {
        value: 0
      },

      // Brawler View Publish Subscribe channel
      _familyChannel: null,

      /**
       * init Recibes the main options to set the basic attributes of the view.
       * There is no need to call this method in the instantiation of any sub-viewModel, it is auto executable when extends BasicViewModel.
       * @class BasicViewModel
       * @augments BasicViewModel
       * @constructs
       * @params Object options { [ el: id/class ][, template: ] [, effects: {...}]  } -> effects: jQuery UI effects.
       */
      init: function(options) {
        this.effects = $.extend(true, {}, this.defaultEffects);

        if (!options) {
          this.template = 'dummy HTML content...';
          this.el = 'div';
        }
        else {
          this.template = this.template || options.template || '';
          this.el = options.el || 'div';
          this.setEffects(options.effects);
        }

        this.state = 'initialized';
        this.uuid = this.staticId.value++;//this._getUUID();

        this._initEventChannel();
        this.initialize.apply(this, arguments);
      },

      /**
       * Initialize is an empty function by default. Override it with your own
       * view's initialization logic.
       */
      initialize: function() {},

      /**
       * Renderizes the view content on the screen
       *  and applies the KO bindings between view and view model.
       * Does not show the view on the screen, the 'el' is hidden
       * until calling 'show'.
       */
      render: function() {
        this.$el = $(this.el);

        if (!this.$el) {
          throw new Error ('Brawler <BasicViewModel>: view\'s element is not in the DOM');
        }
        this.$el.hide();
        this.$el.html(this.template);

        if (this.dataBind) {
          this._insertDinamicBindings();
        }

        ko.applyBindings(this, this.$el[0]);

        this.postRender();

        this.state = 'rendered';

        return this;
      },

      /**
       * To be overriden by subclasses.
       * Provides a place for do post render
       * DOM manipulation.
       */
      postRender: function() {},

      /**
       * Shows the view's el on the DOM
       * applying the effects.
       */
      show: function(fx) {
        var dfd = new $.Deferred();

        if (this.state === 'showed') {
          dfd.resolve();
          return dfd.promise();
        }

        var showFx;
        if (fx && (typeof fx === 'object')) {
          showFx = $.extend(true, {}, this.effects.onShow, fx);
        }
        else {
          showFx = this.effects.onShow;
        }
        showFx.complete = function() {
          dfd.resolve();
        };

        this.$el.effect(showFx);

        this.state = 'showed';

        return dfd.promise();
      },

      /**
       * Hides the view from the screen.
       */
      hide: function(fx) {
        var dfd = new $.Deferred();

        if (this.state === 'hiden') {
          dfd.resolve();
          return dfd.promise();
        }

        var hideFx;
        if (fx && (typeof fx === 'object')) {
          hideFx = $.extend(true, {}, this.effects.onHide, fx);
        }
        else {
          hideFx = this.effects.onHide;
        }

        hideFx.complete = function() {
          dfd.resolve();
        };

        this.$el.effect(hideFx);

        this.state = 'hiden';

        return dfd.promise();
      },

      /**
       * Toggles the view from the screen.
       */
      toggle: function(fx) {
        switch (this.state) {
          case 'showed':
            return this.hide(fx);
          case 'hiden':
            return this.show(fx);
          case 'rendered':
            return this.show(fx);
          default:
            throw new Error('This view (' + this.el + ') is in the state "' + this.state + '" and cannot be toggled');
        }
      },

      /**
       * Sets the effects on show.
       * @param Object fx jQuery UI effects object
       */
      setShowEffects: function(fx) {
        if (fx && (typeof fx === 'object')) {
          $.extend(true, this.effects.onShow, fx);
        }
      },

      /**
       * Sets the effects on hide.
       * @param Object fx jQuery UI effects object
       */
      setHideEffects: function(fx) {
        if (fx && (typeof fx === 'object')) {
          $.extend(true, this.effects.onHide, fx);
        }
      },

      /**
       * Sets the onShow and onHide effects.
       * @param {Object} fx Effects object containig 'onShow' and 'onHide' effects
       */
      setEffects: function(fx) {
        if (fx && (typeof fx === 'object')) {
          $.extend(true, this.effects, fx);
        }
      },

      /**
       * Removes this view model from the DOM and
       *  clean up the memory.
       */
      remove: function() {
        this.$el.html('');
        delete this.el;
        delete this.$el;
        delete this.template;
        delete this.effects;
        delete this.defaultEffects;
      },

      /**
       * Generates a unique ID value. It's used to set
       *  unique id to elements such us widgets.
       *
       * @param  {String} root The start name of the unique ID.
       * @return {String} UUID.
       */
      _getUUID: function(root) {
        var uuid = 'yyxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        });

        return (root || '') + uuid;
      },

      /**
       * Utility to insert dinamic data-bindings into the view's elements
       * @private
       * @param  {Object} options The object bindings
       * @return {String} The bindings converted to string
       */
      _parseBindingsToString: function(options) {
        var stringBindings = [];
        for (var key in options) {
          var val = options[key];
          switch (typeof val) {
            case 'string': stringBindings.push(key + ':' + val); break;
            case 'object': stringBindings.push(key + ':{' + this._parseBindingsToString(val) + '}'); break;
            case 'function': stringBindings.push(key + ':' + val.toString()); break;
          }
        }
        return stringBindings.join(',');
      },

      /**
       * inserts dinamic data-bindings into the view's elements
       * @private
       */
      _insertDinamicBindings: function() {
        var elemDB, attrs, $domEl, oldDBs;
        for (elemDB in this.dataBind) {
          attrs = this._parseBindingsToString(this.dataBind[elemDB]);
          if (attrs) {
            $domEl = $(this.el + ' ' + elemDB);
            oldDBs = $domEl.attr('data-bind');
            if (oldDBs) {
              // $.parseJSON(oldDBs);
              attrs += ',' + oldDBs;
            }
            $domEl.attr('data-bind', attrs);
          }
        }
      },

      /**
       * set the family (pub/sub) event channel
       * @param  {Object} channel the new (shared) channel
       * @private
       */
      _setFamilyChannel: function(channel) {
        EventEmmiter.mergeEvents(channel, this._familyChannel);
        this._familyChannel = channel;
        EventEmmiter.augment.call(this, this, this._familyChannel, 'on', 'off', 'trigger');
      },

      /**
       * creates the messaging pub/sub channel
       * @private
       */
      _initEventChannel: function() {
        this._familyChannel = {};
        EventEmmiter.augment.call(this, this, this._familyChannel);
      }

    });

    return BasicBrawlerViewModel;
  }
);

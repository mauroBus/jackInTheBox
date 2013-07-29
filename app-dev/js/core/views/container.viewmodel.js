define([
    'knockout',
    'jquery',
    'basicViewModel',
    'pubsub'
  ],
  function(ko, $, BasicViewModel, EventEmmiter) {
    'use strict';
    /**
     * This is a container View Model that has a set of view models each assosiated
     *  to a DOM region. This basic container functionality is able to be inherit
     *  for every view model.
     * @constructor
     * @version 1.0
     * @author  Mauro Buselli <mauro.buselli@globant.com>
     * @params obj options options : { [ el: id/class ][, template: ] [, effects: ] [, regions]  }
     */
    var ContainerBrawlerViewModel = BasicViewModel.extend({

      /* _brawler_subViews (private use only)
       * hash: {
       *   'view_name': {
       *     'view': (view_instance),
       *     'el': DOM's region id to insert the view,
       *     'type': ['dinamic', 'static'] (dafault: 'static')
       *    }
       *  }
       */
      _brawler_subViews: null,

      // to public access to the subviews.
      subViews: null, // hash with the subViews mapping: {'viewName': view_instance}

      _superChannel: null,

      init: function(options) {

        this._initSuperEventChannel();

        // calling super (BasicViewModel) init method
        this._super(options);

        this._brawler_subViews = this.createSubViews();
        this._shareFamilyChannel();

        this.subViews = {};
      },

      /**
       * To be overriden by subclasses.
       * Provides a place for instanciating subviews before renderization.
       */
      createSubViews: function() {
        return {};
      },

      render: function() {
        // calling super (BasicViewModel) render method
        this._super();
        this.renderSubviews();
      },

      renderSubviews: function() {
        var viewName, viewData;
        for (viewName in this._brawler_subViews) {
          viewData = this._brawler_subViews[viewName];
          this.addViewModel(viewData);
          viewData.view.render();
          this.subViews[viewName] = viewData.view;
        }
      },

      /**
       * @private
       * addViewModel assign a viewModel to the DOM's element.
       * @param {Object} viewModelData
       */
      addViewModel: function(viewModelData) {
        viewModelData.view.el = this.el + ' ' + viewModelData.el;
      },

      show: function(fx) {
        // calling the super (BasicViewModel) show
        var promise = this._super(fx);
        // show the subviews:
        for (var viewName in this.subViews) {
          // show view only if it's not a dinamic view
          if (this._brawler_subViews[viewName].type !== 'dinamic') {
            this.subViews[viewName].show();
          }
        }

        return promise;
      },

      hide: function(fx) {
        // FIRST! hide the subviews:
        for (var view in this.subViews) {
          this.subViews[view].hide();
        }
        // then, calling the super (BasicViewModel) show
        return this._super(fx);
      },

      removeSubViews: function() {
        for (var view in this.subViews) {
          this.subViews[view].remove();
        }
      },

      remove: function() {
        this.removeSubViews();
        this._super();
        delete this.subViews;
        delete this._brawler_subViews;
      },

      removeSubView: function(viewName) {
        var view = this.subViews[viewName];
        if (view) {
          view.remove();
          delete this.subViews[viewName];
          delete this._brawler_subViews[viewName];
        }
      },

      /**
       * @private
       */
      _setFamilyChannel: function(familyChannel) {
        EventEmmiter.mergeEvents(familyChannel, this._superChannel);
        this._superChannel = familyChannel;
        EventEmmiter.augment.call(this, this, this._superChannel, 'superOn', 'superOff', 'superTrigger');
      },

      /**
       * @private
       */
      _shareFamilyChannel: function() {
        var viewName, subView;
        for (viewName in this._brawler_subViews) {
          subView = this._brawler_subViews[viewName].view;
          subView._setFamilyChannel(this._familyChannel);
        }
      },

      /**
       * @private
       */
      _initSuperEventChannel: function() {
        this._superChannel = {};
        EventEmmiter.augment.call(this, this, this._superChannel, 'superOn', 'superOff', 'superTrigger');
      }

    });

    return ContainerBrawlerViewModel;
  }
);

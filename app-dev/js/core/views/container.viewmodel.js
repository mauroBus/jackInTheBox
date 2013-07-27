define([
    'knockout',
    'jquery',
    'basicViewModel',
    'pubsub'
  ],
  function(ko, $, BasicViewModel, BrawlerPubSub) {
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

      /* brawler_subViews (to private use only)
       * hash: {
       *   'view_name': {
       *     'view': (view_instance),
       *     'el': DOM's region id to insert the view,
       *     'type': ['dinamic', 'static'] (dafault: 'static')
       *    }
       *  }
       */
      brawler_subViews: null,

      // to public access to the subviews.
      subViews: null, // hash with the subViews mapping: {'viewName': view_instance}

      _superChannel: null,

      init: function(options) {
        this.initChannels();

        // calling super (BasicViewModel) init method
        this._super(options);

        this.subViews = {};

        this.brawler_subViews = this.createSubViews();
        this.shareChannel();
      },

      /**
       * To be overriden by subclasses.
       * Provides a place for instanciating subviews before renderization.
       */
      createSubViews: function() {},

      render: function() {
        // calling super (BasicViewModel) render method
        this._super();
        this.renderSubviews();
      },

      renderSubviews: function() {
        var viewName, viewData;
        for (viewName in this.brawler_subViews) {
          viewData = this.brawler_subViews[viewName];
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
          if (this.brawler_subViews[viewName].type !== 'dinamic') {
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
        delete this.brawler_subViews;
      },

      removeSubView: function(viewName) {
        var view = this.subViews[viewName];
        if (view) {
          view.remove();
          delete this.subViews[viewName];
          delete this.brawler_subViews[viewName];
        }
      },

      initChannels: function() {
        // new PubSub for the mother view <-> sub-views family
        this._familyChannel = new BrawlerPubSub();
        this._familyChannel.augment(this);
      },

      setFamilyChannel: function(familyChannel) {
        this._superChannel = familyChannel;
        this._superChannel.augment(this, 'superOn', 'superOff', 'superTrigger');
      },

      shareChannel: function() {
        var viewName, view;
        for (viewName in this.brawler_subViews) {
          view = this.brawler_subViews[viewName].view;
          view.setFamilyChannel(this._familyChannel);
        }
      }

    });

    return ContainerBrawlerViewModel;
  }
);

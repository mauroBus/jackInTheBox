define([
    'jquery',
    'jackBoxRouter',
    'jackBoxRouteManager',
    './moduleb.viewmodel'
  ], function($, JackBoxRouter, JackBoxRouteManager, ModuleBViewModel) {

    var ModuleBRouteManager = JackBoxRouteManager.extend({

      viewModel: null,

      initialize: function() {},

      load: function(route) {
        this.viewModel = new ModuleBViewModel({
          el: '#moduleB'
        });

        this.viewModel.render();

        return this.viewModel.show();
      },

      leave: function() {
        var dfd = new $.Deferred();
            that = this;

        this.viewModel.hide().done(function() {
          that.viewModel.remove();
          that.viewModel = null;
          dfd.resolve();
        });

        return dfd.promise();
      }

    });

    return ModuleBRouteManager;
  }
);

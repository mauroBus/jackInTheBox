define([
    'jackBoxRouter',
    'jackBoxRouteManager',
    './dashboard.viewmodel'
  ], function(JackBoxRouter, JackBoxRouteManager, DashboardViewModel) {

    var DashboardRouteManager = JackBoxRouteManager.extend({

      viewModel: null,

      initialize: function() {
        this.viewModel = new DashboardViewModel({
          el: '#dashboard'
        });
      },

      load: function(route) {
        this.viewModel.render();
        return this.viewModel.show();
      },

      leave: function() {
        return this.viewModel.hide();
      }

    });

    return DashboardRouteManager;
  }
);

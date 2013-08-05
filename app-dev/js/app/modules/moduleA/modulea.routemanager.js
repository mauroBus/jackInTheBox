define([
    'jackBoxRouter',
    'jackBoxRouteManager',
    './modulea.viewmodel'
  ], function(JackBoxRouter, JackBoxRouteManager, ModuleAViewModel) {

    var ModuleARouteManager = JackBoxRouteManager.extend({

      viewModel: null,

      initialize: function() {
        this.viewModel = new ModuleAViewModel({
          el: '#moduleA'
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

    return ModuleARouteManager;
  }
);

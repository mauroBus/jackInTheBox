define([
    'jackBoxRouteManager',
    './error.viewmodel'
  ], function(JackBoxRouteManager, ErrorViewModel) {

    var ErrorRouteManager = JackBoxRouteManager.extend({

      viewModel: null,

      load: function(route) {
        this.viewModel = new ErrorViewModel({
          el: '#error'
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

    return ErrorRouteManager;
  }
);

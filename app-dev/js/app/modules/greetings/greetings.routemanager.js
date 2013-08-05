define([
    'jackBoxRouter',
    'jackBoxRouteManager',
    './greetings.viewmodel'
  ], function(JackBoxRouter, JackBoxRouteManager, GreetingsViewModel) {

    var GreetingsRouteManager = JackBoxRouteManager.extend({

      greetingsViewModel: null,

      initialize: function() {
        this.greetingsViewModel = new GreetingsViewModel({
          el: '#greetings'
        });
      },

      load: function(route) {
        this.greetingsViewModel.render();
        return this.greetingsViewModel.show();
      },

      leave: function() {
        return this.greetingsViewModel.hide();
      }

    });

    return GreetingsRouteManager;
  }
);

define([
    'knockout',
    'jquery',
    'basicViewModel',
    'text!./greetings.view.html'
  ], function(ko, $, BasicViewModel, ViewTemplate) {

    var GreetingsModule = BasicViewModel.extend({

      dataBindings: {
        '.viewModelTitle': {
          click: 'goToDashboard'
        }
      },

      initialize: function(options) {
        this.template = ViewTemplate;
      },

      goToDashboard: function() {
        this.router.navigate('moduleA');
      }
    });

    return GreetingsModule;
  }
);

define([
    'knockout',
    'jquery',
    'basicViewModel',
    'text!./error.view.html'
  ], function(ko, $, BasicViewModel, ViewTemplate) {

    var ErrorModule = BasicViewModel.extend({

      dataBind: {
        '.goBack': {
          click: 'goToDashboard'
        }
      },

      initialize: function(options) {
        this.template = ViewTemplate;
      },

      goToDashboard: function() {
        this.router.navigate('dashboard');
      }

    });

    return ErrorModule;
  }
);

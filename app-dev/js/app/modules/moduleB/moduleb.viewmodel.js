define([
    'knockout',
    'jquery',
    'basicViewModel',
    'text!./moduleb.view.html'
  ], function(ko, $, BasicViewModel, ViewTemplate) {

    var ModuleAModule = BasicViewModel.extend({

      dataBindings: {
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

    return ModuleAModule;
  }
);

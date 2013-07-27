define([
    'knockout',
    'jquery',
    'basicViewModel',
    'text!./header.view.html'
  ], function(ko, $, BasicViewModel, ViewTemplate) {

    var HeaderModule = BasicViewModel.extend({

      initialize: function(options) {
        this.template = ViewTemplate;
      }

    });

    return HeaderModule;
  }
);

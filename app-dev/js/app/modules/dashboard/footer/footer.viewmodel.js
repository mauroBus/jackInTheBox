define([
    'knockout',
    'jquery',
    'basicViewModel',
    'text!./footer.view.html'
  ], function(ko, $, BasicViewModel, ViewTemplate) {

    var FooterModule = BasicViewModel.extend({

      initialize: function(options) {
        this.template = ViewTemplate;
      }

    });

    return FooterModule;
  }
);

define([
    'knockout',
    'jquery',
    'basicViewModel',
    'text!./footer.view.html'
  ], function(ko, $, BasicViewModel, ViewTemplate) {

    var FooterModule = BasicViewModel.extend({

      initialize: function(options) {
        this.template = ViewTemplate;
        this.on('asd', function(){});
      }

    });

    return FooterModule;
  }
);

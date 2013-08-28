define([
    'knockout',
    'jquery',
    'basicViewModel',
    'text!./detaileditem.view.html'
  ], function(ko, $, BasicViewModel, ViewTemplate) {

    var DetailedItemViewModel = BasicViewModel.extend({

      itemName: null,

      initialize: function(options) {
        this.template = ViewTemplate;
        this.on('itemEvent', this.updateMessage);
        this.itemName = ko.observable('No item selected');
      },

      updateMessage: function(item) {
        this.itemName('Event caught on: ' + item);
        this.$el.find('.itemName')
          .animate({
            opacity: 0.2,
            color: 'aqua'
          }, 150)
          .animate({
            opacity: 1,
            color: ''
          }, 150);
      }
    });

    return DetailedItemViewModel;
  }
);

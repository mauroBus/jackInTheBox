define([
    'knockout',
    'jquery',
    'basicViewModel',
    'text!./detaileditem.view.html',
    'pubsub'
  ], function(ko, $, BasicViewModel, ViewTemplate, PubSub) {

    var DetailedItemViewModel = BasicViewModel.extend({

      itemName: null,

      initialize: function(options) {
        this.template = ViewTemplate;
        this.on('itemEvent', this.showItem);
        this.itemName = ko.observable('No item selected');
      },

      showItem: function(item) {
        this.itemName('Event caught on: ' + item);
      }
    });

    return DetailedItemViewModel;
  }
);

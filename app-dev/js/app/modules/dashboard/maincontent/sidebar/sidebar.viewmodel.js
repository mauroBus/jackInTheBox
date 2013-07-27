define([
    'knockout',
    'jquery',
    'basicViewModel',
    'text!./sidebar.view.html',
    'pubsub'
  ], function(ko, $, BasicViewModel, ViewTemplate, PubSub) {

    var SideBarModule = BasicViewModel.extend({

      items: null,
      $lastActive: null,

      // dataBinds: {
      //   'li.sideBarItem': {
      //     click: 'onItemClick'
      //   }
      // },

      initialize: function(options) {
        this.template = ViewTemplate;
        this.items = ['item1', 'item2', 'item3', 'item4', 'item5'];
      },

      onItemClick: function(item, event) {
        var rst = this.trigger('sideBarClick', item);

        if (item === this.items[4]) {
          this.trigger('item5Clicked');
        }

        if (this.$lastActive) {
          this.$lastActive.toggleClass('active');
        }
        this.$lastActive = $(event.target);
        this.$lastActive.addClass('active');
      }
    });

    return SideBarModule;
  }
);

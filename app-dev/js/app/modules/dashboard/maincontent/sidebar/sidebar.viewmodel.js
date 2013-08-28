define([
    'knockout',
    'jquery',
    'basicViewModel',
    'text!./sidebar.view.html'
  ], function(ko, $, BasicViewModel, ViewTemplate) {

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
        var rst = this.trigger('itemEvent', item);

        if (this.$lastActive) {
          this.$lastActive.removeClass('active');
        }
        this.$lastActive = $(event.currentTarget);
        this.$lastActive.addClass('active');
      }
    });

    return SideBarModule;
  }
);

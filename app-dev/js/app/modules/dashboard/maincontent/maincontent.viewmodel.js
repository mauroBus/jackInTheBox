define([
    'knockout',
    'jquery',
    'containerViewModel',
    'text!./maincontent.view.html',
    './sidebar/sidebar.viewmodel'
  ], function(ko, $, ContainerViewModel, ViewTemplate, SideBar) {

    var MainContentModule = ContainerViewModel.extend({

      name: 'Main Content',
      details: 'Hey! We are inserting dinamics data-binds over here...',
      sideBarHidden: null,

      /*
       * Definition of DINAMIC DATA-BIND content
       * (NOT USING BINDINGS IN HTML FOR THIS ELEMENTS!!!)
       */
      dataBind: {
        'input.toggleSideBar': {
          click: 'toggleSideBar', // on click: execute toggleSideBar
          css: {
            'blueButton': 'sideBarHidden' // when sideBar is hidden: the button is blue.
          }
        },
        '.mainContentDetails': {
          text: 'details'
        }
      },

      initialize: function(options) {
        this.template = ViewTemplate;
        this.sideBarHidden = ko.observable(false);
        this.count = 0;
        this.on('sideBarClick', this.sideBarClicked);
        this.on('item5Clicked', this.propagateItemFiveClick);
      },

      sideBarClicked: function(item) {
        this.count++;
        if (this.count > 5) {
          this.off('sideBarClick', this.sideBarClicked);
        }
        console.log(item);
        return item + ' don\'t really care';
      },

      propagateItemFiveClick: function() {
        this.superTrigger('item5Clicked');
      },

      createSubViews: function() {
        return {
          'sideBar': {
            view: new SideBar({
              effects: {
                onShow: {
                  effect: 'drop',
                  easing: 'easeInOutCubic',
                  direction: 'left',
                  duration: 800
                },
                onHide: {
                  effect: 'drop',
                  easing: 'easeInOutBack',
                  direction: 'left',
                  duration: 450
                }
              }
            }),
            el: '#leftContent'
          }
        };
      },

      toggleSideBar: function() {
        this.subViews['sideBar'].toggle();
        this.sideBarHidden(!this.sideBarHidden());
      }

    });

    return MainContentModule;
  }
);

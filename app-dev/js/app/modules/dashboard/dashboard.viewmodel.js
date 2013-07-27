define([
    'knockout',
    'jquery',
    'containerViewModel',
    'text!./dashboard.view.html',
    './header/header.viewmodel',
    './maincontent/maincontent.viewmodel',
    './footer/footer.viewmodel',
    'brawlerCollection'
  ], function(ko, $, ContainerViewModel, ViewTemplate, HeaderViewModel,
    MainContentViewModel, FooterViewModel, BrawlerCollection) {

    var DashboardModule = ContainerViewModel.extend({

      initialize: function(options) {
        this.template = ViewTemplate;
        this.on('item5Clicked', this.showItemFive);

        this.collection = new BrawlerCollection();
      },

      createSubViews: function() {
        return {
          'header': {
            view: new HeaderViewModel(),
            el: '#header', // DOM's element selector -it must exist in the viewModel's view
            type: 'static' // default value is 'static' ('dinamic' when the subViewModel doesn't show with the mother 'show')
          },
          'mainContent': {
            view: new MainContentViewModel({
              effects: {
                onHide: {
                  effect: 'slide',
                  easing: 'easeOutQuad',
                  direction: 'rigth',
                  duration: 'slow'
                }
              }
            }),
            el: '#mainContent',
            type: 'static' // default value
          },
          'footer': {
            view: new FooterViewModel(),
            el: '#footer',
            type: 'static' // default value
          }
        };
      },

      showItemFive: function() {
        console.log('OMG! this is "super" (superTrigger), I can\'t believe it :D');
      }

    });

    return DashboardModule;
  }
);

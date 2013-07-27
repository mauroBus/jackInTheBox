define(
  [
    'basicViewModel',
    'text!./loading.view.html'
  ],
  function(BasicViewModel, ViewTemplate) {

    var LoadingViewModel = BasicViewModel.extend({

      // to keep only one  displayed
      simultaneousShows: null,

      init: function(options) {
        this._super(options);
        this.template = ViewTemplate;
        this.simultaneousShows = 0;
      },

      show: function(fx) {
        this.simultaneousShows++;
        if (this.simultaneousShows === 1) {
          this._super(fx);
        }
      },

      hide: function(fx) {
        this.simultaneousShows--;
        if (this.simultaneousShows < 1) {
          this._super(fx);
        }
      }

    });

    return LoadingViewModel;
  }
);
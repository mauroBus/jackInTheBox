define([
  'app/router/router'
  ],
  function(Router) {

    var init = function() {
      var router = new Router();
      router.navigateTo('dashboard');
    };

    return {
      init : init
    };

  }
);
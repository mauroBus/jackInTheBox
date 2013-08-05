/**
 * JackBoxRouteManager
 * @author maurobuselli@gmail.com
 */
define([
    'jquery',
    'class',
    'jackBoxRouter'
  ], function($, Inheritance, JackBoxRouter) {

    var JackBoxRouteManager = Class.extend({

      router: null,

      init: function() {
        this.router = JackBoxRouter;
        this.initialize();
      },

      /**
       * Initialize is an empty function by default. Override it with your own
       * route manager's initialization logic.
       */
      initialize: function() {},

      /**
       * this function is triggered when the navigation to the
       * @param  {[type]} route The route
       * @return {[type]}       [description]
       */
      load: function(route) {},
      leave: function() {}
    });

    return JackBoxRouteManager;
  }
);

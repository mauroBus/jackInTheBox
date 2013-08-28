/**
 * Jack In The Box Router / Views State Manager
 * @author maurobuselli@gmail.com
 */
define([
    'jquery',
    'backRouter'
  ], function($, Router) {

    var JackBoxRouter = function() {

      // Routes Handlers, hash: {[ 'routePath': route_managers_array ]}
      this.routes = {};

      this.currentRoute = null;
      this.defaultRoute = null;
      this.router = null;

      this.init = function() {
        this.router = new Router();
      };

      this.start = function() {
        Router.history.start();
      };

      this.addRouteManager = function(route, manager) {
        this.routes[route] = this.routes[route] || [];
        this.routes[route].push(manager);
        this.router.route(route, '', this._navigateTo.bind(this, route));
      };

      this._getRouteManagers = function(route) {
        var rms;
        // TODO: routes matching
        rms = this.routes[route] || [];
        return rms;
      };


      this.navigate = function(route) {
        this.router.navigate(route, {trigger: true});
      };

      /**
       * Navigates to a route.
       * @param  {String} route Next route to navigate
       * @private
       */
      this._navigateTo = function(route) {
        var activeRouteManagers = this._getRouteManagers(this.currentRoute);
        var routeManagers = this._getRouteManagers(route);
        var rm;
        var args = Array.prototype.slice.call(arguments, 1);
        var activeRMNumber = activeRouteManagers.length;

        if (!routeManagers.length) {
          if (this.defaultRoute) {
            this.navigate(this.defaultRoute);
          }
          return;
        }

        var discountRM = function() {
          activeRMNumber--;
          if (activeRMNumber <= 0) {
            awakeRMs();
          }
        };

        var awakeRMs = function() {
          var mgr;
          for (mgr in routeManagers) {
            routeManagers[mgr].load.apply(routeManagers[mgr], args);
          }
        };

        args.unshift(route);

        if (activeRouteManagers.length) {
          for (rm in activeRouteManagers) {
            activeRouteManagers[rm].leave.apply(activeRouteManagers[rm], args).done(discountRM);
          }
        }
        else {
          awakeRMs();
        }

        this.currentRoute = route;
      };

      /**
       * sets the default navigation route when the asked route dont exists.
       * @param  {String} route The default error route
       */
      this.setDefaultRoute = function(route) {
        if (!this.routes[route]) {
          throw new Error('JackInTheBox <Router>: Error: "' + route +
            '" route does not exist to be setted as the error route.');
        }
        this.defaultRoute = route;
        // this.router.route('*default', '', this._navigateTo.bind(this, route));
      };

    };

    var jackBoxRouter = new JackBoxRouter();
    jackBoxRouter.init();

    return jackBoxRouter;
  }
);

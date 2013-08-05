/**
 * Jack In The Box Router / Views State Manager
 * @author maurobuselli@gmail.com
 */
define([
    'jquery',
    'routie'
  ], function($, Routie) {

    var JackBoxRouter = function() {

      // Routes Handlers, hash: {[ 'routePath': route_managers_array ]}
      this.routes = {};

      this.currentRoute = null;
      this.errorRoute = null;

      // var routie = new Router().init();

      this.addRouteManager = function(route, manager) {
        this.routes[route] = this.routes[route] || [];
        this.routes[route].push(manager);
        Routie.addRoute(route, this.navigateTo.bind(this, route));
        // routie.on(route, function(){console.log('asdasdasd');});
      };

      this.getRouteManagers = function(route) {
        var rms;
        // TODO: routes matching
        rms = this.routes[route] || [];
        return rms;
      };


      this.navigate = function(route) {
        console.log('navigating');
        Routie.parse(route);
      };

      /**
       * Navigates to a route.
       * @param  {String} route Next route to navigate
       */
      this.navigateTo = function(route) {
        var activeRouteManagers = this.getRouteManagers(this.currentRoute);
        var routeManagers = this.getRouteManagers(route);
        var rm;
        var args = Array.prototype.slice.call(arguments, 1);
        var activeRMNumber = activeRouteManagers.length;

        if (!routeManagers.length) {
          console.log(this.errorRoute);
          if (this.errorRoute) {
            this.navigate(this.errorRoute);
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
          for (rm in routeManagers) {
            routeManagers[rm].load.apply(routeManagers[rm], args);
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
      this.onErrorNavigate = function(route) {
        this.errorRoute = route;
      };

    };

    return new JackBoxRouter();
  }
);

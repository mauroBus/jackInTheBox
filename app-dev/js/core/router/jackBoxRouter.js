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

      this.addRouteManager = function(route, manager) {
        this.routes[route] = this.routes[route] || [];
        this.routes[route].push(manager);
        routie(route, this.navigateTos.bind(this, route));
      };

      this.getRouteManagers = function(route) {
        var rms;
        // TODO: routes matching
        rms = this.routes[route] || [];
        return rms;
      };


      this.navigate = function(route) {
        routie(route);
      };

      /**
       * Navigates to a route.
       * @param  {String} route Next route to navigate
       */
      this.navigateTos = function(route) {
        var activeRouteManagers = this.getRouteManagers(this.currentRoute);
        var routeManagers = this.getRouteManagers(route);
        var rm;
        var args = Array.prototype.slice.call(arguments, 1);
        var activeRMNumber = activeRouteManagers.length;

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

    };

    return new JackBoxRouter();
  }
);

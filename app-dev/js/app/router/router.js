/**
 * Intento de router...
 */
define([
    'jquery',
    '../modules/dashboard/dashboard.viewmodel'
  ], function($, DashboardModule) {

    var Router = function(options) {

      // stores the application modules
      this.modules = {
        landingPage: null,
        dashboard: null
      };

      // Routes definition (routeName: action):
      this.routes = {
        defaultPage: 'loadDashboard',
        landingPage: 'loadDashboard',
        dashboard: 'loadDashboard'
      };

      this.currentModule = null;

      var _this = this;

      this.addRoute = function(route, action) {
        var actionName = 'load' + route;
        this.routes[route] = actionName;
        this.modules[route] = null;
        this[actionName] = action;
      };

      /**
       * Navigates to a module. The list of the module names are in the
       * routes description.
       * @param  {String} module           next module
       * @param  {boolean} destroyCurrent  'true' to remove the current module.
       */
      this.navigateTo = function(module, destroyCurrent) {
        var nextModule = this.routes[module] ? module : 'defaultPage';

        var args = Array.prototype.slice.call(arguments);
        var navArgs = args.slice(2);

        if (nextModule === this.currentModule) {
          return;
        }

        if (!this.currentModule) { // first time, first module to load
          var f = this.routes[nextModule];
          this[f].apply(this, navArgs);
        }
        else { // other module is beeing displayed -> hide it.
          this.modules[this.currentModule].hide().done(function() {
            var f = _this.routes[nextModule];
            _this[f].apply(_this, navArgs);
          });
        }

        if (destroyCurrent) {
          this.modules[this.currentModule].remove();
          this.modules[this.currentModule] = null;
        }
      };


      /*********************************************
       * Actions declaration:
       *********************************************/

      this.loadDashboard = function() {
        if (this.modules.dashboard) {
          this.modules.dashboard.show();
        }
        else { // create module and display it
          this.modules.dashboard = new DashboardModule({
            el: '#dashboard',
            effects: {
              onShow: {
                duration: 'slow'
              },
              onHide: {
                effect: 'slide',
                easing: 'linear',
                mode: 'hide',
                direction: 'up',
                duration: 2000
              }
            }
          });
          this.modules.dashboard.render();
          this.modules.dashboard.show();
        }
      };

    };

    return Router;
  }
);

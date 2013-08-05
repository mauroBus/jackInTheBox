define([
    'jackBoxRouter',
    'app/modules/greetings/greetings.routemanager',
    'app/modules/dashboard/dashboard.routemanager',
    'app/modules/moduleA/modulea.routemanager',
    'app/modules/moduleB/moduleb.routemanager'
  ],
  function(Router, GreetingsRouteManager, DashboardRouteManager, ModuleARouteManager,
    ModuleBRouteManager) {

    var init = function() {
      // var router = new Router();
      Router.addRouteManager('dashboard', new DashboardRouteManager());
      Router.addRouteManager('greetings', new GreetingsRouteManager());
      Router.addRouteManager('moduleA', new ModuleARouteManager());
      Router.addRouteManager('moduleB', new ModuleBRouteManager());

      Router.navigate('dashboard');
    };

    return {
      init : init
    };

  }
);

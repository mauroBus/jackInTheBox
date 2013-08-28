define([
    'jackBoxRouter',
    'app/modules/greetings/greetings.routemanager',
    'app/modules/dashboard/dashboard.routemanager',
    'app/modules/moduleA/modulea.routemanager',
    'app/modules/moduleB/moduleb.routemanager',
    'app/modules/error/error.routemanager'
  ],
  function(Router, GreetingsRouteManager, DashboardRouteManager, ModuleARouteManager,
    ModuleBRouteManager, ErrorRouteManager) {

    var init = function() {
      var dashboardRM = new DashboardRouteManager();

      Router.addRouteManager('*default', new ErrorRouteManager());
      Router.addRouteManager('', dashboardRM);
      Router.addRouteManager('dashboard', dashboardRM);
      Router.addRouteManager('greetings', new GreetingsRouteManager());
      Router.addRouteManager('moduleA', new ModuleARouteManager());
      Router.addRouteManager('moduleB', new ModuleBRouteManager());
      Router.setDefaultRoute('dashboard');
      // Router.setDefaultRoute('dashboard');

      Router.start();
      // Router.navigate('dashboard');
    };

    return {
      init : init
    };

  }
);

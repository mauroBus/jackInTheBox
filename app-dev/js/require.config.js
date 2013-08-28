define(function() {

  /**
   * Definitions of the paths and app dependences.
   * (Config placed in a separated file to allow test load the same require configuration)
   */
  require.config({
    paths: {
      'jquery' : './libs/jquery/jquery-1.9.1.min',
      'jqueryui' : './libs/jquery/jqueryui/jquery-ui',
      'knockout': './libs/knockout/knockout-2.2.1.debug',
      'text' : './libs/require/text',
      'class': 'core/class.inheritance',
      'basicViewModel': 'core/views/basic.viewmodel',
      'containerViewModel': 'core/views/container.viewmodel',
      'brawlerModel': 'core/models/brawler.model',
      'brawlerCollection': 'core/models/brawler.collection',
      'eventmanager': 'core/eventmanager/eventmanager',
      // 'routie': './libs/routie/routie',
      // 'routie': './libs/router/crossroads',
      // 'signals': './libs/router/signals',
      // 'router': './libs/routie/routie', //./libs/router/crossroads
      'backRouter': 'core/router/back.router',
      'jackBoxRouter': 'core/router/jackBoxRouter',
      'jackBoxRouteManager': 'core/router/jackBoxRouteManager'
    },
    shim: {
      'jqueryui': {
        deps: ['jquery'],
        exports: 'jQueryUI'
      },
      'knockout': {
        exports: 'ko'
      },
      'class': {
        exports: 'Class'
      }
    },
    waitSeconds: 5
  });

});
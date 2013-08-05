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
      'pubsub': 'core/pubsub/pubsub',
      // 'routie': './libs/routie/routie',
      'routie': './libs/router/crossroads',
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
      },
      'routie': {
        exports: 'Routie'
      }
    },
    waitSeconds: 5
  });

});
/**
 * Main require file.
 * Place to load the require configuration and start the
 *  application.
 *
 * @author  Mauro Buselli <mauro.buselli@globant.com>
 */
require(
  [
    'require.config',
    'app/app'
  ],
  function(config, app) {
    app.init();
  }
);
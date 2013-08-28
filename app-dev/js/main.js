/**
 * Main require file.
 * Place to load the require configuration and start the
 *  application.
 *
 * @author  Mauro Buselli <maurobuselli@gmail.com>
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

// git add $(git status | grep -e modified | cut -d: -f2)
// git add $(git status | grep -P '\t'app | cut -f2)

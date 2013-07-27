/**
 * trigger: allows trigger a topic event with any number of arguments
 *          returns a list with the results of the 'topic' subscriptors.
 * on: allows subscribe callbacks to topics.
 * off: allows unsubscribe callbacks to topics.
 *
 * @author maurobuselli@gmail.com
 */
define(function () {

  var BrawlerPubSub = function() {
    this.topics = {}; // hash: {topic -> {action, context}}
  };

  BrawlerPubSub.prototype.trigger = function(topic) {
    var i, action, ctxt,
      results = [], partialResult,
      args = Array.prototype.slice.call(arguments, 1);

    for (i in this.topics[topic]) {
      action = this.topics[topic][i].action;
      ctxt = this.topics[topic][i].context;
      partialResult = action.apply(ctxt, args);
      if (partialResult !== undefined) {
        results.push(partialResult);
      }
    }
    return results;
  };

  BrawlerPubSub.prototype.on = function(topic, action, context) {
    this.topics[topic] = this.topics[topic] || [];
    this.topics[topic].push({
      action: action,
      context: (context || this)
    });
  };

  BrawlerPubSub.prototype.off = function(topic, callback) {
    var i, action, subs = this.topics[topic];
    for (i in subs) {
      action = subs[i].action;
      if (callback === action) {
        subs = subs.splice(i, 1);
        return;
      }
    }
  };

  /**
   * Parasitic augment. Adds a publish subscribe functionality to an object
   * @param  {Object} object      Target object to convert in a Pub Sub.
   * @param  {String} onAttr      Method name corresponding to the 'on' (subscribe).
   * @param  {String} offAttr     Method name corresponding to the 'off' (unsubscribe).
   * @param  {String} triggerAttr Method name corresponding to the 'trigger' (unsubscribe).
   */
  BrawlerPubSub.prototype.augment = function(object, onAttr, offAttr, triggerAttr) {
    var that = this;
    object[triggerAttr || 'trigger'] = function() {
      this.topics = that.topics;
      return that.trigger.apply(this, arguments);
    };
    object[onAttr || 'on'] = function() {
      this.topics = that.topics;
      that.on.apply(this, arguments);
    };
    object[offAttr || 'off'] = function() {
      this.topics = that.topics;
      that.off.apply(this, arguments);
    };
    // object['topics'] = this.topics;
  }

  return BrawlerPubSub;
});

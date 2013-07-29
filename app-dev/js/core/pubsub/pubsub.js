/**
 * Publish Subscribe Events Manager
 *
 * trigger: allows trigger a topic event with any number of arguments
 *          returns a list with the results of the 'topic' subscriptors.
 * on: allows subscribe callbacks to topics.
 * off: allows unsubscribe callbacks to topics.
 *
 * @author maurobuselli@gmail.com
 */
define(function () {

  var EventManager = function() {
    this._topics = {}; // hash: {topic -> {action, context}}
  };

  var proto = EventManager.prototype;

  proto.trigger = function(topic) {
    var i, action, ctxt,
      results = [], partialResult,
      args = Array.prototype.slice.call(arguments, 1);

    for (i in this._topics[topic]) {
      action = this._topics[topic][i].action;
      ctxt = this._topics[topic][i].context;
      partialResult = action.apply(ctxt, args);
      if (partialResult !== undefined) {
        results.push(partialResult);
      }
    }
    return results;
  };

  proto.on = function(topic, action, context) {
    this._topics[topic] = this._topics[topic] || [];
    this._topics[topic].push({
      action: action,
      context: (context || this)
    });
  };

  proto.off = function(topic, callback) {
    var i, action, subs = this._topics[topic];
    for (i in subs) {
      action = subs[i].action;
      if (callback === action) {
        subs = subs.splice(i, 1);
        return;
      }
    }
  };

  EventManager.mergeEvents = function(topicsTo, topicFrom) {
    for (var topic in topicFrom) {
      topicsTo[topic] = topicsTo[topic] || [];
      topicsTo[topic].push.apply(topicsTo[topic], topicFrom[topic]);
    }
  };

  /**
   * Parasitic augment. Adds a publish subscribe functionality to an object
   * @param  {Object} object      Target object to convert in a Pub Sub.
   * @param  {String} onAttr      Method name corresponding to the 'on' (subscribe).
   * @param  {String} offAttr     Method name corresponding to the 'off' (unsubscribe).
   * @param  {String} triggerAttr Method name corresponding to the 'trigger' (unsubscribe).
   */
  EventManager.augmentParasitic = function(object, onAttr, offAttr, triggerAttr) {
    var that = this;
    object[triggerAttr || 'trigger'] = function() {
      this._topics = that._topics;
      return that.trigger.apply(this, arguments);
    };
    object[onAttr || 'on'] = function() {
      this._topics = that._topics;
      that.on.apply(this, arguments);
    };
    object[offAttr || 'off'] = function() {
      this._topics = that._topics;
      that.off.apply(this, arguments);
    };
    // object['topics'] = this._topics;
  };

  /**
   * Adds a publish subscribe functionality to an object, given its event object.
   */
  EventManager.augment = function(object, topcisObj, onAttr, offAttr, triggerAttr) {
    var that = this;
    object[triggerAttr || 'trigger'] = function() {
      this._topics = topcisObj;
      return EventManager.prototype.trigger.apply(this, arguments);
    };
    object[onAttr || 'on'] = function() {
      this._topics = topcisObj;
      EventManager.prototype.on.apply(this, arguments);
    };
    object[offAttr || 'off'] = function() {
      this._topics = topcisObj;
      EventManager.prototype.off.apply(this, arguments);
    };
  };

  return EventManager;
});

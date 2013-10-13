/*
  Backbone Hotkeys 1.0
  (c) 2012-2013 Robert Pocklington
  Backbone-hotkeys may be freely distributed under the MIT license.

  adds hotkey binding to Backbone.js
  include after backbone.js to overload default view event binding

 Example:

 App.SomeView = Backbone.View.extend({
   el:$('#some-id'),

   events: {

     'keyup[esc]       body': 'someMethod',
     'keyup[Alt+m]     body': 'someMethod',
    'keyup[Alt+h]     body': 'someMethod',
     'keyup[Alt+right] body': 'someMethod',
     'keyup[Ctrl+left] body': 'someMethod',
     'keyup[Alt+s]     body': 'someMethod',
     'click #some_id'       : 'someMethod'
   }

 });

 */

$(function() {
  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  Backbone.View = Backbone.View.extend({


    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;

        var hotkeysRegex = /(.*)\[(.*)\]/ ;
        var hotkeyEvent = eventName.match(hotkeysRegex);
        var keyCombination = null;

        if (hotkeyEvent) {
          eventName = hotkeyEvent[1];
          keyCombination = hotkeyEvent[2];
        }

        if (selector === '') {
          if (hotkeyEvent) {
            this.$el.on(eventName, keyCombination, method);
          } else {
            this.$el.on(eventName, method);
          }
        } else {
          if (hotkeyEvent) {
            $(document).delegate(selector, eventName, keyCombination, method);
          } else {
            this.$el.on(eventName, selector, method);
          }
        }
      }
      return this;
    }
  });
});

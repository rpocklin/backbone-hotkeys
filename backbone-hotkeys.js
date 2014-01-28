/*
  Backbone Hotkeys 1.10
  (c) 2012-2013 Robert Pocklington
  Backbone-hotkeys may be freely distributed under the MIT license.

  adds hotkey binding to Backbone.js
  include after backbone.js to overload default view event binding

 Example:

 App.SomeView = Backbone.View.extend({
   el:$('#some-id'),

   events: {
     'keyup[esc]             ': 'someMethod',
     'keyup[Alt+m] .a:visible': 'someMethod',
     'keyup[Alt+h]       body': 'someMethod',
     'keyup[Alt+right]   body': 'someMethod',
     'keyup[Ctrl+left]   body': 'someMethod',
     'keyup[Alt+s]       body': 'someMethod',
     'click          #some_id': 'someMethod'
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

        var eventName = match[1];
        var selector = match[2];
        var methodBound = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;

        var hotkeysRegex = /(.*)\[(.*)\]/ ;
        var hotkeyEvent = eventName.match(hotkeysRegex);
        var keyCombination = null;

        if (hotkeyEvent) {
          eventName = hotkeyEvent[1];
          keyCombination = hotkeyEvent[2];
        }

        if (!selector) {
          if (hotkeyEvent) {
            $(document).bind(eventName, keyCombination, methodBound);
          } else {
            this.$el.on(eventName, methodBound);
          }
        } else {

          if (hotkeyEvent) {

            var m = (function(selector, eventName, keyCombination, method) {
              // inner function to work around function-level variable scope
              return function() {

                // if selector defined for hotkey event, use its existence as a guard to perform the target action
                if ($(this).find(selector).length > 0) {
                  method.apply(null, arguments);
                }
              };

          }(selector, eventName, keyCombination, method));
            $(document).bind(eventName, keyCombination, m);
          } else {
            this.$el.on(eventName, selector, methodBound);
          }
        } // end loop
      }
      return this;
    }
  });
});

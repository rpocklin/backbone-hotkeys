/*

Adds hotkey binding to backbone nicely.

Include this script (and original hotkeys.js) file after backbone.js to override default view.

Tested with: backbone 0.9.2 and jQuery 1.7.2 and 1.8.3



By default, hotkeys.js does not intercept keyup/keydown/keypress events
when they occur within an input.  If you want this functionality (you may)
simply comment out lines 50 - 53 inclusive in hotkeys.js

Example Usage in backbone view:

App.SomeView = Backbone.View.extend({
  el:$('#some-id'),

  events:{

    'keyup[esc]       body': 'someMethod',  // hotkeys keymapping
    'keyup[Alt+m]     body': 'someMethod',  // hotkeys keymapping
    'keyup[Alt+h]     body': 'someMethod',  // hotkeys keymapping
    'keyup[Alt+right] body': 'someMethod',  // hotkeys keymapping
    'keyup[Ctrl+left] body': 'someMethod',  // hotkeys keymapping
    'keyup[Alt+s]     body': 'someMethod',  // hotkeys keymapping
    'click #some_id'       : 'someMethod'   // typical usage
  }
});
*/

Backbone.View = Backbone.View.extend({
  delegateEvents : function(events) {
    // Cached regex to split keys for `delegate`.
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    if (!(events || (events = _.result(this, 'events')))) return;
    this.undelegateEvents();
    for (var key in events) {
      var method = events[key];
      if (!_.isFunction(method)) method = this[events[key]];
      if (!method) throw new Error('Method "' + events[key] + '" does not exist');
      var match = key.match(delegateEventSplitter);
      var eventName = match[1], selector = match[2];

      var reg = /(.*)\[(.*)\]/ ;
      var keyCombinationEvent = eventName.match(reg);
      var actualEventName = eventName + '.delegateEvents' + this.cid;

      var keyCombination = null;

      if (keyCombinationEvent) {
        eventName = keyCombinationEvent[1];
        keyCombination = keyCombinationEvent[2];
      }

      method = _.bind(method, this);

      if (selector === '') {
        if (keyCombination) {
          this.$el.bind(eventName, keyCombination, method);
        } else {
          this.$el.bind(actualEventName, method);
        }
      } else {
        if (keyCombination) {
          $(document).delegate(selector, eventName, keyCombination, method);
        } else {
          this.$el.delegate(selector, actualEventName, method);
        }
      }
    }
  }
});

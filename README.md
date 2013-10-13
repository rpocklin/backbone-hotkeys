# Backbone-hotkeys

#About
**Backbone Hotkeys** is an extension to the standard Backbone View which lets you easily add and remove handlers for
keyboard events supporting almost any key combination.  Uses the *hotkey.js* library written by: [John Resig]
(http://github.com/jeresig/jquery.hotkeys).

## Demo
[Demo](http://htmlpreview.github.com/?https://github.com/rpocklin/backbone-hotkeys/master/example/index.html)

## Types
Supported types are `'keydown'`and `'keyup'`.

## How-to
Include *hotkeys.js* and *backbone-hotkeys.js* after *backbone.js* in your app.

## Example

    App.SomeView = Backbone.View.extend({
      el: 'some-container',

      events:{

        'keyup[esc]       body': 'someMethod',
        'keyup[Alt+m]     body': 'someMethod',
        'keyup[Ctrl+left] body': 'someMethod'
      }

    });

## Notes
There are 4 arguments in the events binding, which are:
  - keyup: when key action should trigger the event
  - [esc]: the key (or key-combination, separated with +) to trigger the event
  - body: the DOM element this should bind to (ie. event must bubble up to this).
  - 'someMethod': The method to execute when a matching key combination is found (same as normal Backbone events).


## Compatibility
Works with jQuery 1.8.3 and Backbone 1.1.0.

## License
[MIT License](http://htmlpreview.github.com/?https://github.com/rpocklin/backbone-hotkeys/master/MIT-LICENSE.txt)

$(function() {

  App = {};

  App.ExampleView = Backbone.View.extend({
    el: '#example_container',

    events: {
      'keyup[Alt+h] #one:visible'      : 'hideOne',
      'keyup[Alt+o] #one:not(:visible)': 'showOne',
      'keyup[Alt+j]'  : 'toggleTwo',
      'keyup[Alt+k]'  : 'toggleThree',
      'keyup[esc]'    : 'hideAll',
      'keyup[Ctrl+m]' : 'showAll'
    },

    hideAll : function(e) {
      e.stopPropagation();
      this.$el.fadeOut();
    },
    showAll : function(e) {
      e.stopPropagation();
      this.$el.children().fadeIn();
      this.$el.fadeIn();
    },
    hideOne: function(e) {
      e.stopPropagation();
      this.$('#one').fadeToggle();
    },
    showOne: function(e) {
      e.stopPropagation();
      this.$('#one').fadeToggle();
    },
    toggleTwo: function(e) {
      e.stopPropagation();
      this.$('#two').fadeToggle();
    },
    toggleThree: function(e) {
      e.stopPropagation();
      this.$('#three').fadeToggle();
    }

  });

  var example_view = new App.ExampleView();
});

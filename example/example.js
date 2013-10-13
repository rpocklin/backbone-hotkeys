$(function() {

  App = {};

  App.ExampleView = Backbone.View.extend({
    el: '#example_container',

    events: {
      'keydown[esc] body': 'hideAll',
      'keyup[Alt+h] body': 'toggleOne',
      'keyup[Alt+j] body': 'toggleTwo',
      'keyup[Alt+k] body': 'toggleThree',
      'keyup[Ctrl+m] body' : 'showAll'
    },

    hideAll : function(e) {
      this.$el.fadeOut();
    },
    showAll : function() {
      this.$el.children().fadeIn();
      this.$el.fadeIn();
    },
    toggleOne: function() {
      this.$el.find('#one').fadeToggle();
    },
    toggleTwo: function() {
      this.$el.find('#two').fadeToggle();
    },
    toggleThree: function() {
      this.$el.find('#three').fadeToggle();
    },
    initialize: function() {
      _.bindAll(this);
      return this;
    }
  });

  var example_view = new App.ExampleView();
  console.log('ex: %o', example_view);
});

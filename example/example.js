$(function() {

  App = {};

  App.ExampleView = Backbone.View.extend({
    el:$('#example_container'),

    events:{
      'keydown[esc] body': 'hideAll',
      'keyup[Alt+h] body': 'toggleOne',
      'keyup[Alt+j] body': 'toggleTwo',
      'keyup[Alt+k] body': 'toggleThree',
      'keyup[Ctrl+m] body' : 'showAll'
    },
    hideAll : function() {
      $(this.el).hide();
    },
    showAll : function() {
      $(this.el).children().show();
      $(this.el).show();
    },
    toggleOne: function() {
      $(this.el).find('#one').toggle();
    },
    toggleTwo: function() {
      $(this.el).find('#two').toggle();
    },
    toggleThree: function() {
      $(this.el).find('#three').toggle();
    },
    initialize: function() {
      _.bindAll(this);
      return this;
    }
  });

  var example_view = new App.ExampleView();
});

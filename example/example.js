'use strict';

$(function() {

  var App = {};

  App.ChildView = Backbone.View.extend({
    el: '#subview_container',
    template: '<span id="subview">Sub View is rendered.</span>',

    events: {
      'keyup[Alt+2] #subview': 'random_subview',
      'keyup[Alt+3]'         : 'global_random'
    },
    random_subview: function(e) {
      var random_number = Math.random() * 100;
      console.log('random number generated:' + random_number);
    },
    global_random: function(e) {
      var random_number = Math.random() * 100;
      console.log('global random number generated:' + random_number);
    },

    render: function() {
      this.$el.html(this.template);
      return this;
    }



  });

  App.ExampleView = Backbone.View.extend({
    el: '#example_container',

    events: {
      'keyup[Alt+h] #one:visible'      : 'hideOne',
      'keyup[Alt+o] #one:not(:visible)': 'showOne',
      'keyup[Alt+j]'  : 'toggleTwo',
      'keyup[Alt+k]'  : 'toggleThree',
      'keyup[esc]'    : 'hideAll',
      'keyup[Ctrl+m]' : 'showAll',
      'keyup[Alt+1]'  : 'createView',
      'keyup[Alt+4]'  : 'removeView'
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
    },
    createView: function(e) {
      e.stopPropagation();
      this.view = new App.ChildView();
      this.view.render();
    },
    removeView: function(e) {
      e.stopPropagation();
      if (this.view) {
        this.view.remove();
        this.view = null;
      }
    }
  });

  var example_view = new App.ExampleView();
});

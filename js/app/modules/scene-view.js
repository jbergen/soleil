define([
  "app"
],

function( app ) {

  return Backbone.View.extend({

    error: 1,
    template: 'scene',
    
    serialize: function() {
      return this.model.toJSON();
    },

    events: {
      "click a": "goToScene"
    },

    goToScene: function() {
      this.model.collection.playScene( this.model );
    }
    
  })

});

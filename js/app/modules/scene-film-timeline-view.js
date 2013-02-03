define([
  "app"
],

function( app ) {

  return Backbone.View.extend({

    tagName: "li",
    template: "scene-timeline-view",

    initialize: function() {
      app.soleil.on("timeupdate", function() {
        if ( !app.soleil.paused() ) {
          this.onTimeupdate();
        }
      }.bind( this ));
    },

    serialize: function() {
      return this.model.toJSON();
    },

    onTimeupdate: function() {
      var currentTime = app.soleil.currentTime();

      this.$(".scene-elapsed").css({
        width: currentTime <= this.model.get("cueIn") ? "0%" :
                currentTime > this.model.get("cueOut") ? "100%" :
                ( currentTime - this.model.get("cueIn") ) / this.model.get("duration") * 100 +"%"
      });
    },

    events: {
      "click .go-to-scene": "goToScene"
    },

    goToScene: function() {
      this.model.collection.playScene( this.model );
    }

  });

});

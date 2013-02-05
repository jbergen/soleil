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

      this.model.on("mouseenter", this.onRemoteEnter, this );
      this.model.on("mouseleave", this.onRemoteLeave, this );
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
      "click .go-to-scene": "goToScene",
      "mouseenter": "onMouseenter",
      "mouseleave": "onMouseleave"
    },

    goToScene: function() {
      this.model.collection.playScene( this.model );
    },

    onMouseenter: function() {
      this.model.trigger("mouseenter");
    },

    onMouseleave: function() {
      this.model.trigger("mouseleave");
    },

    onRemoteLeave: function() {
      this.$el.removeClass("hover");
      this.$(".scene-elapsed").removeClass("hover");
    },
    onRemoteEnter: function() {
      this.$el.addClass("hover");
      this.$(".scene-elapsed").addClass("hover");
    }

  });

});

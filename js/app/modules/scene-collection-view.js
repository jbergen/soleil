define([
  "app"
],

function( app ) {

  var SceneView = Backbone.View.extend({

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

  return Backbone.View.extend({

    template: "collection-timeline",

    initialize: function() {
      console.log("sc", this);
      this.insertScenes();
    },
    
    insertScenes: function() {
      this.collection.each(function( scene ) {
        var sceneView = new SceneView({
          model: scene,
          attributes: {
            style: "width: -webkit-calc(" + scene.get("collectionPercent") * 100 +"% - 1px )"
          }
        });

        this.insertView( "ul", sceneView );
      }, this );
    }

    
  })

});

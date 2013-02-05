define([
  "app",
  "modules/scene-collection-timeline-view",
  "modules/scene-film-timeline-view"
],

function( app, SceneCollectionView, SceneFilmView ) {

  return Backbone.View.extend({

    filmDuration: 5967.562,
    template: "collection-timeline",

    initialize: function() {
      this.insertScenes();
    },
    
    insertScenes: function() {
      this.collection.each(function( scene ) {

        this.insertCollectionScenes( scene );
        this.insertFilmScenes( scene );
        
      }, this );

    },

    insertCollectionScenes: function( scene ) {
      var sceneView = new SceneCollectionView({
          model: scene,
          attributes: {
            style: "width:" + scene.get("collectionPercent") * 100 +"%;"
          }
        });

        this.insertView( ".collection-timeline .timeline-list", sceneView );
    },

    insertFilmScenes: function( scene ) {
      var sceneView, width;

      width = scene.get("duration") / this.filmDuration * 100 < 0.2 ? 0.2 : scene.get("duration") / this.filmDuration * 100;
      sceneView = new SceneFilmView({
          model: scene,
          attributes: {
            style: "width:" + width +"%;"+
                    "left:" + scene.get("cueIn") / this.filmDuration * 100 + "%"
          }
        });

        this.insertView( ".film-timeline .timeline-list", sceneView );
    },

    afterRender: function() {
      this.updateTimestampDurations();
      app.soleil.on("timeupdate", function() {
        this.updateElapsed();
      }.bind( this ));
    },

    updateTimestampDurations: function() {
      this.$(".film-timestamp .time-duration").html( this.toHMS( this.filmDuration ) );
      this.$(".collection-timestamp .time-duration").html( this.toHMS( this.collection.duration ) );
    },

    updateElapsed: function() {
      var elapsed = 0;

      this.$(".film-timestamp .time-elapsed").html( this.toHMS( app.soleil.currentTime() ) );

      this.collection.each(function( scene, i ) {
        if ( i > this.collection.index ) {
          return false;
        } else if ( i < this.collection.index ) {
          elapsed += scene.get("duration")
        } else if ( i == this.collection.index ) {
          elapsed += app.soleil.currentTime() - scene.get("cueIn");
        }
      }, this );
      this.$(".collection-timestamp .time-elapsed").html( this.toHMS( elapsed ) );

    },

    toHMS: function( sec ) {
      var h,m,s;

      h = parseInt( sec / 3600, 10 );
      m = parseInt( ( sec / 60 ) % 60, 10 );
      s = parseInt( sec % 60, 10 );
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;

      return h +":"+ m +":"+ s;
    }

    
  })

});

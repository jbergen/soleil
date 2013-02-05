/*

TODO

determine collection duration in initialize
render collection as timeline
  colleciton timeline
  film timeline

*/
define([
  "app",
  "modules/scene-view",
  "modules/scene-model",
  "modules/film-timeline-view"
],

function( app, SceneView, SceneModel, FilmTimeline ) {

  return Backbone.Collection.extend({

    scene: null,
    query: "tokyo",
    duration: 0,
    index: 0,
    previous: null,
    cueNext: null,
    model: SceneModel,

    url: function() {
      return "?json=get_tag_posts&tag_slug="+ this.query +"&custom_fields=zoom,lat,lng,location,cueIn,cueOut,info,notes,sound,temporalContext";
      // return "?json=get_tag_posts&tag_slug=test1&custom_fields=zoom,lat,lng,location,cueIn,cueOut,info,notes,sound,temporalContext";
      // return "?json=get_search_results&search=" + this.query + "&custom_fields=zoom,lat,lng,location,cueIn,cueOut,info,notes,sound,temporalContext";
    },

    parse: function( response ) {
      return response.posts;
    },

    render: function() {
      this.each(function( scene ) {
        scene.setCollectionPercent();
      });
    },

    setCollectionDuration: function() {
      var duration = 0;

      this.each(function( scene ) {
        duration += scene.get("duration");
      });
      this.duration = duration;
    },

    comparator: function( scene ) {
      return scene.get("custom_fields").cueIn[0];
    },

    _listen: function() {
      app.soleil.on("timeupdate", function( e ) {
        this.onTimeUpdate( e );
      }.bind( this ));
    },

    play: function() {
      if ( !app.initialized ) {
        this._listen();
        // autoplay junk
        app.soleil.on("canplaythrough", function() {
          _.delay(function() {
            app.soleil.play();
            this.goToScene( this.index );
          }.bind( this ), 1000 );
        }.bind( this ));
        app.initialized = true;
      } else {
        this.goToScene( this.index );
      }
    },

    playScene: function( scene ) {
      this.previous = this.index;
      this.index = this.indexOf( scene );
      this.goToScene( this.index );
    },

    goToScene: function( index ) {
      var adjacent;

      if ( this.scene ) {
        this.scene.deactivate();
      }

      if ( index < this.length ) {
        this.scene = this.at( index );
        adjacent = index > 0 && this.scene.get("cueIn") == this.at( this.previous ).get("cueOut");

        this.scene.activate();

        this.cueNext = this.length > index ? this.scene.get("cueOut") : null;
        if ( this.cueNext !== null && !adjacent ) {
          app.soleil.currentTime( this.scene.get("cueIn") );
          app.soleil.play();
        }
      } else {
        app.soleil.pause();
        this.index = 0;
      }
    },

    onTimeUpdate: function( e ) {
      if ( !app.soleil.paused() ) {
        var currentTime = app.soleil.currentTime();
        
        if ( currentTime >= this.cueNext ) {
          this.previous = this.index;
          ++this.index;
          this.goToScene( this.index );
        }
      }
    }

  })

});

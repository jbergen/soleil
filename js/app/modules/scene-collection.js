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

    duration: 0,
    index: 0,
    cueNext: null,
    model: SceneModel,

    url: function() {
      return "?json=get_tag_posts&tag_slug=test1&custom_fields=cueIn,cueOut,info,notes,sound,temporalContext";
      return "?json=get_recent_posts&order=ASC&custom_fields=cueIn,cueOut,info,notes,sound,temporalContext";
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

      console.log(this.duration);
    },

    comparator: function( scene ) {
      return scene.get("custom_fields").cueIn[0];
    },

    initialize: function() {
      var _initPlay = function() {
        this._listen();
        // autoplay junk
        app.soleil.on("canplaythrough", function() {
          _.delay(function() {
            app.soleil.play();
            this.goToScene( this.index );
          }.bind( this ), 1000 );
        }.bind( this ));
      }

      this.initPlay = _.once( _initPlay );
    },

    _listen: function() {
      app.soleil.on("timeupdate", function( e ) {
        this.onTimeUpdate( e );
      }.bind( this ));
    },

    play: function() {
      this.initPlay();
    },

    playScene: function( scene ) {
      this.index = this.indexOf( scene );
      this.goToScene( this.index );
    },

    goToScene: function( index ) {
      var scene = this.at( index );

      this.cueNext = this.length > index ? scene.get("cueOut") : null;

      if ( this.cueNext !== null ) {
        app.soleil.currentTime( scene.get("cueIn") );
        app.soleil.play();
      } else {
        // pause if the collection ends
        app.soleil.pause();
        this.index = 0;
      }
    },

    onTimeUpdate: function( e ) {
      if ( !app.soleil.paused() ) {
        var currentTime = app.soleil.currentTime();
        
        if ( currentTime >= this.cueNext ) {
          ++this.index;
          this.goToScene( this.index );
        }
      }
    }

  })

});

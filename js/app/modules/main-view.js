define([
  "app",

  // Modules
  "modules/scene-collection",
  "modules/scene-view",
  "modules/scene-collection-view",

  "libs/popcorn-complete"
],

function( app, SceneCollection, SceneView, ScenesTimeline ) {

  return Backbone.View.extend({

    template: "main",

    videos: [
      {
        url: "http://www.youtube.com/watch?v=RbRso7bLJ30",
        cueIn: 0,
        cueOut: 897
      },
      {
        url: "http://www.youtube.com/watch?v=OXDYTBo3VgA",
        cueIn: 897,
        cueOut: 1790
      },
      {
        url: "http://www.youtube.com/watch?v=_ezGu3FBhTg",
        cueIn: 1790,
        cueOut: 2654
      },
      {
        url: "http://www.youtube.com/watch?v=v8RUC55WIu4",
        cueIn: 2654,
        cueOut: 3550
      },
      {
        url: "http://www.youtube.com/watch?v=AW6Md3w8BO0",
        cueIn: 3550,
        cueOut: 4447
      },
      {
        url: "http://www.youtube.com/watch?v=GYTl_SrSMi0",
        cueIn: 4447,
        cueOut: 5344
      },
      {
        url: "http://www.youtube.com/watch?v=6Op4tSQJJug",
        cueIn: 5344,
        cueOut: 5783
      },
    ],

    initialize: function() {
      this.scenes = new SceneCollection();
    },

    afterRender: function() {
      this.scenes.fetch().success(function() {
        this.scenes.setCollectionDuration();
        this.onScenesLoad();
      }.bind( this ));

      this.initPlayer();
    },

    onScenesLoad: function() {
      console.log(this.scenes);
      this.scenes.render();

      this.scenesTimeline = new ScenesTimeline({ collection: this.scenes });
      this.$("#scene-timeline").html( this.scenesTimeline.el );
      this.scenesTimeline.render();

    },

    initPlayer: function() {
      app.soleil = Popcorn.youtube(
        "#vid",
        "http://www.youtube.com/watch?v=RbRso7bLJ30" );

      this.scenes.play();
    }

  });

});

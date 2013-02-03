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

    initialize: function() {
      this.scenes = new SceneCollection();
    },

    afterRender: function() {
      this.initMap();
    },

    onSearch: function( query ) {
      this.scenes.query = query;
      this.scenes.index = 0;
      this.scenes.fetch().success(function() {
        this.scenes.setCollectionDuration();
        this.onScenesLoad();
      }.bind( this ));
    },

    onScenesLoad: function() {
      this.initPlayer();

      this.scenes.render();
      this.scenesTimeline = new ScenesTimeline({ collection: this.scenes });
      this.$("#scene-timeline").html( this.scenesTimeline.el );
      this.scenesTimeline.render();

    },

    events: {
      "keypress .search": "onSearchKeypress",
      "click .search-icon": "onClickSearch"
    },

    onClickSearch: function() {
      this.$(".search").focus();
    },

    onSearchKeypress: function( e ) {
      if ( e.which == 13 ) {
        this.onSearch( this.$(".search").val() );
        this.$(".search").blur();
      }
    },

    initPlayer: function() {
      if ( !app.soleil ) {
        app.soleil = Popcorn.youtube(
          "#vid",
          "http://www.youtube.com/watch?v=3OlOsfa4Ol4" );
      }

      this.scenes.play();
    },

    initMap: function() {
      var mapOptions = {
        center: new google.maps.LatLng( 0, 0 ),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };
      app.geocoder = geocoder = new google.maps.Geocoder();
      app.map = new google.maps.Map( this.$("#map")[0], mapOptions);
    }

  });

});

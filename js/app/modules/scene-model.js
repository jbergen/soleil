define([
  "app"
],

function( app ) {

  return Backbone.Model.extend({

    // offset to correct btwn dvd and YT timestamps
    offset: -26,

    initialize: function() {
      var cueIn, cueOut;

      cueIn = this.toSeconds( this.get("custom_fields").cueIn[0] ) + this.offset;
      cueOut = this.toSeconds( this.get("custom_fields").cueOut[0] ) + this.offset;

      this.set({
        cueIn: cueIn,
        cueOut: cueOut,
        duration: cueOut - cueIn
      });

    },

    setCollectionPercent: function() {
      this.set("collectionPercent", this.get("duration") / this.collection.duration );
    },

    toSeconds: function( hms ) {
      var a = hms.split(':');

      return seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    },

    activate: function() {
      this.updateTitle();
      this.updateMap();
      this.updateCaption();
      app.soleil.on("timeupdate", function() {
        this.updateTimestamp();
      }.bind( this ));
    },

    deactivate: function() {
      // console.log('deactivate scene:', this.id)
      // app.soleil.off("timeupdate", function() {
      //   this.updateTimestamp();
      // }.bind( this ));
    },

    updateTitle: function() {
      $(".scene-title .title").html( this.get("title"));
      $(".scene-title .time-duration").html( this.toHMS( this.get("duration") )); 
    },

    updateTimestamp: function() {
      var t = app.soleil.currentTime() - this.get("cueIn");

      $(".scene-title .time-elapsed").html( this.toHMS( t ) );
    },

    updateCaption: function() {
      $("#captions").html( this.get("content") );
    },

    updateMap: function() {
      if ( this.get("custom_fields").lat && this.get('custom_fields').lat[0].length ) {
        var pos = new google.maps.LatLng( this.get('custom_fields').lat[0], this.get('custom_fields').lng[0] );
        
        app.map.setCenter( pos );
        app.map.setZoom( parseInt( this.get('custom_fields').zoom[0], 10 ) || 9 );
        $("#map").addClass("active");
      } else if ( this.get('custom_fields').location && this.get('custom_fields').location[0].length ) {
        var address = this.get('custom_fields').location[0];

        geocoder.geocode( { 'address': address}, function( results, status ) {
         if ( status == google.maps.GeocoderStatus.OK ) {
            app.map.setCenter(results[0].geometry.location);
            app.map.setZoom( parseInt( this.get('custom_fields').zoom[0], 10 ) || 9 );
            $("#map").addClass("active");
          } else {
            // alert('Geocode was not successful for the following reason: ' + status);
          }
        }.bind( this ));
      } else {
        $("#map").removeClass("active");
      }
    },

    toHMS: function( sec ) {
      var h,m,s;

      h = parseInt( sec / 3600, 10 );
      m = parseInt( sec / 60, 10 );
      s = parseInt( sec % 60, 10 );
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;

      return h +":"+ m +":"+ s;
    }

  })

});

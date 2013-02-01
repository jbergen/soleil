define([
  "app"
],

function( app ) {

  return Backbone.Model.extend({

    // offset to correct btwn dvd and YT timestamps
    offset: -32,

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
    }

  })

});

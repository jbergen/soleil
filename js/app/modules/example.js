define([
  "app"

  // Libs

  // Modules

  // Plugins
],

function(app) {

  // Create a new module
  var Example = app.module();

  // This will fetch the tutorial template and render it.
  Example.Views.Tutorial = Backbone.View.extend({

    tagName: 'ol',

    initialize: function() {
      this.postCollection = new PostCollection();
      this.postCollection.fetch().success(function() {
        this.onPostsLoad();
      }.bind( this ));
    },

    onPostsLoad: function() {
      this.postCollection.each(function( post ) {
        this.insertView( new PostView({ model: post }) );
      }.bind( this ));
      this.render();
    }

  });

  var PostCollection = Backbone.Collection.extend({

    url: function() {
      return "?json=get_recent_posts"
    },

    parse: function( response ) {
      return response.posts;
    }

  })

  var PostView = Backbone.View.extend({

    template: 'post',
    
    serialize: function() {
      return this.model.toJSON();
    }
    
  })

  // Required, return the module for AMD compliance
  return Example;

});

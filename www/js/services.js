angular.module('starter.services', [])

.factory('Posts', function() {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return posts;
    },
    remove: function(post) {
      posts.splice(posts.indexOf(evento), 1);
    },
    get: function(postId) {
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].id === parseInt(postId)) {
          return posts[i];
        }
      }
      return null;
    }
  };
})


.factory('Eventos', function() {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return eventos;
    },
    remove: function(evento) {
      eventos.splice(eventos.indexOf(evento), 1);
    },
    get: function(eventoId) {
      for (var i = 0; i < eventos.length; i++) {
        if (eventos[i].id === parseInt(eventoId)) {
          return eventos[i];
        }
      }
      return null;
    }
  };
});

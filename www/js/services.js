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
})

.factory('StorageService', function ($localStorage) {

  $localStorage = $localStorage.$default({
    eventosFavoritos: [],
    postsFavoritos: []
  });

  var _getEventosFavoritos = function () {
    return $localStorage.eventosFavoritos;
  };
  var _addEvento = function (thing) {
    $localStorage.eventosFavoritos.push(thing);
  }
  var _removeEvento = function (thing) {
    $localStorage.eventosFavoritos.splice($localStorage.eventosFavoritos.indexOf(thing), 1);
  }

  var _getPostsFavoritos = function () {
    return $localStorage.postsFavoritos;
  };
  var _addPost = function (thing) {
    $localStorage.postsFavoritos.push(thing);
  }
  var _removePost = function (thing) {
    $localStorage.postsFavoritos.splice($localStorage.postsFavoritos.indexOf(thing), 1);
  }

  var _clear = function() {
    $localStorage.$reset();
  }
  
  return {
      getEventosFavoritos: _getEventosFavoritos,
      addEvento: _addEvento,
      removeEvento: _removeEvento,
      getPostsFavoritos: _getPostsFavoritos,
      addPost: _addPost,
      removePost: _removePost,
      clear: _clear
    };
  });

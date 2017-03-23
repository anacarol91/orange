angular.module('starter.controllers', [])

.controller('PostsCtrl', function($scope, $http, Posts, $ionicLoading) {
  $scope.$on('$ionicView.loaded', function(e) {

    console.log("Enter PostsCtrl");
    $ionicLoading.show();
    
    $scope.getPosts();
    
  });

  $scope.getPosts = function () {
    var postsApi = 'http://marketingpordados.com/wp-json/wp/v2/posts';

    $http.get( postsApi ).
      success(function(data, status, headers, config) {
        $ionicLoading.hide();
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        $ionicLoading.hide();
        console.log( 'Post load error.' );
      });

    $scope.$broadcast('scroll.refreshComplete');
  }
})


.controller('PostCtrl', function($scope, $stateParams, $sce, $http, $ionicLoading, $timeout, $ionicNavBarDelegate ) {

  // we get the postID from $stateParams.postId, the query the api for that post
  var singlePostApi = 'http://marketingpordados.com/wp-json/wp/v2/posts/' + $stateParams.postId;

  $scope.$on('$ionicView.enter', function() {
      $ionicLoading.show();

      $timeout(function() {
          $ionicNavBarDelegate.align('left');
      });

      $http.get( singlePostApi ).
        success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $scope.post = data;
          console.log( data );

        }).
        error(function(data, status, headers, config) {
          $ionicLoading.hide();
          console.log( 'Single post load error.' );
        });
  });  

})


.controller('EventosCtrl', function($scope, $ionicLoading, $http, Eventos, StorageService) {
  $scope.$on('$ionicView.loaded', function(e) {

    console.log("Enter EventosCtrl");   
    $ionicLoading.show();

    /* LIMPA LOCAL STORAGE */
    //StorageService.clear(); 

    $scope.favoritado = false;

    $scope.getEventos();
    
  });


  $scope.getEventos = function () {
    var eventosApi = 'http://marketingpordados.com/wp-json/acf/v2/evento';

    $http.get( eventosApi ).
      success(function(data, status, headers, config) {
        $ionicLoading.hide();

        var favoritos = StorageService.getAll();

        $scope.eventos = $scope.setFavoritos(data, favoritos);

        console.log('request done: ' + data );
      }).
      error(function(data, status, headers, config) {
        $ionicLoading.hide();
        console.log( 'Eventos load error.' );
      });

    $scope.$broadcast('scroll.refreshComplete');
  }


  $scope.setFavoritos = function (eventos, favoritos) {

    if(favoritos) {
      for(var i = 0; i < eventos.length; i++) {
        eventos[i].favoritado = false;   
      }

      for(var i = 0; i < eventos.length; i++) {
        for(var j = 0; j < favoritos.length; j++) {
          if(eventos[i].id ===  favoritos[j].id) {
            eventos[i].favoritado = true;
          }
        }      
      }
    }
    return eventos;
  }


  /* FAVORITOS */
  $scope.addEvento = function (evento) {
    console.log('EVENTO favoritado');
    evento.favoritado = true;
    StorageService.add(evento);
  };

  $scope.removeEvento = function (evento) {
    console.log('EVENTO desfavoritado');
    evento.favoritado = false;
    StorageService.remove(evento);
  };

  $scope.favoritar = function(click, evento) {
    click.preventDefault(); 
    click.stopPropagation();

    if(evento.favoritado) {
      $scope.removeEvento(evento);
    } else {
        $scope.addEvento(evento);
    }
  }

})

.controller('EventoCtrl', function($scope, $stateParams, $http, $ionicLoading, $timeout, $ionicNavBarDelegate) {
  // we get the postID from $stateParams.postId, the query the api for that post
  var singleEventoApi = 'http://marketingpordados.com/wp-json/acf/v2/evento/' + $stateParams.eventoId;

  $scope.$on('$ionicView.enter', function() {
      $ionicLoading.show();

      $timeout(function() {
          $ionicNavBarDelegate.align('left');
      });

      $http.get( singleEventoApi ).
        success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $scope.evento = data;
          console.log( data );

        }).
        error(function(data, status, headers, config) {
          $ionicLoading.hide();
          console.log( 'Single event load error.' );
        });

  });  
})

.controller('FavoritosCtrl', function($scope, $state, StorageService) {

  $scope.$on('$ionicView.enter', function() {
    
    $scope.getFavoritos();

    console.log($scope.favoritos);
  })  

  $scope.getFavoritos = function() {
    $scope.favoritos = StorageService.getAll();

    // if($scope.favoritos) {
    //   for(var i = 0; i < $scope.favoritos.length; i++) {
    //    $scope.favoritos[i].favoritado = true;
    //   }
    // }

    console.log('request done');
    $scope.$broadcast('scroll.refreshComplete');
  }
})


.controller('DashCtrl', function($scope, $state, $ionicPush) {

  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
   // alert(msg.title + ': ' + msg.text);
  });

  // $scope.share = function() {
  //   $cordovaSocialSharing
  //     .share("message", 'subject', 'file', 'link') // Share via native share sheet
  //     .then(function(result) {
  //       console.log('compartilhado');
  //     }, function(err) {
  //       console.log('erro');
  //       // An error occured. Show a message to the user
  //     });
  // }  

  $scope.eventos = function() {
    $state.go('tab.eventos');
  }

  $scope.blog = function() {
    $state.go('tab.blog');
  }
})
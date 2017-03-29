angular.module('starter.controllers', [])

.controller('PostsCtrl', function($scope, $http, Posts, $ionicLoading, StorageService) {
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

        var favoritos = StorageService.getPostsFavoritos();

        $scope.posts = utils.setFavoritos(data, favoritos);
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        $ionicLoading.hide();
        console.log( 'Post load error.' );
      });

    $scope.$broadcast('scroll.refreshComplete');
  }
})


.controller('PostCtrl', function($scope, $stateParams, $sce, $http, $ionicLoading, $timeout, $ionicNavBarDelegate,StorageService) {

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

          var favoritos = StorageService.getPostsFavoritos();

          $scope.post = utils.setFavorito(data, favoritos);
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

    $scope.getEventos();
    
  });


  $scope.getEventos = function () {
    var eventosApi = 'http://marketingpordados.com/wp-json/acf/v2/evento';

    $http.get( eventosApi ).
      success(function(data, status, headers, config) {
        $ionicLoading.hide();

        var favoritos = StorageService.getEventosFavoritos();

        $scope.eventos = utils.setFavoritos(data, favoritos);

        console.log(data );
      }).
      error(function(data, status, headers, config) {
        $ionicLoading.hide();
        console.log( 'Eventos load error.' );
      });

    $scope.$broadcast('scroll.refreshComplete');
  }

})

.controller('EventoCtrl', function($scope, $stateParams, $http, $ionicLoading, $timeout, $ionicNavBarDelegate, StorageService) {
  

  $scope.$on('$ionicView.enter', function() {     

      $timeout(function() {
          $ionicNavBarDelegate.align('left');
      });

  });  

  $scope.$on('$ionicView.loaded', function() {     

    $ionicLoading.show();
    $scope.getEvento();

  }); 

  $scope.getEvento = function() {    

    // we get the postID from $stateParams.postId, the query the api for that post
    var singleEventoApi = 'http://marketingpordados.com/wp-json/acf/v2/evento/' + $stateParams.eventoId;

    $http.get( singleEventoApi ).
      success(function(data, status, headers, config) {
        $ionicLoading.hide();

        var favoritos = StorageService.getEventosFavoritos();

        data.acf.id = parseInt($stateParams.eventoId);
        $scope.evento = utils.setFavorito(data.acf, favoritos);

        console.log(data );

      }).
      error(function(data, status, headers, config) {
        $ionicLoading.hide();
        console.log( 'Single event load error.' );
      });
  }
})

.controller('FavoritosCtrl', function($scope, $state, StorageService) {

  $scope.$on('$ionicView.enter', function() {
    
    $scope.getFavoritos();

   // console.log($scope.favoritos);
  })  

  $scope.getFavoritos = function() {

    $scope.eventosFavoritos = StorageService.getEventosFavoritos();
    $scope.postsFavoritos = StorageService.getPostsFavoritos();

    // if($scope.favoritos) {
    //   for(var i = 0; i < $scope.favoritos.length; i++) {
    //    $scope.favoritos[i].favoritado = true;
    //   }
    // }

    console.log('request done');
    $scope.$broadcast('scroll.refreshComplete');
  }
})


.controller('DashCtrl', function($scope, $state, $ionicPush, StorageService) {

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

  /* EVENTOS FAVORITOS */
  $scope.addEvento = function (item) {
    console.log('EVENTO favoritado');
    item.favoritado = true;
    StorageService.addEvento(item);
  };

  $scope.removeEvento = function (item) {
    console.log('EVENTO desfavoritado');
    item.favoritado = false;
    StorageService.removeEvento(item);
  };

  $scope.favoritarEvento = function(click, item) {
    click.preventDefault(); 
    click.stopPropagation();

    if(item.favoritado) {
      $scope.removeEvento(item);
    } else {
        $scope.addEvento(item);
    }
  }

  /* POSTS FAVORITOS */
  $scope.addPost = function (item) {
    console.log('POST favoritado');
    item.favoritado = true;
    StorageService.addPost(item);
  };

  $scope.removePost = function (item) {
    console.log('POST desfavoritado');
    item.favoritado = false;
    StorageService.removePost(item);
  };

  $scope.favoritarPost = function(click, item) {
    click.preventDefault(); 
    click.stopPropagation();

    if(item.favoritado) {
      $scope.removePost(item);
    } else {
        $scope.addPost(item);
    }
  }
})
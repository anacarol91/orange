angular.module('starter.controllers', [])

.controller('PostsCtrl', function($scope, $http, Posts, $ionicLoading) {
  $scope.$on('$ionicView.enter', function(e) {

    $ionicLoading.show();
    // You can change this url to experiment with other endpoints
    var postsApi = 'http://marketingpordados.com/wp-json/wp/v2/posts';

    console.log("Enter PostsCtrl");
    

    // This should go in a service so we can reuse it
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
  });

  $scope.refreshPosts = function () {
    var postsApi = 'http://marketingpordados.com/wp-json/wp/v2/posts';

    $http.get( postsApi ).
      success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );

        $ionicLoading.hide();
      }).
      error(function(data, status, headers, config) {
        console.log( 'Post load error.' );
        $ionicLoading.hide();
      });

    $scope.$broadcast('scroll.refreshComplete');
  }
})


.controller('PostCtrl', function($scope, $stateParams, $sce, $http ) {

  // we get the postID from $stateParams.postId, the query the api for that post
  var singlePostApi = 'http://marketingpordados.com/wp-json/wp/v2/posts/' + $stateParams.postId;

  $http.get( singlePostApi ).
    success(function(data, status, headers, config) {
      $scope.post = data;
      console.log( data );

      // must use trustAsHtml to get raw HTML from WordPress
     // $scope.content = $sce.trustAsHtml(data.content);

    }).
    error(function(data, status, headers, config) {
      console.log( 'Single post load error.' );
    });

})


.controller('EventosCtrl', function($scope, $ionicLoading, $http, Eventos) {
  $scope.$on('$ionicView.enter', function(e) {

    // You can change this url to experiment with other endpoints
    var eventosApi = 'http://marketingpordados.com/wp-json/acf/v2/evento';

    console.log("Enter EventosCtrl");

    $ionicLoading.show();

    // This should go in a service so we can reuse it
    $http.get( eventosApi ).
      success(function(data, status, headers, config) {
        $scope.eventos = data;
        console.log( data );

        $ionicLoading.hide();
      }).
      error(function(data, status, headers, config) {
        console.log( 'Eventos load error.' );
        $ionicLoading.hide();
      });
  });

  $scope.refreshEventos = function () {
    var eventosApi = 'http://marketingpordados.com/wp-json/acf/v2/evento';

    $ionicLoading.show();

    // This should go in a service so we can reuse it
    $http.get( eventosApi ).
      success(function(data, status, headers, config) {
        $scope.eventos = data;
        console.log( data );

        $ionicLoading.hide();
      }).
      error(function(data, status, headers, config) {
        console.log( 'Eventos load error.' );
        $ionicLoading.hide();
      });

    $scope.$broadcast('scroll.refreshComplete');
  }



  })

.controller('EventoCtrl', function($scope, $stateParams, $http) {
  // we get the postID from $stateParams.postId, the query the api for that post
  var singleEventoApi = 'http://marketingpordados.com/wp-json/acf/v2/evento/' + $stateParams.eventoId;

  $http.get( singleEventoApi ).
    success(function(data, status, headers, config) {
      $scope.evento = data;
      console.log( data );

      // must use trustAsHtml to get raw HTML from WordPress
     // $scope.content = $sce.trustAsHtml(data.content);

    }).
    error(function(data, status, headers, config) {
      console.log( 'Single event load error.' );
    });
})


.controller('DashCtrl', function($scope, $state) {

  $scope.eventos = function() {
    $state.go('tab.eventos');
  }

  $scope.blog = function() {
    $state.go('tab.blog');
  }
})
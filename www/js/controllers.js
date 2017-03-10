angular.module('starter.controllers', [])

.controller('PostsCtrl', function($scope, $http, Posts, $ionicLoading) {
  $scope.$on('$ionicView.enter', function(e) {

    // You can change this url to experiment with other endpoints
    var postsApi = 'http://marketingpordados.com/wp-json/wp/v2/posts';
    console.log("Enter PostsCtrl");

    $ionicLoading.show();
    
   
    // This should go in a service so we can reuse it
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


.controller('EventosCtrl', function($scope, Eventos) {
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.eventos = Eventos.all();
})

.controller('EventoCtrl', function($scope, $stateParams, Evento) {
  $scope.evento = Eventos.get($stateParams.eventoId);
})


.controller('DashCtrl', function($scope) {})
.controller('SobreCtrl', function($scope) {})

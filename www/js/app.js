// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      if (ionic.Platform.isAndroid()) {
        StatusBar.backgroundColorByHexString("#ccc");
        //StatusBar.styleDefault();
        //StatusBar.overlaysWebView(true);
      } else {
        StatusBar.styleDefault();
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider, $ionicConfigProvider) {

  $compileProvider.imgSrcSanitizationWhitelist('img/'); // necessario para imagens
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|img):/);
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel):/);

  /* Platform related config */
  $ionicConfigProvider.scrolling.jsScrolling(true);
  $ionicConfigProvider.tabs.style('standard');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.navBar.positionPrimaryButtons('right');
  $ionicConfigProvider.views.swipeBackEnabled(true);
  $ionicConfigProvider.backButton.icon('ion-android-arrow-back');
  $ionicConfigProvider.backButton.text(false);
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.form.toggle('small');
  //$ionicConfigProvider.form.checkbox('');
  $ionicConfigProvider.spinner.icon('crescent');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.blog', {
      url: '/blog',
      views: {
        'tab-blog': {
          templateUrl: 'templates/tab-blog.html',
          controller: 'PostsCtrl'
        }
      }
    })
    .state('tab.post-detail', {
      url: '/blog/:postId',
      views: {
        'tab-blog': {
          templateUrl: 'templates/post-detail.html',
          controller: 'PostCtrl'
        }
      }
    })

    .state('tab.eventos', {
      url: '/eventos',
      views: {
        'tab-eventos': {
          templateUrl: 'templates/tab-eventos.html',
          controller: 'EventosCtrl'
        }
      }
    })
    .state('tab.evento-detail', {
      url: '/eventos/:eventoId',
      views: {
        'tab-eventos': {
          templateUrl: 'templates/evento-detail.html',
          controller: 'EventoCtrl'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

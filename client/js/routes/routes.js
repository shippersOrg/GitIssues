app.config(function($stateProvider, $urlRouterProvider) {
//routes for different states in the app
$stateProvider
 .state('search', {
      url: '/search',
      templateUrl: '/html/search.html',
      controller: 'SearchCtrl'
    })
  .state('issues', {
      url: '/issues',
      templateUrl: '/html/issues.html',
      controller: 'IssuesCtrl'
    });

$urlRouterProvider.otherwise('/search');

});
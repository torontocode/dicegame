/* jshint -W097 */
'use strict';
console.log('app.js');
console.log('good.!');
var dice = angular.module('diceApp',['ui.router']);
dice.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');


  $stateProvider
    .state('play', {
      url: "/play",
      templateUrl: "partials/play.html"
    })
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    });
});
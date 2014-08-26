"use restrict"
# generate progress bar
angular.module 'click-jump.directive',[]
.directive 'clickJump', [
  ->
    restrict: 'A'
    scope:
      clickJump: '@'
    link: ($scope, $elm)->
      $elm.on 'click', ->
        window.location.href = $scope.clickJump || '/'
]

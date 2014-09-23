"use restrict"
# form some place can't use a link
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

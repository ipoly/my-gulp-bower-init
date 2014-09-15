"use restrict"
# show error message
angular.module 'validation.directive'
.directive 'zlMatch', [
  ->
    restrict: 'A'
    scope:
      pattern: '=zlMatch'
    require: '?ngModel'
    link: ($scope, $elm, $attr ,ngModel)->

      $scope.$watch 'pattern', (pattern)->
        ngModel.$setValidity 'match', pattern is  ngModel.$modelValue

      ngModel.$parsers.push (value)->
        ngModel.$setValidity 'match', $scope.pattern is  value
        value
]

"use restrict"
# show error message
angular.module 'validation.directive',[]
.directive 'formControl', [
  ->
    restrict: 'C'
    require:'?ngModel'
    link: ($scope, $elm, $attr, ngModel)->
      return null unless ngModel

      $scope.$watch ->
        ngModel.$error
      , ->
        if ngModel.$dirty
          msg = ngModel.$invalid and ($attr.title or $attr.placeholder)
          $elm.trigger 'validationChanged', msg
      , true
]
.directive 'formGroup', [
  '$compile'
  ($compile)->
    restrict: 'C'
    scope: true
    link: ($scope, $elm, $attr)->
      helper = $compile('<span class="error-msg" ng-if="errorMsg && onfocus">{{errorMsg}}</span>')($scope)

      $elm.find ':input:first'
      .closest ':not(.input-group,:input)'
      .append helper

      $elm.on 'validationChanged', (e, msg)->
        $elm.toggleClass 'has-error', msg
        $scope.errorMsg = msg
      .on 'focusin focusout', (e)->
        $scope.onfocus = e.type is 'focusin'
        $scope.$apply()
]
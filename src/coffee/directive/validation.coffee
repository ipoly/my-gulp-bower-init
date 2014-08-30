"use restrict"
# show error message
angular.module 'validation.directive',[]
.directive 'formControl', [
  ->
    restrict: 'C'
    require:'?ngModel'
    link: ($scope, $elm, $attr, ngModel)->
      return null unless ngModel

      listener = ->

      $scope.$watch ->
        ngModel.$error
      , ->
        if ngModel.$dirty
          msg = ngModel.$invalid and 'get error'
          $elm.trigger 'validationChanged', msg
      , true
]
.directive 'formGroup', [
  ->
    restrict: 'C'
    scope: true
    compile: ($elm, $attr)->
      helper = $ '<span class="error-msg" ng-if="errorMsg && onfocus">{{errorMsg}}</span>'
      parent = $elm.parents '.form-horizontal'
      if parent.length
        $elm.find('>:last-child').append helper
      else
        $elm.append helper

      link = ($scope, $elm, $attr)->
        $elm.on 'validationChanged', (e, msg)->
          $elm.toggleClass 'has-error', msg
          $scope.errorMsg = msg
        .on 'focusin focusout', (e)->
          $scope.onfocus = e.type is 'focusin'
          $scope.$apply()
]
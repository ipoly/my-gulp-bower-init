(function() {
  "use restrict";
  angular.module('validation.directive', []).directive('formControl', [
    function() {
      return {
        restrict: 'C',
        require: '?ngModel',
        link: function($scope, $elm, $attr, ngModel) {
          if (!ngModel) {
            return null;
          }
          return $scope.$watch(function() {
            return ngModel.$error;
          }, function() {
            var msg;
            if (ngModel.$dirty) {
              msg = ngModel.$invalid && ($attr.title || $attr.placeholder);
              return $elm.trigger('validationChanged', msg);
            }
          }, true);
        }
      };
    }
  ]).directive('formGroup', [
    '$compile', function($compile) {
      return {
        restrict: 'C',
        scope: {},
        link: function($scope, $elm, $attr) {
          var helper;
          helper = $compile('<span class="error-msg" ng-if="errorMsg && onfocus">{{errorMsg}}</span>')($scope);
          $elm.find(':input:first').closest(':not(.input-group,:input)').append(helper);
          return $elm.on('validationChanged', function(e, msg) {
            $elm.toggleClass('has-error', msg);
            return $scope.errorMsg = msg;
          }).on('focusin focusout', function(e) {
            $scope.onfocus = e.type === 'focusin';
            return $scope.$apply();
          });
        }
      };
    }
  ]).directive('input', [
    function() {
      return {
        restrict: 'E',
        compile: function($elm, $attr) {
          if ($attr.type === 'mobile') {
            return $attr.$set('ngPattern', '/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\\d{8})$/');
          }
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../maps/directive/validation.js.map
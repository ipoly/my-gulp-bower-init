(function() {
  "use restrict";
  angular.module('validation.directive', []).directive('formControl', [
    function() {
      return {
        restrict: 'C',
        require: '?ngModel',
        link: function($scope, $elm, $attr, ngModel) {
          var listener;
          if (!ngModel) {
            return null;
          }
          listener = function() {};
          return $scope.$watch(function() {
            return ngModel.$error;
          }, function() {
            var msg;
            if (ngModel.$dirty) {
              msg = ngModel.$invalid && 'get error';
              return $elm.trigger('validationChanged', msg);
            }
          }, true);
        }
      };
    }
  ]).directive('formGroup', [
    function() {
      return {
        restrict: 'C',
        scope: true,
        compile: function($elm, $attr) {
          var helper, link, parent;
          helper = $('<span class="error-msg" ng-if="errorMsg && onfocus">{{errorMsg}}</span>');
          parent = $elm.parents('.form-horizontal');
          if (parent.length) {
            $elm.find('>:last-child').append(helper);
          } else {
            $elm.append(helper);
          }
          return link = function($scope, $elm, $attr) {
            return $elm.on('validationChanged', function(e, msg) {
              $elm.toggleClass('has-error', msg);
              return $scope.errorMsg = msg;
            }).on('focusin focusout', function(e) {
              $scope.onfocus = e.type === 'focusin';
              return $scope.$apply();
            });
          };
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../maps/directive/validation.js.map
(function() {
  "use restrict";
  angular.module('validation.directive').directive('zlMatch', [
    function() {
      return {
        restrict: 'A',
        scope: {
          pattern: '=zlMatch'
        },
        require: '?ngModel',
        link: function($scope, $elm, $attr, ngModel) {
          $scope.$watch('pattern', function(pattern) {
            return ngModel.$setValidity('match', pattern === ngModel.$modelValue);
          });
          return ngModel.$parsers.push(function(value) {
            ngModel.$setValidity('match', $scope.pattern === value);
            return value;
          });
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../../maps/directive/validation/zlMatch.js.map
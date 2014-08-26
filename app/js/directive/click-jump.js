(function() {
  "use restrict";
  angular.module('click-jump.directive', []).directive('clickJump', [
    function() {
      return {
        restrict: 'A',
        scope: {
          clickJump: '@'
        },
        link: function($scope, $elm) {
          return $elm.on('click', function() {
            return window.location.href = $scope.clickJump || '/';
          });
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../maps/directive/click-jump.js.map
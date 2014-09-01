(function() {
  "use restrict";
  angular.module('count-down-to.directive', []).directive('countDownTo', [
    '$interval', function($interval) {
      return {
        restrict: 'C',
        scope: {
          deadLine: '@',
          callBack: '&'
        },
        replace: true,
        template: "<span ng-if='counting'>\n  <img ng-src='/img/{{counting[0]}}.jpg'/>\n  <img ng-src='/img/{{counting[1]}}.jpg'/>\n  <i></i>\n  <img ng-src='/img/{{counting[2]}}.jpg'/>\n  <img ng-src='/img/{{counting[3]}}.jpg'/>\n  <i></i>\n  <img ng-src='/img/{{counting[4]}}.jpg'/>\n  <img ng-src='/img/{{counting[5]}}.jpg'/>\n</span>",
        link: function($scope, $elm, $attr) {
          var promise, setCounting;
          promise = null;
          setCounting = function(string) {
            $scope.counting = string;
            if (/0{6}/.test(string)) {
              $interval.cancel(promise);
              return $scope.callBack();
            }
          };
          return $scope.$watch('deadLine', function(deadLine) {
            $interval.cancel(promise);
            if (!deadLine) {
              return setCounting('000000');
            }
            deadLine = new Date(deadLine);
            if (!deadLine) {
              return console.warn("\"" + $scope.countDownT + "\" isn't a valid timestamp.");
            }
            return promise = $interval(function() {
              var countDown, now, timeLeft;
              now = new Date;
              timeLeft = deadLine - now;
              if (timeLeft > 0) {
                countDown = new Date(timeLeft - 8 * 60 * 60 * 1000);
                return setCounting((countDown.toTimeString().replace(/\D/g, '')).slice(0, 6));
              } else {
                return setCounting('000000');
              }
            }, 1000);
          });
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../maps/directive/count-down-to.js.map
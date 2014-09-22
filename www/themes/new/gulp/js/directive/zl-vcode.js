(function() {
  "use restrict";
  angular.module('zl-vcode.directive', []).directive('zlVcode', [
    '$timeout', function($timeout) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          params: '='
        },
        template: "<button type='button' ng-click='send()' ng-class='{\"font-size-small\": active}'>{{text}}</button>",
        link: function($scope, $elm, $attr) {
          var activeText, countDown, defaultText, params, timer;
          if ($scope.params == null) {
            $scope.params = {};
          }
          params = {
            'Rc5vc': 1,
            'type': 'ajax'
          };
          $scope.text = defaultText = '发送验证码';
          activeText = ' 秒后可再获取';
          timer = null;
          countDown = function(time) {
            var update;
            if (time == null) {
              time = 60;
            }
            $scope.active = true;
            $timeout.cancel(timer);
            update = function() {
              $scope.text = time-- + activeText;
              if (time === 0) {
                $scope.text = defaultText;
                return $scope.active = false;
              } else {
                return timer = $timeout(update, 1000);
              }
            };
            return update();
          };
          $scope.$watch('active', function(active) {
            return $attr.$set('disabled', active || $scope.$parent.$eval($attr.ngDisabled));
          });
          return $scope.send = function() {
            return $.post('/index.php?user&q=reg', angular.extend(params, $scope.params)).done(function(data) {
              alert(data);
              return countDown(60);
            });
          };
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../maps/directive/zl-vcode.js.map
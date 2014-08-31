(function() {
  "use restrict";
  angular.module('progrress-bar.directive', []).directive('progress', [
    function() {
      return {
        restrict: 'A',
        scope: {
          progress: '=',
          type: '@'
        },
        template: "<div ng-style=\"{width: progress+'%'}\" class=\"progress-bar\" ng-class=\"'progress-bar-'+type\" role=\"progressbar\" aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\">\n  <span class=\"sr-only\">{{progress}}% Complete</span>\n</div>"
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../maps/directive/progress-bar.js.map
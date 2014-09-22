(function() {
  "use restrict";
  angular.module('zl-popup-loan.directive', ['ui.bootstrap']).directive('zlPopupLoan', [
    '$modal', function($modal) {
      return {
        restrict: 'A',
        link: function($scope, $elm, $attr) {
          return $elm.on('click', function() {
            return $modal.open({
              template: "<div class=\"modal-header\">\n  <button class=\"close\" ng-click='$close()'>×</button>\n  <h4 class=\"modal-title\">申请贷款</h4>\n</div>\n<div class=\"modal-body\" ng-include='\"/loan.html\"'></div>"
            });
          });
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../maps/directive/zl-popup-loan.js.map
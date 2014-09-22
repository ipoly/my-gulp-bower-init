"use restrict"
# popup a loan window
angular.module 'zl-popup-loan.directive',['ui.bootstrap']
.directive 'zlPopupLoan', [
  '$modal'
  ($modal)->
    restrict: 'A'
    link: ($scope, $elm, $attr)->
      $elm.on 'click', ->
        $modal.open {
          template: """
            <div class="modal-header">
              <button class="close" ng-click='$close()'>×</button>
              <h4 class="modal-title">申请贷款</h4>
            </div>
            <div class="modal-body" ng-include='"/loan.html"'></div>
          """
        }

]
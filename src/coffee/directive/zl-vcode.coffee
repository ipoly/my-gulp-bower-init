"use restrict"
# request vcode
angular.module 'zl-vcode.directive',[]
.directive 'zlVcode', [
  '$timeout'
  ($timeout)->
    restrict: 'E'
    replace: true
    scope:
      params: '='
    template: """
      <button type='button' ng-click='send()' ng-class='{"font-size-small": active}'>{{text}}</button>
    """
    link: ($scope, $elm, $attr)->
      $scope.params ?= {}
      params = {'Rc5vc': 1, 'type': 'ajax'}
      $scope.text = defaultText = '发送验证码'
      activeText = ' 秒后可再获取'
      timer = null

      countDown = (time=60)->
        $scope.active = true
        $timeout.cancel timer

        update = ->
          $scope.text = time-- + activeText
          if time is 0
            $scope.text = defaultText
            $scope.active = false
          else
            timer = $timeout update ,1000

        update()

      $scope.$watch 'active', (active)->
        $attr.$set 'disabled', active or $scope.$parent.$eval($attr.ngDisabled)

      $scope.send = ->
        $.post '/index.php?user&q=reg', angular.extend params, $scope.params
        .done (data)->
          alert data
          countDown(60)

]
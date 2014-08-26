"use restrict"
# require a timestamp string as dead-line to start
# run call-back expression when count down end
angular.module 'count-down-to.directive',[]
.directive 'countDownTo', ['$interval'
  ($interval)->
    restrict: 'C'
    scope:
      deadLine: '@'
      callBack: '&'
    replace: true
    template: """
      <span ng-if='counting'>
        <img ng-src='/img/{{counting[0]}}.jpg'/>
        <img ng-src='/img/{{counting[1]}}.jpg'/>
        <i></i>
        <img ng-src='/img/{{counting[2]}}.jpg'/>
        <img ng-src='/img/{{counting[3]}}.jpg'/>
        <i></i>
        <img ng-src='/img/{{counting[4]}}.jpg'/>
        <img ng-src='/img/{{counting[5]}}.jpg'/>
      </span>
    """
    link: ($scope, $elm, $attr)->
      promise = null
      setCounting = (string)->
        $scope.counting = string
        if /0{6}/.test string
          $interval.cancel promise
          $scope.callBack()

      $scope.$watch 'deadLine', (deadLine)->
        $interval.cancel promise
        return setCounting '000000' unless deadLine

        deadLine = new Date deadLine
        return console.warn "\"#{$scope.countDownT}\" isn't a valid timestamp." unless deadLine
        promise = $interval ->
          now = new Date
          timeLeft = deadLine - now
          if timeLeft > 0
            countDown = new Date  timeLeft - 8*60*60*1000
            setCounting (countDown.toTimeString().replace /\D/g, '')[0...6]
          else
            setCounting '000000'
        , 1000

]


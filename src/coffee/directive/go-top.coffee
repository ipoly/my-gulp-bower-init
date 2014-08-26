"use restrict"
# generate progress bar
angular.module 'go-top.directive',[]
.directive 'goTop', [
  ->
    restrict: 'A'
    link: ($scope, $elm)->
      win = $(window)
      height = $elm.height()
      win.on 'scroll', ->
        $elm.height(if win.scrollTop() then height else 0)

      $elm.on 'click', (e)->
        $("body").animate scrollTop:0

      win.scroll()
]

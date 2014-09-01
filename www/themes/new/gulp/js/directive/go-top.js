(function() {
  "use restrict";
  angular.module('go-top.directive', []).directive('goTop', [
    function() {
      return {
        restrict: 'A',
        link: function($scope, $elm) {
          var height, win;
          win = $(window);
          height = $elm.height();
          win.on('scroll', function() {
            return $elm.height(win.scrollTop() ? height : 0);
          });
          $elm.on('click', function(e) {
            return $("body").animate({
              scrollTop: 0
            });
          });
          return win.scroll();
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../maps/directive/go-top.js.map
"use restrict"
# generate progress bar
angular.module 'progrress-bar.directive',[]
.directive 'progress', [
  ->
    restrict: 'A'
    scope:
      progress: '='
      type: '@'
    template: """
      <div ng-style="{width: progress+'%'}" class="progress-bar" ng-class="'progress-bar-'+type" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
        <span class="sr-only">{{progress}}% Complete</span>
      </div>
    """
]


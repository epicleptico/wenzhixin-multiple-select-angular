(function(ng, jQuery){
  'use strict';


  var module = ng.module('ngMultiSelect.directive', []);

  module.constant('jQuery', jQuery);
  module.directive('ngMultiSelect', [
    '$timeout', 'jQuery', multiSelectDirective
  ]);


  function multiSelectDirective($timeout, jQuery) {

    function linkFn($scope, iElement, iAttrs) {

      var jElement = jQuery(iElement);

      var opts = {
        onClick: triggerChange,
        onCheckAll: triggerChange,
        onUncheckAll: triggerChange,
        filter: true,
        single: false
      };

      if(iAttrs.ngMultiSelectFilter) { opts.filter = iAttrs.ngMultiSelectFilter === 'true'; }
      if(iAttrs.ngMultiSelectSingle) { opts.single = iAttrs.ngMultiSelectSingle === 'true'; }
      if(iAttrs.ngMultiSelectWidth) { opts.width = iAttrs.ngMultiSelectWidth; }
      if(iAttrs.ngMultiSelectMaxHeight) { opts.maxHeight = iAttrs.ngMultiSelectMaxHeight; }

      jElement.multipleSelect(opts);


      if(iAttrs.ngMultiSelectTrack) {

        $scope.$watchCollection(iAttrs.ngMultiSelectTrack, function(){
          $timeout(refreshMultipleSelect, 50);
        });
      }

      function triggerChange(){
        jElement.trigger('change');
      }

      function refreshMultipleSelect(){
        jElement.multipleSelect('refresh');
      }

      //This helps setting up the value on init
      $timeout(refreshMultipleSelect, 50);
    }

    return {
      restrict: 'A',
      link: linkFn
    };
  }


})(angular, jQuery);
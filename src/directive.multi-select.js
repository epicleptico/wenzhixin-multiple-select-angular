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
        single: false,
        placeholder: '',
        selectAll: true,
        position: 'bottom',
        keepOpen: false,
        isOpen: false,
        selectAllText: 'Select All'
      };

      if(iAttrs.ngMultiSelectFilter)      { opts.filter = iAttrs.ngMultiSelectFilter.toLowerCase() === 'true'; }
      if(iAttrs.ngMultiSelectSingle)      { opts.single = iAttrs.ngMultiSelectSingle.toLowerCase() === 'true'; }
      if(iAttrs.ngMultiSelectWidth)       { opts.width = iAttrs.ngMultiSelectWidth; }
      if(iAttrs.ngMultiSelectMaxHeight)   { opts.maxHeight = iAttrs.ngMultiSelectMaxHeight; }
      if(iAttrs.ngMultiSelectPlaceholder) { opts.placeholder = iAttrs.ngMultiSelectPlaceholder; }
      if(iAttrs.ngMultiSelectSelectAll)   { opts.selectAll = iAttrs.ngMultiSelectSelectAll.toLowerCase() === 'true'; }
      if(iAttrs.ngMultiSelectPosition)    { opts.position = iAttrs.ngMultiSelectPosition; }
      if(iAttrs.ngMultiSelectKeepOpen)    { opts.keepOpen = iAttrs.ngMultiSelectKeepOpen.toLowerCase() === 'true'; }
      if(iAttrs.ngMultiSelectIsOpen)      { opts.isOpen = iAttrs.ngMultiSelectIsOpen.toLowerCase() === 'true'; }
      if(iAttrs.ngMultiSelectSelectAllText)  { opts.selectAllText = iAttrs.ngMultiSelectSelectAllText; }

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
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
        onOptgroupClick: triggerChange,
        filter: true,
        single: false,
        placeholder: '',
        selectAll: true,
        position: 'bottom',
        keepOpen: false,
        isOpen: false,
        selectAllText: 'Select all',
        allSelected: 'All selected'
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
      if(iAttrs.ngMultiSelectAllSelected) { opts.allSelected = iAttrs.ngMultiSelectAllSelected; }
      if(iAttrs.ngMultiSelectStyler)      { opts.styler = $scope.$eval(iAttrs.ngMultiSelectStyler); }

      /**
       * if true hide empty option and call styler
       */
      if(iAttrs.ngMultiSelectHideEmptyOption) {

        opts.styler = function(value) {

          var initialTxt = '';

          if(iAttrs.ngMultiSelectStyler) {
            initialTxt += $scope.$eval(iAttrs.ngMultiSelectStyler)(value);
          }

          if(value.trim() == '') {
            initialTxt += ';display:none;';
          }

          return initialTxt;
        }
      }// hideEmptyOption

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
      refreshMultipleSelect();
      
      //If there is ngModel, we must watch changes and refresh em
      if(iAttrs.ngModel) {
        $scope.$watch(iAttrs.ngModel, refreshMultipleSelect);
      }
    }

    return {
      restrict: 'A',
      link: linkFn
    };
  }


})(angular, jQuery);

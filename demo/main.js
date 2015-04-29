(function(ng, countries){
  'use strict';

  ng.module('mainApp', ['ngMultiSelect.directive']).controller('mainApp',function($scope){

    $scope.title = 'Welcome to the multiple select tests';

    $scope.countries = countries;

    $scope.countries0 = undefined;
    $scope.countries1 = [];
    $scope.countries2 = [];
    $scope.countries3 = [$scope.countries[2], $scope.countries[6]];
    $scope.countries4 = [$scope.countries[2].id, $scope.countries[6].id];


    $scope.addNewCountry = function(monthName){
      $scope.countries.push({id: $scope.countries.length + 1, name: monthName});
    };
  });
})(angular, countries);

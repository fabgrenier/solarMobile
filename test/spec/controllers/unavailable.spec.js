'use strict';

describe('Controller: UnavailableCtrl', function () {

  // load the controller's module
  beforeEach(module('solarAngularApp'));

  var UnavailableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UnavailableCtrl = $controller('UnavailableCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

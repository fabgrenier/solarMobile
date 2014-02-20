'use strict';

describe('Service: Consultservice', function () {

  // load the service's module
  beforeEach(module('solarAngularApp'));

  // instantiate service
  var Consultservice;
  beforeEach(inject(function (_Consultservice_) {
    Consultservice = _Consultservice_;
  }));

  it('should do something', function () {
    expect(!!Consultservice).toBe(true);
  });

});

'use strict';

describe('Service: Requestbuilder', function () {

  // load the service's module
  beforeEach(module('solarAngularApp'));

  // instantiate service
  var Requestbuilder;
  beforeEach(inject(function (_Requestbuilder_) {
    Requestbuilder = _Requestbuilder_;
  }));

  it('should do something', function () {
    Requestbuilder.createPingParams('proximus', '123456');

  });

});

'use strict';

describe('Directive: cropimage', function () {

  // load the directive's module
  beforeEach(module('giftcardsCropApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cropimage></cropimage>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cropimage directive');
  }));
});

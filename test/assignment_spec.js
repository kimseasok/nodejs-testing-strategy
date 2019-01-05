var assert = require('assert');
var Assignment = require('../models/assignment');
var Mission = require('../models/mission');
var Helpers = require('./helpers');
var _ = require('underscore')._;

var goodSpecs = { age: 40, height: 60, weight: 190 };

describe('Assignment', function () {
  describe('Commander with valid app', function () {
    var assignment;
    before(function () {
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({ id: 1000 }),
        role: 'commander'
      });
    });

    it('compatible', function () {
      assert(assignment.passengerIsCompatible);
    });
  });

  describe('Commander overweight', function () {
    var assignment;
    before(function () {
      assignment = new Assignment({
        passenger: { weight: 300 },
        mission: new Mission({ id: 1000 }),
        role: 'commander'
      });
    });

    it('no compatibility', function () {
      assert(!assignment.passengerIsCompatible);
    });
  });

  describe('Commander too tall', function () {
    var assignment;
    before(function () {
      assignment = new Assignment({
        passenger: {height: 300},
        mission: new Mission({ id: 1000 }),
        role: 'commander'
      });

      console.log(assignment.passengerIsCompatible);
    });

    it('no compatibility', function () {
      assert(!assignment.passengerIsCompatible);
    });
  });

  describe('Passenger availability - empty mission', function () {
    var assignment;

    before(function () {
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({ id: 1000}),
        role: 'space-tourist'
      });
    });

    it('available with no passengers', function () {
      assert(!assignment.passengerIsCompatible);
    });
  });

  describe('Passenger availibility - full mission', function () {
    var assignment;
    before(function () {
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({
          id: 1000,
          colonists: new Array(4),
          tourists: new Array(4)
        }),
        role: 'space-tourist'
      });
    });

    it('not open', function () {
      assert(!assignment.passengerIsCompatible);
    });
  });

  describe('passenger availibility - heavy mission', function () {
    var assignment;
    before(function () {
      var heavyColonist = [], heavyTourists = [];

      for (var i = 0; i <= 4; i++) {
        heavyColonist.push({ weight: 250 });
        heavyTourists.push({ weight: 250 });
      }
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({
          id: 1000,
          colonists: heavyColonist,
          tourists: heavyTourists
        }),
        role: 'space-tourist'
      });
    });

    it('not open', function () {
      assert(!assignment.passengerIsCompatible);
    });
  });
});
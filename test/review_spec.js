var assert = require('assert');
var Mission = require('../models/mission');
var ReviewProcess = require('../processes/review');
var Helpers = require('./helpers');
var sinon = require('sinon');
var DB = require('../db');

describe('The review process', function () {
    describe('Receiving a valid application', function () {
        var decision, review, validApp = Helpers.validApplication;

        before(function (done) {
            var db = Helpers.stubDb();
            review = new ReviewProcess({ application: validApp, db: db });
                sinon.spy(review, 'ensureAppValid');
                sinon.spy(review, 'findNextMission');
                sinon.spy(review, 'roleIsAvailable');
                sinon.spy(review, 'ensureRoleCompatible');

            review.processApplication(function (err, result) {
                decision = result;
                done();
            });
        });

        it('Should return success', function () {
            assert(decision.success, decision.message);
        });

        it('Ensure the application is valid', function () {
            assert(review.ensureAppValid.called);
        });
        it('select a mission', function () {
            assert(review.findNextMission.called);
        });
        it('ensure a role exists', function () {
            assert(review.roleIsAvailable.called);
        });
        it('ensure role is compatible', function () {
            assert(review.ensureRoleCompatible.called);
        });
    });
});
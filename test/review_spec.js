var assert = require('assert');
var ReviewProcess = require('../processes/review');
var MembershipApplication = require('../models/membership_application');
var sinon = require('sinon');

describe('The review process', function () {
    describe('Receiving a valid application', function () {
        var decision;

        var validApp = new MembershipApplication({
            first: 'Test',
            last: 'Account',
            email: 'test@test.com',
            age: 30,
            height: 66,
            weight: 299
        });

        var review = new ReviewProcess({ application: validApp });
        sinon.spy(review, 'ensureAppValid');
        sinon.spy(review, 'findNextMission');
        sinon.spy(review, 'roleIsAvailable');
        sinon.spy(review, 'ensureRoleCompatible');

        before(function (done) {
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
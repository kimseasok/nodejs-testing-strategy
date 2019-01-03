var assert = require('assert');
var ReviewProcess = require('../processes/review');
var MembershipApplication = require('../models/membership_application');
var sinon = require('sinon');

describe('The review process', function () {
    describe('Receiving a valid application', function () {
        var decision;

        var validApp = new MembershipApplication({
            first: 'Test',
            last: 'User',
            email: 'test@test.com',
            age: 30,
            height: 66,
            weight: 299
        });

        var review = new ReviewProcess();

        var validationSyp = sinon.spy();
        var missionSpy = sinon.spy();
        var roleAvailableSpy = sinon.spy();
        var roleCompatibleSpy = sinon.spy();

        before(function (done) {
            review.on('validated', validationSyp);
            review.on('mission-selected', missionSpy);
            review.on('role-available', roleAvailableSpy);
            review.on('role-compatible', roleCompatibleSpy);
            review.processApplication(validApp, function (err, result) {
                decision = result;
                done();
            });
        });

        it('Should return success', function () {
            assert(decision.success, decision.message);
        });

        it('Ensure the application is valid', function () {
            assert(validationSyp.called);
        });
        it('select a mission', function () {
            assert(missionSpy.called);
        });
        it('ensure a role exists', function () {
            assert(roleAvailableSpy.called);
        });
        it('ensure role is compatible', function () {
            assert(roleCompatibleSpy.called);
        });
    });
});
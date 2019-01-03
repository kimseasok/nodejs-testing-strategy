var mement = require('moment');
var Mission = require('../models/mission');
var MissionControl = require('../models/mission_control');
var assert = require('assert');
var db = require('../db');
var sinon = require('sinon');

sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
sinon.stub(db, 'createNextMission').yields(null, new Mission({id: 1000}));

var missionControl = new MissionControl({ db: db });

describe('Mission Planning', function () {
    describe('No current mission', function () {
        var currentMission;
        before(function (done) {
            missionControl.currentMission(function (err, res) {
                currentMission = res;
                done();
            });

        });

        it('It is created if none exists', function () {
            assert(currentMission);
            assert(db.getMissionByLaunchDate.called);
        });
    });

    describe('Current mission exists', function () {
        var currentMission;
        before(function (done) {
            db.getMissionByLaunchDate.restore();
            sinon.stub(db, 'getMissionByLaunchDate').yields(null, { id: 1000 });
            missionControl.currentMission(function (err, res) {
                currentMission = res;
                done();
            });

        });

        it('It return mission id: 1000', function () {
            assert.equal(currentMission.id, 1000);
            assert(db.getMissionByLaunchDate.called);
        });
    });
});
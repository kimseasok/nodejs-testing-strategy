var async = require('async');
var assert = require('assert');
var MissionControl = require('../models/mission_control');
var Assignment = require('../models/assignment');

var ReviewProcess = function (args) {

    assert(args.application, 'Need an application to review');
    assert(args.db, 'Need a database instance');

    var assignment, mission, app = args.application;
    var db = args.db;
    // make sure the app is valid

    var missionControl = new MissionControl({ db: db });

    this.ensureAppValid = function (next) {
        if (app.isValid()) {
            next(null, true);
        } else {
            next(app.validationMessage(), null);
        }
    };

    // find the next mission

    this.findNextMission = function (next) {
        // grab current mission from mission control

        missionControl.currentMission(function (err, res) {
            if (err) {
                next(err, null);
            } else {
                mission = res;
                next(null, res);
            }
        });
    };
    // make sure selected is available

    this.roleIsAvailable = function (next) {
        missionControl.hasSpaceForRole(app.role, next);
    };

    // make sure height/weight/age is  right for role

    this.ensureRoleCompatible = function (next) {
        assignment = new Assignment({
            passenger: app,
            mission: mission,
            role: app.role
        });

        next(null, assignment.passengerIsCompatible);
    };

    this.approveAppliction = function (next) {
        db.saveAssignment({ assignment: assignment }, next);
        //    next(null, true);
    };

    // this.startSubscription = function(next) {
    //     // return a subscription


    // }

    // accept the app with a message

    this.processApplication = function (next) {
        async.series({
            validate: this.ensureAppValid,
            mission: this.findNextMission,
            roleAvailable: this.roleIsAvailable,
            roleCompatible: this.ensureRoleCompatible,
            success: this.approveAppliction
        }, function (err, result) {
            if (err) {
                next(null, {
                    success: false,
                    message: err
                });
            } else {

                result.message = 'Welcome to the Mars';
                next(null, result);
            }
        });
    };
};

module.exports = ReviewProcess;
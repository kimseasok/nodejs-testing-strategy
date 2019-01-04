var async = require('async');
var assert = require('assert');
var MissionControl = require('../models/mission_control');

var ReviewProcess = function (args) {

    assert(args.application, 'Need an application to review');
    assert(args.db, 'Need a database instance');

    var app = args.application;
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
        mission = {
            commander: null,
            pilot: null,
            MAVPilot: null,
            passengers: []

        };

        next(null, mission);
    };
    // make sure selected is available

    this.roleIsAvailable = function (next) {

        // we have no  concept of the role selection just yet

        //TODO: What about a role? Need more info

        next(null, true);
    };

    // make sure height/weight/age is  right for role

    this.ensureRoleCompatible = function (next) {
        // TODO: find out about the role and height/weight/age

        next(null, true);
    };

    this.approveAppliction = function (next) {
        next(null, true);
    }

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
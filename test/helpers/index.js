var MembershipApplication = require('../../models/membership_application');
var Mission = require('../../models/mission');
var sinon = require('sinon');
var DB = require('../../db');

exports.validApplication = new MembershipApplication({
    first : "Test",
    last : "User",
    email : "test@test.com",
    age : 30,
    height : 66,
    weight : 180,
    role : "commander",
    card : 1
});

exports.stubDb = function (args) {
    args || (args = {});
    var mission = args.mission || new Mission();
    var db = new DB();

    sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
    sinon.stub(db, 'createNextMission').yields(null, mission);
    //sinon.stub(db, 'saveAssignment').yields(null, new Mission(mission));

    return db;
};
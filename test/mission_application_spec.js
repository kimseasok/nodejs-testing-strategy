var assert = require('assert');
var MemershipApplication = require('../models/membership_application');

describe('Membership application requirements', function() {
    var validApp;

    before(function(){
        validApp = new MemershipApplication({
            first: 'Test',
            last: 'User',
            email: 'test@test.com',
            age: 30,
            height: 66,
            weight: 180
        });
    });

    describe('Application valid if...', function() {
        it('Application is valid if all validators return true', function() {
            assert(validApp.isValid(), 'Not valid');
        });
        it('Email constains 4 or more charactors and an @', function(){
            assert(validApp.emailIsValid())
        });
        it('Height is between 60 and 75 inches', function() {
            assert(validApp.heightIsValid());
        });
        it('Age is between 15 and 100', function() {
            assert(validApp.ageIsValid());
        });
        it('Weight is between 100 and 300', function() {
            assert(validApp.weightIsValid());
        });
        it('First and last name are provided', function() {
            assert(validApp.nameIsValid());
        });
    });

    describe('Application invalid if...', function() {
        it('is past the validUntil date', function() {
            var app = new MemershipApplication({validUntil: Date.parse('01/01/2010')});
            assert(app.expired());
        })
        it('email is 4 characters or less', function() {
            var app = new MemershipApplication({email: 'dd'});
            assert(!app.emailIsValid());
        });
        it('email does not contain @', function() {
            var app = new MemershipApplication({email: 'ddhell:test.com'});
            assert(!app.emailIsValid());
        });
        it('Height is less 60', function() {
            var app = new MemershipApplication({height: 40});
            assert(!app.heightIsValid());
        });
        it('Height is more than 80', function() {
            var app = new MemershipApplication({height: 80});
            assert(!app.heightIsValid());
        });
        it('Age is less than 15', function() {
            var app = new MemershipApplication({age: 10});
            assert(!app.ageIsValid());
        });
        it('Age is more than 100', function() {
            var app = new MemershipApplication({age: 150});
            assert(!app.ageIsValid());
        });
        it('Weight is less than 100', function() {
            var app = new MemershipApplication({weight: 90});
            assert(!app.weightIsValid());
        });
        it('Weight is more than 300', function() {
            var app = new MemershipApplication({weight: 301});
            assert(!app.weightIsValid());
        });
        it('first is omitted', function() {
            var app = new MemershipApplication();
            assert(!app.nameIsValid());
        });
        it('last is omitted', function() {
            var app = new MemershipApplication();
            assert(!app.nameIsValid());
        });

    });
});
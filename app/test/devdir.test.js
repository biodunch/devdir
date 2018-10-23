'use strict';

var app = require('../../server'),
    chai = require('chai'),
    request = require('supertest'),
    serviceLocator = require('../configs/di'),
    mongoose = serviceLocator.get('mongoose'),
    { DevelopersContact } = require('./fixtures/new_contacts');

describe('Devlopers Contact Directory API Integration Tests', function() {
    after(async function() {
        const DevelopersContact = mongoose.model('DevelopersContact');
        await DevelopersContact.deleteMany({}).exec();
    });

    describe('#Create Contacts', function() {
        const body = DevelopersContact();

        it('should Create a contact', function(done) {
            request(app)
                .post('/v1/contacts')
                .send(body)
                .end(function(err, res) {
                    chai.expect(res.statusCode).to.equal(200);
                    chai.expect(res.body.data).to.be.an('object');
                    chai.expect(res.body.data.fullname).to.equal(body.fullname);
                    done();
                });
        });
    });

    describe('#GET  /contacts', function() {
        const body = DevelopersContact();

        it('should get all contacts', function(done) {
            request(app)
                .get('/v1/contacts')
                .end(function(err, res) {
                    chai.expect(res.statusCode).to.equal(200);
                    chai.expect(res.body.data).to.be.an('array');
                    done();
                });
        });

        it('should get a contact', function(done) {
            request(app)
                .get(`/v1/contacts/${body.twitter}`)
                .end(function(err, res) {
                    chai.expect(res.statusCode).to.equal(200);
                    chai.expect(res.body.data).to.be.an('object');
                    done();
                });
        });
    });

    describe('#Delete a Contact', function() {
        const body = DevelopersContact();
        const DELETE_CONTACT_RESPONSE = 'Contact deleted successfully';

        it('should delete a contact', function(done) {
            request(app)
                .del(`/v1/contacts/${body.twitter}`)
                .end(function(err, res) {
                    chai.expect(res.statusCode).to.equal(200);
                    chai.expect(res.body.data).to.be.a('string');
                    chai.expect(res.body.data).to.equal(
                        DELETE_CONTACT_RESPONSE
                    );
                    done();
                });
        });
    });
});

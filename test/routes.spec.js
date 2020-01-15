process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var knex = require('../db/knex');
var should = chai.should();

chai.use(chaiHttp);

describe('API Routes', function () {

    beforeEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                knex.migrate.latest()
                    .then(function () {
                        return knex.seed.run()
                            .then(function () {
                                done();
                            });
                    });
            });
    });

    afterEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                done();
            });
    });

    describe('GET /api/v1/activities_info', function () {
        it('should return the whole activities info table', function (done) {
            chai.request(server)
                .get('/api/v1/activities_info')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json; // jshint ignore:line
                    res.body.should.be.a('array');
                    res.body.length.should.equal(4);
                    res.body[0].should.have.property('id');
                    res.body[0].id.should.equal(1);
                    res.body[0].should.have.property('activity');
                    res.body[0].activity.should.equal('vinyasa yoga');
                    res.body[0].should.have.property('price');
                    res.body[0].price.should.equal('medium');
                    res.body[0].should.have.property('type_of_activity');
                    res.body[0]['type_of_activity'].should.equal('wellbeing');
                    done();
                });
        });
    });

    describe('GET /api/v1/reviews', function () {
        it('should return the whole reviews table', function (done) {
            chai.request(server)
                .get('/api/v1/reviews')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json; // jshint ignore:line
                    res.body.should.be.a('array');
                    res.body.length.should.equal(6);
                    res.body[0].should.have.property('id');
                    res.body[0].id.should.equal(1);
                    res.body[0].should.have.property('review');
                    res.body[0].review.should.equal("Horrible!");
                    res.body[0].should.have.property('activity_id');
                    res.body[0]['activity_id'].should.equal(1);
                    done();
                });
        });
    });

    describe('GET /api/v1/activity/:id', function () {
        it('should return the activity matching the id given', function (done) {
            chai.request(server)
                .get('/api/v1/activity/1')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json; // jshint ignore:line
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.id.should.equal(1);
                    res.body.should.have.property('activity');
                    res.body.activity.should.equal("vinyasa yoga");
                    res.body.should.have.property('area');
                    res.body['area'].should.equal('kings cross');
                    res.body.should.have.property('price');
                    res.body['price'].should.equal('medium');
                    res.body.should.have.property('type_of_activity');
                    res.body['type_of_activity'].should.equal('wellbeing');
                    done();
                });
        });
    });

    // describe('GET /api/v1/shows/:id', function () {
    //     it('should return a single show', function (done) {
    //         chai.request(server)
    //             .get('/api/v1/shows/1')
    //             .end(function (err, res) {
    //                 res.should.have.status(200);
    //                 res.should.be.json; // jshint ignore:line
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('name');
    //                 res.body.name.should.equal('Suits');
    //                 res.body.should.have.property('channel');
    //                 res.body.channel.should.equal('USA Network');
    //                 res.body.should.have.property('genre');
    //                 res.body.genre.should.equal('Drama');
    //                 res.body.should.have.property('rating');
    //                 res.body.rating.should.equal(3);
    //                 res.body.should.have.property('explicit');
    //                 res.body.explicit.should.equal(false);
    //                 done();
    //             });
    //     });
    //     it('should return a 404 error if there is no show corresponding to the id supplied', function (done) {
    //         chai.request(server)
    //             .get('/api/v1/shows/5')
    //             .end(function (err, res) {
    //                 res.should.have.status(404);
    //                 res.should.be.json; // jshint ignore:line
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('error');
    //                 res.body.error.should.equal('This entry does not exist.')
    //                 done();
    //             })
    //     });
    // });

    // describe('GET /api/v1/search_for_shows', function () {
    //     it('should return an array of shows matching the queries provided, or an empty array if no shows match', function (done) {
    //         chai.request(server)
    //             .get('/api/v1/search_for_shows/?genre=Drama')
    //             .end(function (err, res) {
    //                 res.should.have.status(200);
    //                 res.should.be.json; // jshint ignore:line
    //                 res.body.should.be.a('array');
    //                 res.body.should.have.length(2);
    //                 res.body[0].should.have.property('name');
    //                 res.body[0].name.should.equal('Suits');
    //                 res.body[1].should.have.property('name');
    //                 res.body[1].name.should.equal('Mad Men');
    //             });
    //         chai.request(server)
    //             .get('/api/v1/search_for_shows/?genre=IntentionallyErroneousGenre')
    //             .end(function (err, res) {
    //                 res.should.have.status(200);
    //                 res.should.be.json; // jshint ignore:line
    //                 res.body.should.be.a('array');
    //                 res.body.should.have.length(0);
    //                 done();
    //             });
    //     });
    // });

    // describe('POST /api/v1/shows', function () {
    //     it('should add a show', function (done) {
    //         chai.request(server)
    //             .post('/api/v1/shows')
    //             .send({
    //                 name: 'Family Guy',
    //                 channel: 'Fox',
    //                 genre: 'Comedy',
    //                 rating: 4,
    //                 explicit: true
    //             })
    //             .end(function (err, res) {
    //                 res.should.have.status(200);
    //                 res.should.be.json; // jshint ignore:line
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('name');
    //                 res.body.name.should.equal('Family Guy');
    //                 res.body.should.have.property('channel');
    //                 res.body.channel.should.equal('Fox');
    //                 res.body.should.have.property('genre');
    //                 res.body.genre.should.equal('Comedy');
    //                 res.body.should.have.property('rating');
    //                 res.body.rating.should.equal(4);
    //                 res.body.should.have.property('explicit');
    //                 res.body.explicit.should.equal(true);
    //                 done();
    //             });
    //     });
    // });

    // describe('PUT /api/v1/shows/:id', function () {
    //     it('should update a show', function (done) {
    //         chai.request(server)
    //             .put('/api/v1/shows/1')
    //             .send({
    //                 rating: 4,
    //                 explicit: true
    //             })
    //             .end(function (err, res) {
    //                 res.should.have.status(200);
    //                 res.should.be.json; // jshint ignore:line
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('name');
    //                 res.body.name.should.equal('Suits');
    //                 res.body.should.have.property('channel');
    //                 res.body.channel.should.equal('USA Network');
    //                 res.body.should.have.property('genre');
    //                 res.body.genre.should.equal('Drama');
    //                 res.body.should.have.property('rating');
    //                 res.body.rating.should.equal(4);
    //                 res.body.should.have.property('explicit');
    //                 res.body.explicit.should.equal(true);
    //                 done();
    //             });
    //     });

    //     it('should NOT update a show if the id field is part of the request', function (done) {
    //         chai.request(server)
    //             .put('/api/v1/shows/1')
    //             .send({
    //                 id: 20,
    //                 rating: 4,
    //                 explicit: true
    //             })
    //             .end(function (err, res) {
    //                 res.should.have.status(422);
    //                 res.should.be.json; // jshint ignore:line
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('error');
    //                 res.body.error.should.equal('You cannot update the id field');
    //                 done();
    //             });
    //     });
    // });

    // describe('DELETE /api/v1/shows/:id', function () {
    //     it('should delete a show', function (done) {
    //         chai.request(server)
    //             .delete('/api/v1/shows/1')
    //             .end(function (error, response) {
    //                 response.should.have.status(200);
    //                 response.should.be.json; // jshint ignore:line
    //                 response.body.should.be.a('object');
    //                 response.body.should.have.property('name');
    //                 response.body.name.should.equal('Suits');
    //                 response.body.should.have.property('channel');
    //                 response.body.channel.should.equal('USA Network');
    //                 response.body.should.have.property('genre');
    //                 response.body.genre.should.equal('Drama');
    //                 response.body.should.have.property('rating');
    //                 response.body.rating.should.equal(3);
    //                 response.body.should.have.property('explicit');
    //                 response.body.explicit.should.equal(false);
    //                 chai.request(server)
    //                     .get('/api/v1/shows')
    //                     .end(function (err, res) {
    //                         res.should.have.status(200);
    //                         res.should.be.json; // jshint ignore:line
    //                         res.body.should.be.a('array');
    //                         res.body.length.should.equal(3);
    //                         res.body[0].should.have.property('name');
    //                         res.body[0].name.should.equal('Game of Thrones');
    //                         res.body[0].should.have.property('channel');
    //                         res.body[0].channel.should.equal('HBO');
    //                         res.body[0].should.have.property('genre');
    //                         res.body[0].genre.should.equal('Fantasy');
    //                         res.body[0].should.have.property('rating');
    //                         res.body[0].rating.should.equal(5);
    //                         res.body[0].should.have.property('explicit');
    //                         res.body[0].explicit.should.equal(true);
    //                         done();
    //                     });
    //             });
    //     });
    // });
});
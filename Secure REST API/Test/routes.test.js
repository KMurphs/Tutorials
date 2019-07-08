// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require("../common/config/env.config")

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("/test endpoint", () => {
    describe("GET /test", () => {
        it("should get test object", (done) => {
            // chai.request("http://localhost:5000")
            chai.request("http://" + config.host + ":" + config.port)
                .get('/test')
                .end((err, res) => {
                    // console.log(res)
                    // console.log(res.status)
                    // console.log(res.headers)
                    // console.log(res.body)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.test.should.equal("Test Object");
                    done();
                });
        });
    });

    describe("GET /test with parameters", () => {
        it("should get test object along with sent parameters", (done) => {
            const parameters = {
                name: 'foo',
                lastname: 'bar'
            }
            chai.request("http://" + config.host + ":" + config.port)
                .get('/test')
                .query(parameters)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.test.should.equal("Test Object");
                    for (const idx in Object.keys(parameters)) {
                        const key = Object.keys(parameters)[idx];
                        res.body[key].should.equal(parameters[key]);
                    }
                    done();
                });
        });
    });

    describe("GET /badRouting with parameters", () => {
        it("should get test object along with sent parameters and Unsupported Route message", (done) => {
            const parameters = {
                name: 'foo',
                lastname: 'bar'
            }
            chai.request("http://" + config.host + ":" + config.port)
                .get('/badRouting')
                .query(parameters)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.test.should.equal("Route not Supported");
                    for (const idx in Object.keys(parameters)) {
                        const key = Object.keys(parameters)[idx];
                        res.body[key].should.equal(parameters[key]);
                    }
                    done();
                });
        });
    });

    describe("POST /tests", () => {
        it("should get test object along with sent parameters", (done) => {
            const parameters = {
                '_method': 'put',
                'password': '123',
                'confirmPassword': '123'
            }
            chai.request("http://" + config.host + ":" + config.port)
                .post('/tests')
                .type('form')
                .send(parameters)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.tests.should.equal("Tests Objects");
                    for (const idx in Object.keys(parameters)) {
                        const key = Object.keys(parameters)[idx];
                        res.body[key].should.equal(parameters[key]);
                    }
                    done();
                });
        });
    });

    describe("POST /badRouting", () => {
        it("should get test object along with sent parameters and Unsupported Route message", (done) => {
            const parameters = {
                '_method': 'put',
                'password': '123',
                'confirmPassword': '123'
            }
            chai.request("http://" + config.host + ":" + config.port)
                .post('/badRouting')
                .type('form')
                .send(parameters)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.tests.should.equal("Route not Supported");
                    for (const idx in Object.keys(parameters)) {
                        const key = Object.keys(parameters)[idx];
                        res.body[key].should.equal(parameters[key]);
                    }
                    done();
                });
        });
    });

    describe("DELETE /tests/someTest", () => {
        it("should get status 200", (done) => {
            chai.request("http://" + config.host + ":" + config.port)
                .del('/tests/someTest')
                .end((err, res) => {
                    res.should.have.status(200);
                    Object.keys(res.body).length.should.equal(0)
                    done();
                });
        });
    });

    describe("DELETE /badRouting", () => {
        it("should get status 404", (done) => {
            chai.request("http://" + config.host + ":" + config.port)
                .del('/badRouting')
                .end((err, res) => {
                    res.should.have.status(404);
                    Object.keys(res.body).length.should.equal(0)
                    done();
                });
        });
    });

    describe("PUT /tests", () => {
        it("should get test object along with sent parameters", (done) => {
            const parameters = {
                '_method': 'put',
                'password': '123',
                'confirmPassword': '123'
            }
            chai.request("http://" + config.host + ":" + config.port)
                .put('/tests')
                .type('form')
                .send(parameters)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.tests.should.equal("Tests Objects");
                    for (const idx in Object.keys(parameters)) {
                        const key = Object.keys(parameters)[idx];
                        res.body[key].should.equal(parameters[key]);
                    }
                    done();
                });
        });
    });

    describe("PUT /badRouting", () => {
        it("should get test object along with sent parameters and Unsupported Route message", (done) => {
            const parameters = {
                '_method': 'put',
                'password': '123',
                'confirmPassword': '123'
            }
            chai.request("http://" + config.host + ":" + config.port)
                .put('/badRouting')
                .type('form')
                .send(parameters)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.tests.should.equal("Route not Supported");
                    for (const idx in Object.keys(parameters)) {
                        const key = Object.keys(parameters)[idx];
                        res.body[key].should.equal(parameters[key]);
                    }
                    done();
                });
        });
    });
});
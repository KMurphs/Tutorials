// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("/users endpoint", () => {
    describe("GET /", () => {
        it("should get test object", (done) => {
            chai.request("http://localhost:5000")
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    console.log(res.status)
                    console.log(res.headers)
                    console.log(res.body)
                    done();
                });
        });
    });
});
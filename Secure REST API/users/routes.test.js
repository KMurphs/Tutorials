const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require("../common/config/env.config")

chai.use(chaiHttp);
chai.should();





describe("/users endpoint", () => {
    describe("GET /modelVersion", () => {
        it("should get 1.0.0", (done) => {

            chai.request("http://" + config.host + ":" + config.port)
                .get('/users/modelVersion')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.modelVersion.should.equal("1.0.0");
                    done();
                });

        });
    });
});
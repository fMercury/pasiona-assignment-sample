const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require('chai').expect
chai.use(chaiHttp);

let access_token;
describe("API routes", () => {
    it("Auth route", done => {
        chai.request(app)
            .post("/auth")
            .send({
                email: "britneyblankenship@quotezart.com"
            })
            .then(response => {
                expect(response).to.have.status(200);
                expect(response.body.process).equal(true);
                access_token = response.body.token;
                done();
            });
    });

    it("Testing access link", done => {
        chai.request(app)
            .get(`/loged?token=${access_token}`)
            .then(response => {
                expect(response).to.have.status(200);
                done();
            })
    });

    it("Testing Get Client by id", done => {
        chai.request(app)
        .get(`/loged?token=${access_token}`)
        .then(response => {
                chai.request(app)
                    .get("/usersById?user_id=a0ece5db-cd14-4f21-812f-966633e7be86")
                    .set("Authorization", true)
                    .then(response => {
                        expect(response).to.have.status(200);
                        //console.log(response.body)
                        expect(response.body['results'][0].name).equal("Britney");
                        done();
                    })
        })
    });

    it("Testing Get Client by name", done => {
        chai.request(app)
            .get(`/loged?token=${access_token}`)
            .then(response => {
                chai.request(app)
                    .get("/usersByName?user_name=Britney")
                    .set("Authorization", true)
                    .then(response => {
                        //console.log(response.body)
                        expect(response).to.have.status(200);
                        expect(response.body['results'][0].id).equal(
                            "a0ece5db-cd14-4f21-812f-966633e7be86"
                        );
                        done();
                    });
            })
    });

    it("Testing Get Client by Policy id ", done => {
        chai.request(app)
            .get(`/loged?token=${access_token}`)
            .then(response => {
                chai.request(app)
                    .get("/userByPolicyNumber?policy_id=7b624ed3-00d5-4c1b-9ab8-c265067ef58b")
                    .set("Authorization", true)
                    .then(response => {
                        //console.log(response.body)
                        expect(response).to.have.status(200);
                        expect(response.body['results'][0].name).equal("Britney");
                        done();
                    });
            })
    });

    it("Testing Get Policy by Client name", done => {
        chai.request(app)
            .get(`/loged?token=${access_token}`)
            .then(response => {

                chai.request(app)
                    .get("/policiesByUserName?user_name=Britney")
                    .set("Authorization", true)
                    .then(response => {
                        //console.log(response.body)
                        expect(response).to.have.status(200);
                        expect(response.body['results'][0].id).equal(
                            "7b624ed3-00d5-4c1b-9ab8-c265067ef58b"
                        );
                        done();
                    });
            })
    });

});


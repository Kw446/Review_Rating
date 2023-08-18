let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const companySchema = require("../models/companySchema");
const companyRoutes = require("../routes/companyRoutes");
const random_name = require("node-random-name");

chai.should();
chai.use(chaiHttp);

describe("POST /api/company", () => {
  it("It should Add new company :", (done) => {
    const user = {
      companyName: random_name(),
      companyLocation: "palasiya",
      companyCity: "Indore",
    };
    chai
      .request(server)
      .post("/company/create")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field(user)
      .attach("companyPic", "C:/Users/Kaustubh Wani/Downloads/code2.jpg")
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .eq("comapny created succfully ");
      });
    done();
  });
  //error for createing user

  it("It should return error fro comapny :", (done) => {
    const user = {
      companyName: "Aman Technocrate",
      companyLocation: "palasiya",
      companyCity: "Indore",
    };
    chai
      .request(server)
      .post("/company/create")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field(user)
      .attach("companyPic", "C:/Users/Kaustubh Wani/Downloads/code2.jpg")
      .end((err, res) => {
        res.should.have.status(409);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have
          .property("message")
          .eq("company is all ready exitst");
      });
    done();
  });

// get list of comapny
  describe('GET /api/company', () => {
    it('It should get company list', (done) => {
        chai
            .request(server)
            .get('/company/list')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message')
                    .eq('all company founded succefully');
                })
                done();
    })
})

describe('GET /api/company', () => {
    it("It should get company details", (done) => {
        chai
            .request(server)
            .get('/review/:id/64b51a3e6c90ac3844b95bc3')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('Company details fetched');
            })
            done();
    })
})

describe('GET /api/company', () => {
    it('It should get searched company', (done) => {
        chai
            .request(server)
            .get('/company/search/m')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('all  deatils of company show successfully');
            })
            done();
    })

    it('It should return searched error', (done) => {
        chai
            .request(server)
            .get('/company/search/x')
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('company not  found');
            })
            done();
    })
})
});

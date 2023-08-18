let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
let userRoutes = require("../routes/userRoutes");
let userSchema = require("../models/userSchema");
var randomEmail = require("random-email");
var token

chai.should();
chai.use(chaiHttp);

describe("Task Api", () => {
  describe("POST /api/users", () => {
    it("It should return login user detail :", (done) => {
      const data = {
        userEmail: "aman90@gmail.com",
        userPassword: "Abc@1230",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          res.body.should.have.property("message").eq("login succfully");
          res.body.should.have.property("accessToken");
        });
      done();
    });

    it("It should return error message for password:", (done) => {
      const data = {
        userEmail: "aman90@gmail.com",
        userPassword: "Ab@233",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a("object");
          res.body.should.have.property("success").eq(false);
          res.body.should.have
            .property("message")
            .eq("invalid email or password");
          //res.body.should.have.property("message").eq("login succfully");
          //res.body.should.have.property("accessToken");
        });
      done();
    });

    it("It should return error message for Email:", (done) => {
      const data = {
        userEmail: "ritikk@gmail.com",
        userPassword: "Abc@1230",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.a("object");
          res.body.should.have.property("success").eq(false);
          res.body.should.have
            .property("message")
            .eq("user is not regeisterd with this email");
          //res.body.should.have.property("message").eq("login succfully");
          //res.body.should.have.property("accessToken");
        });
      done();
    });
  });
});


//create user
describe("Task Api", async () => {
  describe("POST /api/users", () => {
    it("It should Add new user :", (done) => {
      const user = {
        userName: "Aman",
        userEmail: randomEmail(),
        userPassword: "Aman@123",
        userCity: "Hoshangabad",
        userState: "M.P.",
        userPhone: "9876543210",
      };
      chai
        .request(server)
        .post("/user/create")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .field(user)
        .attach("profilePic", "C:/Users/Kaustubh Wani/Downloads/code2.jpg")
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          res.body.should.have
            .property("message")
            .eq("user is successfulyy registered");
        });
      done();
    });
  });
  //error for createing user

  it("It should return error :", (done) => {
    const user = {
      userName: "Aman",
      userEmail: "amanchouh22an@gmail.com",
      userPassword: "Aman@123",
      userCity: "Hoshangabad",
      userState: "M.P.",
      userPhone: "9876543210",
    };
    chai
      .request(server)
      .post("/user/create")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field(user)
      .attach("profilePic", "C:/Users/Kaustubh Wani/Downloads/code2.jpg")
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have
          .property("message")
          .eq("user is alrdy exit with this email");
      });
    done();
  });
});


// api for reset password/link
    describe("POST /api/users", () => {
      it("It should Add new user :", (done) => {
        const user = {
          userEmail: "kaustubhwani446@gmail.com",
        };
        chai
          .request(server)
          .post("/user/sendemail")
          
          .send(user)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.a("object");
            res.body.should.have.property("success").eq(true);
            res.body.should.have.property("message").eq("Email send succfuly");
              res.body.should.have.property("token");
              token = res.body.token
          });
        done();
      });

      it("user emial not found :", (done) => {
        const user = {
          userEmail: "kaustubhwani446@gmail.com",
        }
        chai
          .request(server)
          .post("/user/sendemail")
          
          .field(user)
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.a("object");
            res.body.should.have.property("success").eq(false);
            res.body.should.have.property("error").eq("pls enter valid email");
            
          });
        done();
    });

});

//reset password

describe("POST /api/users", () => {
    it("password change successfully :", (done) => {
      const user = {
        newPassword:"Kaustubh@12340",
    confirmPassword:"Kaustubh@12340"
}
      
      chai
        .request(server)
        .post("/user/resetuserpassword/64b930ab8e72127fcbf153d7/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGI5MzBhYjhlNzIxMjdmY2JmMTUzZDciLCJpYXQiOjE2OTAxODk5NjMsImV4cCI6MTY5MDE5MTE2M30.97NhPOk8PxKFTf4to3w3XmQ_kMV1o0UTIsV7hVuEGKU")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          res.body.should.have.property("message").eq("password change succfuly");
        
        });
      done();
    });


    it('It should return password not match', (done) => {
      const data = {
          newPassword: 'Kaustubh@12340',
          confirmPassword: 'Kaustubh@123400',
      };
      chai
          .request(server)
          .post("/user/resetuserpassword/64b930ab8e72127fcbf153d7/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGI5MzBhYjhlNzIxMjdmY2JmMTUzZDciLCJpYXQiOjE2OTAxODk5NjMsImV4cCI6MTY5MDE5MTE2M30.97NhPOk8PxKFTf4to3w3XmQ_kMV1o0UTIsV7hVuEGKU")
          .send(data)
          .end((err, res) => {
              res.should.have.status(403);
              res.should.be.a('object');
              res.body.should.have.property('success').eq(false);
              res.body.should.have.property('message').eq('password  and confirm, not matched');
          })
          done();
  });

  // it('It should return user email is not return', (done) => {
  //     const data = {
  //         newPassword: 'Ashu@123',
  //         confirmPassword: 'Ashu@123',
  //     };
  //     chai
  //         .request(server)
  //         .post('/user/resetpassword/64b9215e6aa4bb88d5dc98/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGI5MjE1ZTZhNTdhNGJiODhkNWRjOTYiLCJpYXQiOjE2OTAxMTU2ODQsImV4cCI6MTY5MDExNjU4NH0.HuWNQvzCXfzJKhXMN6wQNj18CX3Bs-cikLwKAnv6IQc')
  //         .send(data)
  //         .end((err, res) => {
  //             res.should.have.status(500)
  //             res.should.be.a('object');
  //             res.body.should.have.property('success').eq(false);
  //             res.body.should.have.property('message').eq('Email user is not found');
  //         })
  //         done();
  // })
});
import chaiHttp from 'chai-http';
import 'mocha';
import chai from 'chai';
import { Genders } from '../app/common/enums';
import { UserDto } from '../app/dtos/user/dto';
import server from '../server';

chai.use(chaiHttp);
const should = chai.should();

describe('users', () => {
    const testUser: Partial<UserDto> = {
        provider: "Auth0",
        email: "testuser@hotmail.com",
        username: "TestUser",
        picture: "https://lighthousevc.nl/wp-content/uploads/2016/02/765-default-avatar.png",
        firstName: "test",
        lastName: "user",
        phoneNumber: "012345678",
        gender: Genders.Male,
        messages: [],
        rooms:[]
    };

    before((done) => {
        chai.request(server).post('/api/v1/users').send(testUser)
        .end((err, res) => {
            res.should.have.status(201);
            const user: UserDto = res.body.result;

            should.equal(user.email, testUser.email)
            testUser.id = user.id;

            done();
        });
    });

    it('GET SUCCESSFUL: should get only newly created user', (done) => {
        chai.request(server).get(`/api/v1/users?search=username[eq]${testUser.username}`)
        .end((err, res) => {
            res.should.have.status(200);
            const user: UserDto = res.body.result.items[0];

            should.equal(user.username, testUser.username)

            done();
        })
    });

    it('DELETE SUCCESS: should return no content (204)', (done) => { 
        chai.request(server).del(`/api/v1/users/${testUser.id}`)
        .end((err, res) => {
            res.should.have.status(204);

            done();
        });
    });

    it('CREATE SUCCESS: should return a new user', (done) => { 
        chai.request(server).post('/api/v1/users').send(testUser)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('result');
            testUser.id = res.body.result.id;

            done();
        });
    });

    it('CREATE FAILED: should return validation errors', (done) => { 
        chai.request(server).post('/api/v1/users').send(testUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.error.should.have.property('validationErrors');

            done();
        });
    });
    
    it('CREATE FAILED: should return invalid email error', (done) => { 
        chai.request(server).post('/api/v1/users').send({ ...testUser, email: 'blieblabloe' })
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.error.should.have.property('validationErrors');

            done();
        });
    });

    it('CREATE FAILED: should return invalid enum error', (done) => { 
        chai.request(server).post('/api/v1/users').send(testUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');

            done();
        });
    });

    it('DELETE SUCCESS: should return no content (204)', (done) => { 
        chai.request(server).del(`/api/v1/users/${testUser.id}`)
        .end((err, res) => {
            res.should.have.status(204);

            done();
        });
    });
});
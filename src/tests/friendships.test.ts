import chaiHttp from 'chai-http';
import 'mocha';
import chai from 'chai';
import { Genders } from '../app/common/enums';
import { UserDto } from '../app/dtos/user/dto';
import server from '../server';

chai.use(chaiHttp);
const should = chai.should();

describe('friends', () => { 
    const testUser1: Partial<UserDto> = {
        provider: "Auth0",
        email: "testuser1@hotmail.com",
        username: "TestUser1",
        picture: "https://lighthousevc.nl/wp-content/uploads/2016/02/765-default-avatar.png",
        firstName: "test",
        lastName: "user",
        phoneNumber: "012345678",
        gender: Genders.Male,
    };

    const testUser2: Partial<UserDto> = {
        provider: "Auth0",
        email: "testuser2@hotmail.com",
        username: "TestUser2",
        picture: "https://lighthousevc.nl/wp-content/uploads/2016/02/765-default-avatar.png",
        firstName: "test",
        lastName: "user",
        phoneNumber: "012345678",
        gender: Genders.Male,
    };

    before((done) => {
        chai.request(server).post('/api/v1/users').send(testUser1)
        .end((err, res) => {
            res.should.have.status(201);
            const user1: UserDto = res.body.result;

            should.equal(user1.email, testUser1.email)
            testUser1.id = user1.id;
        });
        chai.request(server).post('/api/v1/users').send(testUser2)
        .end((err, res) => {
            res.should.have.status(201);
            const user2: UserDto = res.body.result;

            should.equal(user2.email, testUser2.email)
            testUser2.id = user2.id;
        
            done();
        })
    });

    it('POST SUCCESSFUL: Created users should now be friends', (done) => {
        chai.request(server).post(`/api/v1/users/${testUser1.id}/friends`).send({ friendId: testUser2.id })
        .end((err, res) => {
            res.should.have.status(201);
            done();
        })
    });

    it('GET SUCCESSFUL: Should get a user with friends which include the rooms they participate in', (done) => {
        chai.request(server).get(`/api/v1/users/${testUser1.id}?include=friends,friends.rooms`)
        .end((err, res) => {
            res.should.have.status(200);

            res.body.result.friends[0].should.have.property('rooms');
            done();
        })
    });

    it('REMOVE SUCCESSFUL: Should remove the users', (done) => {
        chai.request(server).delete(`/api/v1/users/${testUser1.id}`)
        .end((err, res) => {
            res.should.have.status(204)
        })
        chai.request(server).delete(`/api/v1/users/${testUser2.id}`)
        .end((err, res) => {
            res.should.have.status(204)

            done();
        })
    })
})
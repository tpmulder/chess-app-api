import chaiHttp from "chai-http";
import 'mocha';
import chai from 'chai';
import RoomDto from "../app/dtos/room/dto";
import server from "../server";

chai.use(chaiHttp);
const should = chai.should();

describe('rooms',
  () => {
    const testRoom: Partial<RoomDto> = {
        name: "testroom",
        isPublic: true
    };

    before((done) => {
        chai.request(server).post(`/api/v1/rooms`).send(testRoom)
        .end((err, res) => {
            res.should.have.status(201);
            const room: RoomDto = res.body.result;

            should.equal(room.name, testRoom.name)
            testRoom.id = room.id;

            done();
        });
    });

    it('GET SUCCESSFUL: should get newly created testroom', (done) => {
        chai.request(server).get(`/api/v1/rooms?search=name[eq]${testRoom.name}`)
        .end((err, res) => {
            res.should.have.status(200);
            const room: RoomDto = res.body.result.items[0];

            should.equal(room.name, testRoom.name)

            done();
        })
    });

    it('DELETE SUCCESS: should return no content (204)', (done) => { 
        chai.request(server).del(`/api/v1/rooms/${testRoom.id}`)
        .end((err, res) => {
            res.should.have.status(204);

            done();
        });
    });
    
    it('CREATE FAILED: should return user does not exist', (done) => { 
        chai.request(server).post('/api/v1/rooms').send({ ...testRoom, email: 'blieblabloe', users: ['5fcfcd323ad4fe58f07fdc65'] })
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.error.should.not.have.property('validationErrors');
            res.body.error.should.have.property('message');

            done();
        });
    });
});
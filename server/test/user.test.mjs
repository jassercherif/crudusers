import * as chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Users from '../models/users.models.js';
import {
    AddUser,
    FindAllUsers,
    FindSingleUser,
    UpdateUser,
    DeleteUser
} from '../controllers/users.controllers.js';  // Make sure this path is correct

chai.use(chaiHttp);
const expect = chai.expect;

describe('UserController', () => {
    afterEach(() => {
        sinon.restore(); // Restore all stubs after each test
    });

    describe('AddUser()', () => {
        it('should add a new user', async () => {
            const req = {
                body: {
                    Email: 'test@example.com',
                    Lastname: 'Doe',
                    Firstname: 'John',
                    Age: '30'
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            sinon.stub(Users, 'findOne').resolves(null); // User doesn't exist
            sinon.stub(Users, 'create').resolves(req.body); // Simulate adding the user

            await AddUser(req, res);

            expect(res.status.calledWith(201)).to.be.true; // Expect status 201
            expect(res.json.calledWith({ message: 'User Added Successfully' })).to.be.true;
        });

        it('should return an error if user already exists', async () => {
            const req = {
                body: { Email: 'test@example.com', Lastname: 'Doe', Firstname: 'John', Age: '30' }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            const existingUser = { Email: 'test@example.com', Lastname: 'Doe', Firstname: 'John', Age: '30' };
            sinon.stub(Users, 'findOne').resolves(existingUser); // User already exists

            await AddUser(req, res);

            expect(res.status.calledWith(400)).to.be.true; // Use 400 for bad request
            expect(res.json.calledWith({ Email: 'User Exist' })).to.be.true;
        });
    });

    describe('FindAllUsers()', () => {
        it('should retrieve all users', async () => {
            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            const mockUsers = [
                { Email: 'test1@example.com', Lastname: 'User1', Firstname: 'First1', Age: '20' },
                { Email: 'test2@example.com', Lastname: 'User2', Firstname: 'First2', Age: '25' }
            ];
            sinon.stub(Users, 'find').resolves(mockUsers); // Mock user list

            await FindAllUsers(req, res);

            expect(res.status.calledWith(200)).to.be.true; // Adjust status code
            expect(res.json.calledWith(mockUsers)).to.be.true;
        });
    });

    describe('FindSingleUser()', () => {
        it('should retrieve a user by ID', async () => {
            const req = { params: { id: '666475fab56fd8eb85e73a32' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            const mockUser = { _id: '666475fab56fd8eb85e73a32', Email: 'test@example.com', Lastname: 'Doe', Firstname: 'John', Age: '30' };
            sinon.stub(Users, 'findOne').resolves(mockUser); // Mock user

            await FindSingleUser(req, res);

            expect(res.status.calledWith(200)).to.be.true; // Adjust status code
            expect(res.json.calledWith(mockUser)).to.be.true;
        });
    });

    describe('UpdateUser()', () => {
        it('should update a user', async () => {
            const req = {
                params: { id: '666475fab56fd8eb85e73a32' },
                body: { Email: 'updated@example.com', Lastname: 'Doe', Firstname: 'John Updated', Age: '31' }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            const updatedUser = { _id: '666475fab56fd8eb85e73a32', Email: 'updated@example.com', Lastname: 'Doe', Firstname: 'John Updated', Age: '31' };
            sinon.stub(Users, 'findOneAndUpdate').resolves(updatedUser); // Mock updated user

            await UpdateUser(req, res);

            expect(res.status.calledWith(200)).to.be.true; // Adjust status code
            expect(res.json.calledWith(updatedUser)).to.be.true;
        });
    });

    describe('DeleteUser()', () => {
        it('should delete a user by ID', async () => {
            const req = { params: { id: '666475fab56fd8eb85e73a32' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            const mockDeletedUser = { message: 'User Deleted Successfully' };
            sinon.stub(Users, 'findOneAndDelete').resolves(mockDeletedUser); // Mock delete response

            await DeleteUser(req, res);

            expect(res.status.calledWith(200)).to.be.true; // Adjust status code
            expect(res.json.calledWith(mockDeletedUser)).to.be.true;
        });
    });
});

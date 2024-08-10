const mockRequest = require('../consts/mock-request.const')
const mockRespone = require('../consts/mock-response.const')
const request = require('supertest')

const {create,getAll,getById} = require('../controller/user.controller')
const {createUser,getAllUsers,getUserById} = require('../model/user.model')

jest.mock('../model/user.model')

describe('Create Function Testing in User Controller', async () => {

    it('Should Return 400 if required Fields is Misssng ', async () => {
        const req = mockRequest({});
        const res = mockRespone();
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 400, 'All Fields are Required')
    })

    it('Should Return 400 if validation process failed' , async () => {
        const req = mockRequest({
            name: 'testname',
            email: 'tesmemail@gmail.com',
            password: '123456789'
        });
        const res = mockRespone();
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 400, 'Validation Failed')
    })

    it('Should Return 200 if User Create' , async () => {
        const req = mockRequest({
            name: 'testname',
            email: 'tesmemail@gmail.com',
            password: '123456789'
        });
        const res = mockRespone();
        createUser.mockResolvedValue(req.body);
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 200, 'User Created', req.body)
    })

    it('Should return 500 if createUser function error' , async () => {
        const req = mockRequest({
            name: 'testname',
            email: 'tesmemail@gmail.com',
            password: '123456789'
        });
        const res = mockRespone();
        createUser.mockRejectedValue(new Error('Error Create User'));
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 500, 'Error Create User')    
    })
})

describe('getAll Function Testing In User Controller' , async () => {
    it('Should return 200 and all user found' , async () => {
        const req = mockRequest();
        const res = mockRespone();
        const users = [
            {
                id: 1,
                name: 'Username',
            },
            {
                id: 2,
                name: 'Username2',
            }
        ]
        getAllUsers.mockResolvedValue(users);
        await getAll(req,res);
        expect(handleResponse).toBeCalledWith(res, 200, 'All Users Found', users)
    })
    it('Should return 500 if getAllUsers function error' , async () => {
        const req = mockRequest();
        const res = mockRespone();
        getAllUsers.mockRejectedValue(new Error('Error Get All Users'));
        await getAll(req,res);
        expect(handleResponse).toBeCalledWith(res, 500, 'Error Get All Users')
    })
})

describe('GetById Function Testing In User Controller' , async () => {
    it('Should return 404 if user not found' , async () => {
        const req = mockRequest(null,{
            userId: 1
        });
        const res = mockRespone();
        getUserById.mockResolvedValue(null);
        await getById(req,res);
        expect(handleResponse).toBeCalledWith(res, 404, 'User Not Found')
    })

    it('Should return 200 and user found' , async () => {
        const req = mockRequest(null,{
            userId: 1
        });
        const res = mockRespone();
        const user = {
            id: 1,
            name: 'Username',
        }
        getUserById.mockResolvedValue(user);
        await getById(req,res);
        expect(handleResponse).toBeCalledWith(res, 200, 'User Found', user)
    })

    it('Should return 500 if getUserById function error' , async () => {
        const req = mockRequest(null,{
            userId: 1
        });
        const res = mockRespone();
        getUserById.mockRejectedValue(new Error('Error Get User'));
        await getById(req,res);
        expect(handleResponse).toBeCalledWith(res, 500, 'Error Get User')
    })
})
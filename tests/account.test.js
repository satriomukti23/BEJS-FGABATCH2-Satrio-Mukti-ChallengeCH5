const mockRequest = require('../consts/mock-request.const')
const mockRespone = require('../consts/mock-response.const')
const request = require('supertest')

const {create , getAll , getById , getByUserId} = require('../controller/bank_account.controller')
const {createAccount,getAccountById,getAllAccounts,getAccountByUserId} = require('../model/bank_account.model')

jest.mock('../model/bank_account.model')



describe('Create Funcion Testing In Account Controller', () => {
    it('Should Return 400 if required Fields is Misssng ', async () => {
        const req = mockRequest();
        const res = mockRespone();
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 400, 'All Fields are Required')
    })

    it('Should Return 400 if validation process failed' , async () => {
        const req = mockRequest({
            userID: 'userid1',
            bank_name: 'bankname',
            bank_account: '12345678',
            balance: 10000
        });
        const res = mockRespone();
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 400, 'Validation Failed')
    })

    it('Should Return 201 & account created' , async () => {
        const req = mockRequest({
            user_id: 'userid1',
            bank_name: 'bankname',
            bank_account: '12345678',
            balance: 10000
        });
        const res = mockRespone();
        createAccount.mockResolvedValue(req.body);
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 201, 'Account Created', req.body)
    })

    it('Should Return 500 if createAccount function error', async () => {
        const req = mockRequest({
            user_id: 'userid1',
            bank_name: 'bankname',
            bank_account: '12345678',
            balance: 10000
        })
        const res = mockRespone();
        createAccount.mockRejectedValue(new Error('Error Creating Account'));
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 500, 'Error Creating Account')
    })
})

describe('Get All Function Testing In Account Controller', () => {
    it('should return 200 and get all account', async () => {
        const req = mockRequest();
        const res = mockRespone();
        const accounts = [
            {
                id: 1,
                bank_name: "bankA",
                balance: 10000 

            },
            {
                id: 2,
                bank_name: "bankB",
                balance: 20000
            }
        ];
        getAllAccounts.mockResolvedValue(accounts);
        await getAll(req,res);
        expect(handleResponse).toBeCalledWith(res, 200, 'Accounts Found', accounts)
    })

    it('should return 500 if getAllAccounts function error', async () => {
        const req = mockRequest();
        const res = mockRespone();
        getAllAccounts.mockRejectedValue(new Error ('Error Get Accounts'));
        await getAll(req,res);
        expect(handleResponse).toBeCalledWith(res, 500, 'Error Get Accounts')
    })
})

describe('Get By ID function Testing In Account Controller', () => {
    it('should return 404 if cannot get account', async () => {
        const req = mockRequest(null,{
            accountId: 1
        });
        const res = mockRespone();
        getAccountById.mockResolvedValue(null);
        await getById(req,res);
        expect(handleResponse).toBeCalledWith(res, 404, 'Account Not Found')
    })

    it('should return 200 and account found', async () => {
        const req = mockRequest(null,{
            accountId: 1
        });
        const res = mockRespone();
        const account = {
            id : 1,
            bank_name : "bankA",
            balance : 10000
        };
        getAccountById.mockResolvedValue(account);
        await getById(req,res);
        expect(handleResponse).toBeCalledWith(res, 200, 'Account Found', account)
    })

    it('should return 500 if getAccountById function error', async () => {
        const req = mockRequest(null,{
            accountId: 1
        });
        const res = mockRespone();
        getAccountById.mockRejectedValue(new Error('Error Get Account'));
        await getById(req,res);
        expect(handleResponse).toBeCalledWith(res, 500, 'Error Get Account')
    })
})

describe('Get By User ID function Testing in Account Controller', () => {
    it('should return 404 if cannot get account', async () => {
        const req = mockRequest(null,{
            userId: 1
        });
        const res = mockRespone();
        getAccountByUserId.mockResolvedValue(null);
        await getByUserId(req,res);
        expect(handleResponse).toBeCalledWith(res, 404, 'Account Not Found')
    })
    it('should return 200 if account found', async () => {
        const req = mockRequest(null,{
            userId: 1
        });
        const res = mockRespone();
        const account = {
            id : 1,
            bank_name : "bankA",
            balance : 10000
        };
        getAccountByUserId.mockResolvedValue(account);
        await getByUserId(req,res);
        expect(handleResponse).toBeCalledWith(res, 200, 'Account Found', account)   
    })
    it('should error 500 if getAccountByUserId function error', async () => {
        const req = mockRequest(null,{
            userId: 1
        });
        const res = mockRespone();
        getAccountByUserId.mockRejectedValue(new Error('Error Get Account'));
        await getByUserId(req,res);
        expect(handleResponse).toBeCalledWith(res, 500, 'Error Get Account')
    })
})
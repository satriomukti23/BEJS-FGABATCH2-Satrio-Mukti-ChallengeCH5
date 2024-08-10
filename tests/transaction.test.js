const mockRequest = require('../consts/mock-request.const')
const mockRespone = require('../consts/mock-response.const')
const request = require('supertest')

const {createTransaction, getAllTransactions, getTransactionById} = require('../model/transaction.model')
const {create, getAll, getById} = require('../controller/transaction.controller')

jest.mock('../model/transaction.model')

describe('create Transaction Function Testing in Transaction Controller', async () => {
    it('Should Return 400 if required Fields is Misssng ', async () => {
        const req = mockRequest({});
        const res = mockRespone();
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 400, 'All Fields are Required')
    })

    it('Should Return 400 if destAccount & destId same ', async () => {
        const req = mockRequest({
            sourceAccountId : 1,
            destinationAccountId : 1
        })
        const res = mockResponse();
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 400, 'Destination Account & Destination Id is same or empty')
    })

    it('Should Return 200 and transaction created', async () => {
        const req = mockRequest({
            sourceAccountId: 1,
            destinationAccountId: 2
        })
        const res = mockRespone();
        createTransaction.mockResolvedValue(req.body);
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 200, 'Transaction Created', req.body)
    })

    it('Should Return 500 if createTransaction function error', async () => {
        const req = mockRequest({
            sourceAccountId: 1,
            destinationAccountId: 2
        })
        const res = mockRespone();
        createTransaction.mockRejectedValue(new Error('Error Create Transaction'));
        await create(req,res);
        expect(handleResponse).toBeCalledWith(res, 500, 'Error Create Transaction')
    })
})

describe('getAll function Testing in Transaction Controller', async () => {
    it('Should Return 200 and all transactions', async () => {
        const req = mockRequest();
        const res = mockRespone();
        getAllTransactions.mockResolvedValue(req.body);
        await getAll(req,res);
        expect(handleResponse).toBeCalledWith(res, 200, 'All Transactions', req.body)
    })

    it('Should Retunr 400 if getAllTransactions function error', async () => {
        const req = mockRequest();
        const res = mockRespone();
        getAllTransactions.mockRejectedValue(new Error('Error Get All Transactions'));
        await getAll(req,res);
        expect(handleResponse).toBeCalledWith(res, 500, 'Error Get All Transactions')
    })

    it('Should Return 404 if no transaction found', async () => {
        const req = mockRequest();
        const res = mockRespone();
        getAllTransactions.mockResolvedValue([]);
        await getAll(req,res);
        expect(handleResponse).toBeCalledWith(res, 404, 'No Transaction Found')
    })
})

describe('Get By Id function Testing In Transaction Controller', async () => {
    it('Should Return 200 and transaction found', async () => {
        const req = mockRequest(null,{
            transactionId: 1
        })
        const res = mockRespone();
        getTransactionById.mockResolvedValue(req.body);
        await getById(req,res);
        expect(handleResponse).toBeCalledWith(res, 200, 'Transaction Found', req.body)
    })

    it('Should Return 404 if transaction not found', async () => {
        const req = mockRequest(null,{
            transactionId: 1
        })
        const res = mockRespone();
        getTransactionById.mockResolvedValue(null);
        await getById(req,res);
        expect(handleResponse).toBeCalledWith(res, 404, 'Transaction Not Found')
    })

    it('Should Return 500 if getTransactionById function error', async () => {
        const req = mockRequest(null,{
            transactionId: 1
        })
        const res = mockRespone();
        getTransactionById.mockRejectedValue(new Error('Error Get Transaction'));
        await getById(req,res);
        expect(handleResponse).toBeCalledWith(res, 500, 'Error Get Transaction')
    })
})
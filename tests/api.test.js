const request = require('supertest')
const app = require('../index')
const { bank_account } = require('../config/prisma')

describe ('User API Testing', () => {
    test('GET /api/v1/users', async () => {
        const response = await request(app).get('/api/v1/users')
        expect(response.statusCode).toBe(200)
        expect(response.body.mesagge).toEqual('Users Found')
        expect(response.body).toHaveProperty('data')
    })
    test('POST /api/v1/user', async () => {
        const newUser = {
            name : 'username',
            email : 'testemail@gmail.com',
            password : 12345678
        }
        const response = await request(app).post('/api/v1/user')
        .post('/api/v1/user')
        .send(newUser)
        expect(response.statusCode).toBe(200)
        expect(response.body.mesagge).toEqual('Users Found')
        expect(response.data).toEqual(newUser)
    })
    test('GET /api/v1/user/:userId', async () => {
        const newUsers = {
            id : 1,
            name : 'username',
            email : 'testemail@gmail.com',
            password : 123456789
        }
        const response = await request(app).get('/api/v1/user/1')
        expect(response.statusCode).toBe(200)
        expect(response.body.mesagge).toEqual('User Found')
        expect(response.data).toEquals(newUsers)
    })
})

describe ('Account API Testing' , () => {

    test('GET /api/v1/accounts', async () => {
        const accounts = [
            {
                id: 1,
                bank_name: 'bankA',
                bank_account_number: '123456789',
                balance: 100000,
                user_id : 1
            },
            {
                id: 2,
                bank_name: 'bankB',
                bank_account_number: '123456789',
                balance: 100000,
                user_id : 2
            }
        ]
        const response = await request(app).get('/api/v1/accounts')
        expect(response.statusCode).toBe(200)
        expect(response.body.mesagge).toEqual('Accounts Found')
        expect(response.data).toEqual({
            accounts : accounts
        })
    })
    test('GET /api/v1/account/:id', async () => {
        const account = {
            id: 1,
        }
        const response = await request(app).get('/api/v1/account/1')
        expect(response.statusCode).toBe(200)
        expect(response.body.mesagge).toEqual('Account Found')
        expect(response.data).toEqual({
            account : account
        })
    })

    test('POST /api/v1/account', async () => {
        const newAccount = {
            bank_name: 'bankA',
            bank_account_number: '123456789',
            balance: 100000,
            user_id : 1
        };
        const account = {
            id: 1,
            ...newAccount,
            user_id : 1
        }
        const response = await request(app).post('/api/v1/account')
        .post('/api/v1/account')
        .send(newAccount)
        expect(response.statusCode).toBe(200)
        expect(response.body.mesagge).toEqual('Account Created')
        expect(response.data).toEqual(account)
    })
})

describe('Transaction API Testing', () => {
    test('Get /api/v1/transactions', async () => {
        const transactions = [
            {
                id: 1,
                amount: 100000,
                account_id: 1,
                user_id: 1
            },
            {
                id: 2,
                amount: 100000,
                account_id: 2,
                user_id: 2
            }
        ]
        const response = await request(app).get('/api/v1/transactions')
        expect(response.statusCode).toBe(200)
        expect(response.body.mesagge).toEqual('Transactions Found')
        expect(response.data).toEqual({
            transactions : transactions
        })
    })

    test('POST /api/v1/transaction', async () => {
        const newTransaction = {
            amount: 100000,
            account_id: 1,
            user_id: 1
        };
        const transaction = {
            id: 1,
            ...newTransaction,
            user_id : 1
        }
        const response = await request(app).post('/api/v1/transaction')
        .post('/api/v1/transaction')
        .send(newTransaction)
        expect(response.statusCode).toBe(200)
        expect(response.body.mesagge).toEqual('Transaction Created')
        expect(response.data).toEqual(transaction)
    })

    test('GET /api/v1/transaction/:id', async () => {
        const transaction = {
            id: 1,
            amount: 100000,
            account_id: 1,
            user_id: 1
        }
        const response = await request(app).get('/api/v1/transaction/1')
        expect(response.statusCode).toBe(200)
        expect(response.body.mesagge).toEqual('Transaction Found')
        expect(response.data).toEqual({
            transaction : transaction
        })
    })
})
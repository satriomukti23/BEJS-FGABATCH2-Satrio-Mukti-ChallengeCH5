const prisma = require('../config/prisma')

const createAccount = async (data) => {
    const {userId,bank_name,bank_account_number,balance} = data

    try{
        const account = await prisma.bank_account.create({
            data:{
                userId,
                bank_name,
                bank_account_number,
                balance
            }
        });
        return account;
    }catch(error){
        throw new Error(error.message);
    }
}

const getAllAccounts = async () => {
    try{
        const accounts = await prisma.bank_account.findMany();
        return accounts;
    }catch(error){
        throw new Error(error.message);
    }
}

const getAccountById = async (id) => {
    try{
        const account = await prisma.bank_account.findUnique({
            where:{
                id
            }
        })
        return account;
    }catch(error){
        throw new Error (error.message)
    }
}

const getAccountByUserId = async (userId) => {
    try{
        const account = await prisma.bank_account.findUnique({
            where:{
                userId,
            }
        })
        return account;
    }catch(error){
        throw new Error (error.message)
    }
}

module.exports = {createAccount,getAllAccounts,getAccountById,getAccountByUserId}
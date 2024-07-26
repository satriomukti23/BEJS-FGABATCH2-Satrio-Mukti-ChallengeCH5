const prisma = require('../config/prisma');

// data = source_accountId , destination_accountId , amount 

const createTransaction = async (data) => {
    const {source_accountId, destination_accountId, amount} = data;
    
    try{
    const transaction = await prisma.$transaction(async (prisma) => {
        // const sourceUpdate = 
        await prisma.Bank_account.update({
            where: {
                id: source_accountId
            },
            data: {
                balance: {
                    decrement: amount
                }
            }
        });

        // const destinationUpdate = 
        await prisma.Bank_account.update({
            where: {
                id: destination_accountId
            },
            data: {
                balance: {
                    increment: amount
                }
            }
        });

        const transaction = await prisma.Transaction.create({
            data: {
                source_accountId: source_accountId,
                destination_accountId: destination_accountId,
                amount: amount
            },
            include: {
                source_account: true,
                destination_account: true
            }
        });
        return transaction;
        
        
    });
    return transaction;
    }catch(error){
        throw new Error(error)

    }
}

const getAllTransactions = async() => {
    try{
        const transactions = await prisma.transaction.findMany({
            include:{
                source_account: true,
                destination_account: true
            }
        })
        return transactions;
    }catch(error){
        throw new Error(error);
    }
}

const getTransactionById = async (id) => {
    try{
        const transaction = await prisma.transaction.findUnique({
            where:{
                id
            },
            include:{
                source_account: true,
                destination_account: true
            }
        })
        return transaction;
    }catch(error){
        throw new Error(error)
    }
}

module.exports = { createTransaction, getAllTransactions, getTransactionById };
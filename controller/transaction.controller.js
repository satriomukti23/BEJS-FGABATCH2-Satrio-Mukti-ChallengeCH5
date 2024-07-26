const {createTransaction, getAllTransactions, getTransactionById} = require ('../model/transaction.model')


const create = async (req,res) => {

    const {body} = req
    const {source_accountId, destination_accountId, amount} = body

    if (!source_accountId || !destination_accountId || amount === undefined || !amount){
        req.status(400).json({
            message: "All fields are required",
            data: transaction
        })
    }else if (source_accountId === destination_accountId){
        req.status(400).json({
            message: "Source account and destination account must be different",
            data: transaction
        })
    }

    try{
        const source_account = await getAccountById(source_accountId)

        if(!source_account){
            return res.status(404).json({
                message: "Source account not found"
            })
        }

        const destination_account = await getAccountById(destination_accountId)

        if(!destination_account){
            return res.status(404).json({
                message: "Destination account not found"
            })
        }

        const transaction = await createTransaction (body)
        return res.status(201).json({
            message: "Transaction created", transaction,
            data: transaction
        })

    }catch(error){
        res.status(500).json({
            message: "Cant create transaction"
        })
        console.log(error)
    }
}

const getAll = async (req,res) => {

    try{
        const transactions = await getAllTransactions()
        return res.status(200).json({
            message: "Transactions found", transactions,
            data: transactions
        })
    }catch(error){
        res.status(500).json({
            message: "Cant get transactions"
        })
    }
}

const getById = async (req,res) => {
    const {transactionId} = req.params

    try{
        const transaction = await getTransactionById(transactionId)

        if(!transaction){
            return res.status(404).json({
                message: "Transaction not found"
            })
        }

        return res.status(200).json({
            message: "Transaction found", transaction,
            data: transaction
        })

    }catch(error){
        res.status(500).json({
            message: "Cant get transaction"
        })
        console.log(error)
    }
}

module.exports = { create, getAll, getById }
const {createAccount,getAllAccounts,getAccountById,getAccountByUserId} = require('../model/bank_account.model')

const create = async (req, res) => {
    const {body} = req
    const {userId,bank_name, bank_account_number, balance} = body;
    

    if (!userId || !bank_name || !bank_account_number || !balance) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        const account = await createAccount(body);
        return res.status(201).json({
            message: "Account created",
            data: account
        });
    } catch (error) {
        res.status(500).json({
            message: "Can't create account"   
        });
        console.log(error)
    }
}

const getAll = async (req,res) => {
    
    try{
        const accounts = await getAllAccounts()
        return res.status(200).json({
            message: "Accounts found", accounts,
            data: accounts
        })
    }catch(error){
        res.status(500).json({
            message: "Cant get accounts"
        })
        console.log(error)
    }

}

const getById = async (req,res) => {

    const {accountId} = req.params
    try{
        const account = await getAccountById(accountId)
        if(!account){
            return res.status(404).json({
                message: "Account not found"
            });
        }
        return res.status(200).json({
            message: "Account found", account,
            data: account
        })
    }catch(error){
        res.status(500).json({
            message: "Cant get account"
        })
    }
}

const getByUserId = async (req,res) => {
    const {userId} = req.params

    try{
        const account = await getAccountByUserId(userId)
        if(!account.length){
            return res.status(404).json({
                message: "Account not found"
            });
        }
        return res.status(200).json({
            message: "Account found", account,
            data: account
        })
    }catch(error){
        res.status(500).json({
            message: "Cant get account"
        })
    }
}

module.exports = {create,getAll,getById,getByUserId}
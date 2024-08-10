
const {createUser,getAllUsers,getUserById} = require('../model/user.model')

const create = async (req,res) =>{

    const {name,email,password} = req.body

    if (!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    try{
        const user = await createUser(req.body)
        return res.status(201).json({
            message: "User created", user,
            data: user,
        });
    }catch(error){
        res.status(500).json({
            message: "Cant create user"})
    }
}

const getAll = async (req,res) => {
    try{
        const users = await getAllUsers()
        return res.status(200).json({
            message: "Users found",
            data: users
        });
    }catch(err){
        res.status(500).json({
            message: "Cant get users"})
    }
}

const getById = async (req,res) => {
    const {userId} = req.params
    try{
        const user = await getUserById(userId)

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: "User found",
            data: user
        });

    }catch(error){
        res.status(500).json({
            message: "Cant get user"})
    }
}



module.exports = {create,getAll,getById}
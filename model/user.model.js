const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')


const createUser = async (data) => {
    const {name,email,password} = data

    try{
    const user = await prisma.user.create({
        data:{
            name : name,
            email : email,
            password : bcrypt.hashSync(password,10)
        }
    });
    return user;
    }catch(err){
        throw new Error(err);
    }
};

const getAllUsers = async () => {
    try{
        const users = await prisma.user.findMany();
        return users;
    }catch(err){
        throw new Error(err);
    }
}


const getUserById = async (id) => {
    try{
        const user = await prisma.user.findUnique({
            where:{
                id 
            }
        });
        return user;
    }catch(error){
        throw new Error(error.message);
    }
}


module.exports = {createUser,getAllUsers,getUserById}
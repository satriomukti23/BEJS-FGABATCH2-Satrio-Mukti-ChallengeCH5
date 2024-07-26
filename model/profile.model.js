const prisma = require('../config/prisma')

const createProfile = async (data) => {
    const {userId,identity_type,identity_number,address} = data

    try{
        const profile = await prisma.profiles.create({
            data:{
                userId,
                identity_number,
                identity_type,
                address
            }
        })
            return profile;
    }catch(error){
        throw new Error(error)
    };
}

const getAllProfiles = async () => {
    
    try{
        const profiles = await prisma.profiles.findMany()
        return profiles
    }catch(error){
        throw new Error(error)
    }
}

const getProfileById = async(id) => {
    try{
        const profile = await prisma.profiles.findUnique({
            where:{
                id
            }
        })
        return profile
    }catch(error){
        throw new Error(error)
    }
}

const getProfileByUserId = async(userId) => {
    try{
        const profile = await prisma.profiles.findUnique({
            where:{
                userId
            }
        })
        return profile
    }catch(error){
        throw new Error (error.message)
    }
}
module.exports = {createProfile,getAllProfiles,getProfileById,getProfileByUserId}

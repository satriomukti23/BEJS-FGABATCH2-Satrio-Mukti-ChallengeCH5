const {createProfile,getAllProfiles,getProfileById,getProfileByUserId} = require('../model/profile.model')

const create = async (req,res) => {

    const {body} = req
    const {userId,identity_type,identity_number,address} = body

    if(!userId || !identity_type || !identity_number || !address)
        return res.status(400).json({
            message: "all fiels are required"
    });

    try{
        const profile = await createProfile(body)
        return res.status(201).json({
            message: "profile created",
            data: profile
        })
    }catch(error){
        res.status(500).json({
            message: "can't create profile"
        })
        console.log(error)
    }

}

const getAll = async (req,res) => {

    try{
        const profiles = await getAllProfiles()
        return res.status(200).json({
            message: "profile found",
            data: profiles
        })
    }catch(error){
        res.status(500).json({
            message: "cant get profile"
        })
    }
}

const getById = async(req,res) => {

    const profileId = req.params

    try{
        const profile = await getProfileById(profileId)
        if(!profile){
            return res.status(404).json({
                message: "profile not found"
            })
        }

        return res.status(200).json({
            message: "profile found",
            data: profile
        })
    }catch(error){
        res.status(500).json({
            message: " cant get profile"
        })
    }

}

const getByUserId = async (req,res) => {
    const {userId} = req.params

    try{
        const profile = await getProfileByUserId(userId)
        if(!profile.length){
            return res.status(404).json({
                message: "profile not found"
            })
        }
        return res.status(200).json({
            message: "profile found",
            data: profile
        })
    }catch(error){
        res.status(500).json({
            message: "cant get account"
        })
    }
}

module.exports = {create,getAll,getById,getByUserId}
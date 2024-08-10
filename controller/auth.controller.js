const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {createUser} = require('../model/user.model')

async function auth(req,res,next) {

    const {email , password} = req.body

    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        return res.status(404).json({
            message: 'User not found'   
        })
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if(!isPasswordMatch){
        return res.status(400).json({
            message: 'Invalid password'
        })
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_SECRET, {expiresIn: '1h'}
    );

    res.json({
        token: token
    })

}

async function register(req,res,next){

    const {name , email , password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({
            message: 'All fields are required'
        })
    }   

    try{
        const data = await createUser(req.body)
        return res.status(201).json({
            message: "User created",
            data: data,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Cant create user"
        })
    }
}

module.exports = { auth , register }
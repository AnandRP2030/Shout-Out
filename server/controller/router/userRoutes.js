const express = require('express');
const userRouter = express.Router();
const RegistrationModel = require('../../models/userSchema');


userRouter.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const newUser = await RegistrationModel.create({
            username, 
            email, 
            password
        })
        res.send(newUser);
    }catch(err) {
        if (err)console.log('err on register' , err);
    }
    
})




module.exports = userRouter;
const bcryptjs = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//MODELS
const User = require('../models/user');


//create account
router.post('/createAccount', async(request, response) => {
    //Get user Input
    const {firstName, lastName, email, password, mobile} = request.body;
    //Check if user exists
    User.findOne({email: email})
    .then(async account => {
        if (account){
            return response.status(200).json({
                message: 'User is already exist'
            });
        }else{
            //Crypt password
            const formatted_passwords = await bcryptjs.hash(password, 10);
            //Generate passcode
            const passcode = randomInteger(1000,9999);

            //FORGET PASSWORD
            router.post('/forgetPassword', async(request,response) => {
                //get user email
                const email = request.body.email
                // is user existing
                User.findOne({email:email})
                .then(async account =>{
                    if(account){
                        const passcode = randomInteger(1000,9999);
                        account.passcode = passcode;
                        account.save();
                        //.then(account_update =>{})
                    }
                })
            })

            //Create user in MongoDB
            const _user = new User({
                _id: mongoose.Types.ObjectId(),
                email:email,
                password:formatted_passwords,
                mobile: mobile,
                firstName:firstName,
                lastName:lastName,
                passcode:passcode
            })
            _user.save()
            .then(account_created =>{
                return response.status(200).json({
                    message:account_created
                });
            })
        }
    }) 
    .catch(err => {
        return response.status(500).json({
            message: err
        })
    });
    
})

// Login 
router.post('/login', async (request, response) => {
    // Get user credential
    // is user exist
    // is Verified ? is Locked?
    // compare  passwords 
    // create Token 
    // response 

})

//Verify Passcode
router.post('/verify', async (request, response) => {
    // get passcode and email
    const {email, passcode} = request.body; 
    // is user exist
    User.findOne({email: email}) 
    .then(async account => {
        if (account){
            // verify code 
            if (account.passcode == passcode){
                    // update isApproved
                account.isApproved = true;
                account.save()
                .then(updated_account => {
                        // response 
                    return response.statusCode(200).json({
                        message:updated_account
                    })
                })
            } else {
                return response.status(200).json({message: "passcode not correct"})
            }
        }
        else {
            return response.status(200).json({
                message: "user not found"
            })
        }
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
});

const randomInteger = (min,max) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// function randomInteger(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }



router.get('/sayHello',(request, response) => {
    return response.status(200).json({
        message: 'Hello from kiosk api'
    });
})



module.exports = router;
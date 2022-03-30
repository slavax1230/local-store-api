const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// mongo models
const Store = require('../models/store')
const isAuth = require('../controllers/isAuth')
const User = require('../models/user')


router.put('/updateStore',isAuth, async(request, response) => {
    const associateId = request.account._id; // ככה מוצאים את המשתמש לפי הטוקן
    const store = await Store.findOne({associateId:associateId}) // ככה מוצאים את המשתמש לפי הטוקן
    
    const {
        storeName,
        storeDescription,
        isTakeaway,
        isDelivery
        ,email
        ,mobile
        ,phone,
        city,
        address,
        latitude,
        longtitude,
        workingHours
    } = request.body;

    store.storeName = storeName;
    store.storeDescription = storeDescription;
    store.isTakeaway = isTakeaway;
    store.isDelivery = isDelivery;
    store.contactInfo = {
        email : email,
        mobile : mobile,
        phone : phone,
        city : city,
        address : address,
        latitude : latitude,
        longitude : longtitude
    };
    store.workingHours = workingHours;
    return store.save()
    .then(updated_store ={

    })
    .catch(err => {
        return response.status(500).json({ 
            message: err
        })
    })


})

router.post('/createStore', isAuth, async(request, response) => {
    // get store data
    const associateId = request.account._id;
    const storeId = mongoose.Types.ObjectId();
    const {storeName,storeDescription,email,mobile,city,latitude,longitude} = request.body;
    // TEST IF USER HAVE ALL READY ONE STORE 
    const isStoreExist = await Store.findOne({associateId:associateId})
    if (isStoreExist) {
        return response.status(200).json({
            message: 'Store is exist, you can go Extra Plan to add unlimited'
        })
    }else{
        const _store = new Store({
            _id: storeId,
            associateId: associateId,
            storeName: storeName,
            storeDescription: storeDescription,
            contactInfo: {
                email: email,
                mobile: mobile,
                city: city,
                latitude: latitude,
                longitude: longitude
            },
            subs:[],
            reviews: [],

        })
        const account = await User.findById(associateId);
        account.isBusiness = true;
        return _store.save()
        .then(store_created => {
            return response.status(200).json({
                message: store_created
            });
        })
    }
    
    

})


module.exports = router;
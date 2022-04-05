const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// mongo models
const Store = require('../models/store')
const isAuth = require('../controllers/isAuth')
const User = require('../models/user')
const Category = require('../models/category')
const Product = require('../models/product');

router.post('/addCategory', isAuth, async(request,response) => {
    const associateId = request.account._id; 
    const store = await Store.findOne({associateId:associateId}) // ככה מוצאים את המשתמש לפי הטוקן
    
    const {categoryName,priority} = request.body;

    const _category = new Category({
        _id : mongoose.Types.ObjectId(),
        storeId : store._id,
        categoryName: categoryName,
        priority: priority
    });
    _category.save()
    .then(created_category => {
        return response.status(200).json({
            status:true,
            message: created_category
        })
    })
    .catch(err => {
    return response.status(500).json({
        status:false,
        message: err
        });
    })
});

router.put('/updateCategory/:categoryId', isAuth, async(request,response) => {
    const accountId = request.account._id; 
    const {categoryName,priority} = request.body;
    const cId = request.params.categoryId;
    Category.findById(cId)
    .then((category) => {
        if(category){
           category.categoryName = categoryName;
           category.priority = priority;
           return category.save()
           .then(updated_category => {
               return response.status(200).json({
                   status:1,
                   message:updated_category
               })
            .catch(err => {
                return response.status(500).json({message: err});
            })
           })
        }else{
            return response.status(200).json({message: "there is no category by this ID"});
        }
    })
    .catch(error => {
        return response.status(500).json({message: error.message});
    })

})

router.delete('/deleteCategory/:categoryId', isAuth, async(request,response) => {
    const cid = request.params.categoryId;
    
})

router.post('/addProduct', isAuth, async(request,response) => {
    const associateId = request.account._id; 
    const store = await Store.findOne({associateId:associateId}) // ככה מוצאים את המשתמש לפי הטוקן
    
    const {categoryName,priority} = request.body;

    const _category = new Category({
        _id : mongoose.Types.ObjectId(),
        storeId : store._id,
        categoryName: categoryName,
        priority: priority
    });
    _category.save()
    .then(created_category => {
        return response.status(200).json({
            status:true,
            message: created_category
        })
    })
    .catch(err => {
    return response.status(500).json({
        status:false,
        message: err
        });
    })  
})

router.put('/updateProduct', isAuth, async(request,response) => {

})

router.delete('/deleteProduct', isAuth, async(request,response) => {

})

router.get('/getAllCategories', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const store = await Store.findOne({associateId: accountId});

    Category.find({storeId: store._id})
    .then(categories => {
        console.log(categories);
        return response.status(200).json({
            status:true,
            message:categories
        });
    })
    .catch(err =>{
        return response.status(500).json({status:false,message:err});
    })
});


router.get('/getCategory/:categoryid', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const cid = request.params.categoryid;
    const store = await Store.findOne({associateId: accountId});

    Category.findById(cid)
    .then(category => {
        return response.status(200).json({
            status:true,
            message:category
        });
    })
    .catch(err =>{
        return response.status(500).json({status:false,message:err});
    })
});
router.get('/getAllProducts', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const store = await Store.findOne({associateId: accountId});
    const category = await Category.findOne({storeId:store.id});
    Product.find({storeId: store.id})
    then(products => {
        response.status(200).json({
            status:true,
            message : products
        })
    }) 
    .catch(err => { 
        return response.status(500).json({
            status:false,
            message: err
        })
    })

})

router.get('/getProductsByCategoryId/:categoryId', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const categoryId = categoryId = request.params.categoryId;
    const store = await Store.findOne({associateId});
    Product.find({storeId: store._id, categoryId:categoryId})
    .then(products => {
        return response.status(200).json({
            status:true,
            message: products
        });
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
});

module.exports = router;

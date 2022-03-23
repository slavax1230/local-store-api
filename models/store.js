const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    associateId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    storeName: String,
    storeDescription: String,
    isTakeaway:Boolean,
    isDelivery:Boolean,
    subs: [ 
        {
            associateId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        }
    ],
    contactInfo: {
        email: String,
        mobile: String,
        phone: String,
        city: String,
        address: String,
        latitude: String,
        longtitude: String,
        
    },
    reviews: [
        {
            accountId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            reviewContext:String,
            createdAt:{type:Date,default:Date.now},
            rank:Number,
            isPublished:Boolean

        }
    ],
    workingHours: [
        {
            day: Number, fromHour:String, toHour:String
        }
    ],
    createdAt:{type:Date,default:Date.now},
    logo: {type:String,default:'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'},
    isLocked: {type:Boolean,default:false},
    updatedAt:{type:Date,default:Date.now},

});

module.exports = mongoose.model('Store', userSchema);
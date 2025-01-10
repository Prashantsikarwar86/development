const mongoose =require('mongoose');
const passportlocalmong=require('passport-local-mongoose');
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    isAttendee: {
        type: Boolean,
        default: false
    },
    attendeeProfile: {
        fullName: String,
        phone: String,
        address: String,
        registeredEvents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }],
        registrationDate: {
            type: Date,
            default: Date.now
        }
    }
});
userschema.plugin(passportlocalmong);
const User=mongoose.model('User',userschema);
module.exports=User;
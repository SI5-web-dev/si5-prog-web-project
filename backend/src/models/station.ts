import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Model d'un user
const stationSchema = new mongoose.Schema({
    "id" : {type : String ,required:false},
    "@latitude" : {type: Number , required :true},
    "@longitude" : {type: Number , required :true},
    "@cp" : {type: Number , required :true},
    "@pop" : {type : String ,required:true},
    "adresse" : {type : String ,required:true},
    "ville" : {type : String ,required:true},
    "horaires" : {type: Object , required:false},
    "services" : {type: {service:Array} , required:false},
    "prix" : {type: Array , required:true},

});

stationSchema.plugin(uniqueValidator);

// Exportation du model
export default mongoose.model('Station', stationSchema);
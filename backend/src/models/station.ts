import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Model d'une station
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

const stationHistorySchema = new mongoose.Schema({
    "id" : {type : String ,required:false},
    "@latitude" : {type: Number , required :false},
    "@longitude" : {type: Number , required :false},
    "prix" : {type: Array , required:false},

});

// Exportation des models
export default {Station: mongoose.model('Station', stationSchema, "stations"),
    Station2007 : mongoose.model('Station2007', stationHistorySchema, "stations2007"),
    Station2008 : mongoose.model('Station2008', stationHistorySchema, "stations2008"),
    Station2009 : mongoose.model('Station2009', stationHistorySchema, "stations2009"),
    Station2010 : mongoose.model('Station2010', stationHistorySchema, "stations2010"),
    Station2011 : mongoose.model('Station2011', stationHistorySchema, "stations2011"),
    Station2012 : mongoose.model('Station2012', stationHistorySchema, "stations2012"),
    Station2013 : mongoose.model('Station2013', stationHistorySchema, "stations2013"),
    Station2014 : mongoose.model('Station2014', stationHistorySchema, "stations2014"),
    Station2015 : mongoose.model('Station2015', stationHistorySchema, "stations2015"),
    Station2016 : mongoose.model('Station2016', stationHistorySchema, "stations2016"),
    Station2017 : mongoose.model('Station2017', stationHistorySchema, "stations2017"),
    Station2018 : mongoose.model('Station2018', stationHistorySchema, "stations2018"),
    Station2019 : mongoose.model('Station2019', stationHistorySchema, "stations2019"),
    Station2020 : mongoose.model('Station2020', stationHistorySchema, "stations2020"),
    Station2021 : mongoose.model('Station2021', stationHistorySchema, "stations2021"),
};
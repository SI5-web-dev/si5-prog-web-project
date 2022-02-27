import { RequestHandler, Request, Response, NextFunction } from "express";
import User from '../models/user.js';
import Stations from '../models/station.js';

export const signup : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.surname) {
            res.send({ "status" : "500", "message": "Il manque des informations.."});
            return
            
        }

        if (!checkMailAvailable(req.body.email)) {
            res.send({ "status" : "500","message":  "Veuillez entrer une adresse mail valide."});
            return
        }

        if (!checkPassword(req.body.password)) {
            res.send({ "status" : "500","message": "Le mot de passe n'est pas assez complexe."});
            return
        }


        // Création de l'user dans la BD
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            name : req.body.name,
            surname : req.body.surname,
            favoriteStations : [],
        });

        user.save().then(async () => {
            // Vérification avec l'email
            res.send({"status" : "200", "message": "Votre compte a bien été créé !" });
            return
        })
        .catch(() => {
            res.send({"status" : "500","message" : "Cette adresse e-mail est déjà utilisée."})
            return
        });
    }
    catch (err) {
        res.send({"status":"500","message":"erreur"});
        next(err);
    }
};


export const login : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user : any = await User.findOne({ email: req.body.email }).lean();
        if (!user) {
            res.send({"status" : "500", "message":  "Nom d'utilisateur ou mot de passe incorrect !"});
            return
        }

        if (!(user.password === req.body.password)) {
            res.send({"status" : "500", "message":  "Nom d'utilisateur ou mot de passe incorrect !"});
            return
        }
        res.send({"status" : "200", "message":  "Vous êtes connecté !", 'uid':user._id, "favoriteStations" : user.favoriteStations});
        return
    }
    catch (err) {
        res.send({"status":"500","message":"erreur"});
        next(err);
    }
};

export const addFavorite : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user : any = await User.findOne({_id: req.body.user
        }).lean();
        if (!user) {
            res.send({ "status" : "500","message":  "Nom d'utilisateur ou mot de passe incorrect !"});
            return
        }
        else{
            try{
                let geocode : any;
                geocode = req.body.idStation.replace("(","").replace(")","").replace(/\r\n/g,"");
                geocode = geocode.split(",")
                let latitude = parseFloat(geocode[0])*100000;
                let longitude = parseFloat(geocode[1])*100000;
                const station : any = await Stations.Station.findOne({"@latitude": latitude,
                "@longitude": longitude }).lean();
                if(station["@longitude"]==longitude &&station["@latitude"]==latitude){
                    user.favoriteStations.push(req.body.idStation);
                    await User.updateOne(
                    {
                        _id: req.body.user
                    },
                    {
                        $set :
                        {
                            favoriteStations : user.favoriteStations,
                        }
                    })
                    res.send({"status":"200","message":"Station correctement ajoutée aux favoris"});
                }else{
                    res.send({"status":"500","message":"Cette station n'existe pas."});
                }
                
            }catch(err){
                res.send({"status":"500","message":"Cette station n'existe pas."});
            }
            
        }
    }
    catch (err) {
        res.send({ "status":'500',"message":  "Utilisateur inconnu."});
        next(err);
    }
};

export const removeFavorite : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user : any = await User.findOne({_id: req.body.user
        }).lean();
        if (!user) {
            res.send({"status" : "500", "message":  "Nom d'utilisateur ou mot de passe incorrect !"});
            return
        }
        else {
            if (user.favoriteStations.includes(req.body.idStation)) {
                let index = user.favoriteStations.indexOf(req.body.idStation);
                let firstPart = user.favoriteStations.splice(0,index);
                user.favoriteStations.shift()
                let secondPart = user.favoriteStations;
                user.favoriteStations = firstPart.concat(secondPart);
                
                await User.updateOne(
                    {
                        _id: req.body.user
                    },
                    {
                        $set:
                            {
                                favoriteStations: user.favoriteStations,
                            }
                    })
                res.send({"status":"200","message":"Station supprimée des favoris."});
            }else{
                res.send({"status" : "500", "message":  "Cette station n'est pas dans votre liste de favoris."})
            }
        }
    }
    catch (err) {
        res.send({ "status":'500',"message":  "Utilisateur inconnu."});
        next(err);
    }
};

export const getListStationFav : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user : any = await User.findOne({_id: req.body.user
        }).lean();
        const listStationsString = user.favoriteStations;
        let listStations = [];
        for(let i = 0 ; i< listStationsString.length ; i++){
            let geocode : any;
            geocode = listStationsString[i].replace("(","").replace(")","").replace(/\r\n/g,"");
            geocode = geocode.split(",")
            let latitude = parseFloat(geocode[0])*100000;
            let longitude = parseFloat(geocode[1])*100000;
            try{
                const station : any = await Stations.Station.findOne({"@latitude": latitude,
                "@longitude": longitude }).lean();
                listStations.push(station)
            }catch(err){
                
            }
        }
        res.send({"status":"200","listStations":listStations});
    }
    catch (err) {
        res.send({"status":'500',"message":  "Utilisateur inconnu."});
        next(err);
    }
};

function checkPassword(pwd : string) {
    if (pwd.match( /[0-9]/g) && pwd.match( /[A-Z]/g) && 
    pwd.match(/[a-z]/g) && pwd.match( /[^a-zA-Z\d]/g) && pwd.length >= 10) {
        return true;
    }
    return false;
}


function checkMailAvailable(mail : string){
    let expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if (expressionReguliere.test(mail)) {
        return true;
    }
    return false;
}


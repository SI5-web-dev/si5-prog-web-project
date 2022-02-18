import { RequestHandler, Request, Response, NextFunction } from "express";
import User from '../models/user.js';
import HttpException from '../httpExeption';

import jwt from 'jsonwebtoken';

export const signup : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.surname) {
            res.send({ "message": "Il manque des informations.."});
            return
            
        }

        if (!checkMailAvailable(req.body.email)) {
            res.send({ "message":  "Veuillez entrer une adresse mail valide."});
            return
        }

        if (!checkPassword(req.body.password)) {
            res.send({ "message": "Le mot de passe n'est pas assez complexe."});
            return
        }


        // Création de l'user dans la BD
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            name : req.body.name,
            surname : req.body.surname
        });

        user.save().then(async () => {
            // Vérification avec l'email
            //let jwtTokenEmailVerify = jwt.sign({ email: req.body.email }, `${process.env.TOKEN_SECRET}`);

            res.send({ "message": "Votre compte a bien été créé !" });
            return
        })
        .catch(() => {
            console.log("pas bon")
            res.send({"message" : "Cette adresse e-mail est déjà utilisée."})
            return
        });
    }
    catch (err) {
        next(err);
    }
};


export const login : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user : any = await User.findOne({ email: req.body.email }).lean();
        if (!user) {
            res.send({ "message":  "Nom d'utilisateur ou mot de passe incorrect !"});
            return
        }

        if (!(user.password === req.body.password)) {
            res.send({ "message":  "Nom d'utilisateur ou mot de passe incorrect !"});
            return
        }
        res.send({ "message":  "Vous êtes connecté !", 'uid':user._id});
        return
    }
    catch (err) {
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


/*import { RequestHandler, Request, Response, NextFunction } from "express";
import User from '../models/user';
import RefreshToken from '../models/refreshToken'
import HttpException from '../utils';
import crypto from 'crypto';
import * as argon2 from "argon2";

export const signup : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.surname) {
            throw new HttpException(401, "controllers/user.ts", "Il manque des informations.");
        }

        if (!checkMailAvailable(req.body.email)) {
            throw new HttpException(401, "controllers/user.ts", "Veuillez entrer une adresse mail valide.");
        }

        if (!checkPassword(req.body.password)) {
            throw new HttpException(401, "controllers/user.ts", "Le mot de passe n'est pas assez complexe.");
        }

        // Hachage du mot de passe
        const salt = crypto.randomBytes(32);
        const options = {
            timeCost: 10,
            memoryCost: 16384,
            parallelism: 2,
            hashLength: 64,
        };
        const hash = await argon2.hash(req.body.password, salt, options);

        if (!hash) {
            throw new HttpException(500, "controllers/user.ts", "Erreur dans le hachage dans signup.");
        }

        // Création de l'user dans la BD
        const token = crypto.randomBytes(32);
        const user = new User({
            email: req.body.email,
            password: hash,
            name : req.body.name,
            surname : req.body.surname,
            isVerified : false,
            token: token.toString('hex')
        });


        user.save().then(async () => {
            // Vérification avec l'email
            let jwtTokenEmailVerify = jwt.sign({ email: req.body.email }, `${process.env.TOKEN_SECRET}`);

            // Création des dossier dans le serveur propre a l'utilisateur
            const userId : any = await User.findOne({ email: req.body.email }).lean();


            res.status(200).json({ message: "Votre compte a bien été créé !" });
        })
        .catch(() => res.status(401).json({"message" : "Cette adresse e-mail est déjà utilisée."}));
    }
    catch (err) {
        next(err);
    }
};


export const login : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user : any = await User.findOne({ email: req.body.email }).lean();
        if (!user) {
            throw new HttpException(401, "controllers/user.ts", "Nom d'utilisateur ou mot de passe incorrect !");
        }

        const valid = await argon2.verify(user.password, req.body.password);
        if (!valid) {
            throw new HttpException(401, "controllers/user.ts", "Nom d'utilisateur ou mot de passe incorrect !");
        }

        const {xsrfToken, accessToken, refreshToken} = generateToken(user._id);

        sendToken(res, xsrfToken, accessToken, refreshToken);
    }
    catch (err) {
        next(err);
    }
};


function generateToken(user_id : any) {
    const xsrfToken = crypto.randomBytes(64).toString('hex');

    const accessToken = jwt.sign(
        { userId: user_id, xsrfToken },
        `${process.env.TOKEN_SECRET}`,
        { expiresIn: parseInt(`${process.env.TOKEN_EXPIRES}`, 10) * 1000 }
    );


    const refreshToken = crypto.randomBytes(128).toString('base64');
    const refreshTokenExpires = Date.now() + (parseInt(`${process.env.REFRESH_TOKEN_EXPIRES}`, 10) * 1000);
    
    RefreshToken.findOne({ userId: user_id })
        .then((refresh) => {
            if (refresh == null) {
                new RefreshToken({
                    refreshToken: refreshToken,
                    expires: refreshTokenExpires,
                    userId: user_id
                }).save();
            }
            else {
                RefreshToken.updateOne({ userId: user_id }, {refreshToken: refreshToken, expires: refreshTokenExpires})
                    .then(() => {})
                .catch(error => { throw new HttpException(500, "controllers/user.ts", error); });
            }
        })
    .catch(error => { throw new HttpException(500, "controllers/user.ts", error); });

    return {xsrfToken, accessToken, refreshToken};
}


function sendToken(res : Response, xsrfToken : string, accessToken : string, refreshToken : string) {
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,      
        maxAge: parseInt(process.env.TOKEN_EXPIRES!, 10) * 1000
    });


    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,     
        maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRES!, 10) * 1000,
        path: 'api/auth/refresh'
    });


    res.status(200).json({
        accessTokenExpires: Date.now() + (parseInt(`${process.env.TOKEN_EXPIRES}`, 10) * 1000),
        refreshTokenExpires: Date.now() + (parseInt(`${process.env.REFRESH_TOKEN_EXPIRES}`, 10) * 1000),
        xsrfToken
    });
}


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
}*/


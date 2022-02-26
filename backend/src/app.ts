import * as path from "path";
import express from "express";
import querysRoutes from './routes/querys.js';
import userRoutes from './routes/user.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import * as http from 'http';
import "dotenv/config";
import {loadAndUpdateEssenceStationsAutomatically, loadEssenceStationsHistory} from "./loadStations.js";
import * as utils from "./utils.js";
import { exec, spawn } from "child_process";

export const startServer = async (PORT:number,test:boolean) => {
    const app = express();

    exec('pip install xmltodict', async (error:any, stdout:string, stderr:any) => {console.log(stdout)});

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-xsrf-token');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const __Dirname = dirname(fileURLToPath(import.meta.url));
    // Demande a node de servir les fichiers react
    app.use(express.static(path.resolve(__Dirname, '../../../frontend/acence/build')));

    app.use('/user', userRoutes);

    app.use('/querys', querysRoutes);


    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__Dirname, '../../../frontend/acence/build', 'index.html'));
    
    });
    // Connexion avec la base de donnée Mongo
    mongoose.connect(`${process.env.DB_CONN_STRING}`)
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch((err) => console.log('Connexion à MongoDB échouée !' + err));

    if(!test){
        loadAndUpdateEssenceStationsAutomatically();
    }
    utils.default.getVilles();

//loadEssenceStationsHistory("2017");
//loadEssenceStationsHistory("2018");
//loadEssenceStationsHistory("2019");
//loadEssenceStationsHistory("2020");
//loadEssenceStationsHistory("2021");
//loadEssenceStationsHistory("2022");
    //const port = process.env.PORT;
    app.set('port', PORT);
    var serverHttp = app.listen(PORT, () => {
        console.log("Server http is running on port " + PORT);
    });
    return serverHttp
};





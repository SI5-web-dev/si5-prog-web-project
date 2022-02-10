import * as path from "path";
import express from "express";
import querysRoutes from './routes/querys.js';
import userRoutes from './routes/user.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import "dotenv/config";
import * as fs from "fs";
import * as https from "https";
import * as unzipper from 'unzipper';


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-xsrf-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = dirname(fileURLToPath(import.meta.url));
// Demande a node de servir les fichiers react
app.use(express.static(path.resolve(__dirname, '../../frontend/acence/build')));

app.use('/user', userRoutes);

app.use('/querys', querysRoutes);

// Connexion avec la base de donnée Mongo
mongoose.connect(`${process.env.DB_CONN_STRING}`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log('Connexion à MongoDB échouée !' + err));



https.get('https://donnees.roulez-eco.fr/opendata/instantane', function(response) {
    response.on('data', function(data) {
        fs.appendFileSync('./stations.zip', data);
    });
    response.on('end', async function() {
        fs.createReadStream('./stations.zip')
            .pipe(unzipper.Parse())
            .on('entry', function (entry:any) {
                var fileName = entry.path;
                var type = entry.type; // 'Directory' or 'File'

                if (/\/$/.test(fileName)) {
                    console.log('[DIR]', fileName, type);
                    return;
                }

                console.log('[FILE]', fileName, type);

                entry.pipe(fs.createWriteStream('./stations.xml'))
                    .on('finish', function () {
                        console.log("fichier ./stations.xml pret");
                        fs.unlinkSync("./stations.zip")
                    });
            });
    });
});


export default app;
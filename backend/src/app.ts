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
import * as zlib from "zlib";

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

console.log("test")


https.get('https://donnees.roulez-eco.fr/opendata/instantane', function(response) {
    response.on('data', function(data) {
        fs.appendFileSync('./test.zip', data);
    });
    response.on('end', async function() {
        console.log('hello');
         var inStream = fs.createReadStream("test.zip");
         var outStream = fs.createWriteStream("input.txt");
         var unzip = zlib.createGunzip();

         //inStream.pipe(unzip).pipe(outStream);

        //fs.createReadStream('test.zip').pipe(unzip.Extract({ path: '.' }));
    });
});

export default app;
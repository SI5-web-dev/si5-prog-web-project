import * as path from "path";
import express from "express";
import userRoutes from './routes/user.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-xsrf-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const __dirname = dirname(fileURLToPath(import.meta.url));
// Demande a node de servir les fichiers react
app.use(express.static(path.resolve(__dirname, '../../frontend/acence/build')));

app.use('/user', userRoutes);

// Connexion avec la base de donnée Mongo
mongoose.connect(`${process.env.DB_CONN_STRING}`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log('Connexion à MongoDB échouée !' + err));

export default app;
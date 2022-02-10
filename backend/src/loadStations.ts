import https from "https";
import fs from "fs";
import * as unzipper from "unzipper";
import xmLToJSON from "./xmLToJSON.js";

let zip = "./stations.zip";
let xmlFile = "./stations.xml";
let jsonFile = "./stations.json";

export function loadEssenceStations() {
    https.get('https://donnees.roulez-eco.fr/opendata/instantane', function (response) {
        response.on('data', function (data) {
            fs.appendFileSync(zip, data);
        });
        response.on('end', function () {
            fs.createReadStream(zip)
                .pipe(unzipper.Parse())
                .on('entry', function (entry: any) {
                    var fileName = entry.path;
                    var type = entry.type; // 'Directory' or 'File'

                    if (/\/$/.test(fileName)) {
                        console.log('[DIR]', fileName, type);
                        return;
                    }
                    console.log('[FILE]', fileName, type);

                    entry.pipe(fs.createWriteStream(xmlFile))
                        .on('finish', function () {
                            console.log("fichier ./stations.xml prêt");
                            fs.unlinkSync(zip)
                        });
                });
        });
        xmLToJSON(xmlFile , jsonFile);//jsonFile contient le json à mettre sur MongoDB (une étape préliminaire est d'éliminer pdv
    });
}

export function loadAndUpdateEssenceStationsAutomatically() {
    loadEssenceStations();
    setTimeout(loadAndUpdateEssenceStationsAutomatically, 900000); //every 15minutes
}


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
                        .on('finish', async function () {
                            console.log("fichier ./stations.xml prêt");
                            fs.unlinkSync(zip);

                            let json = await xmLToJSON(xmlFile);
                            if (typeof json === "string") {
                                json = JSON.parse(json);
                            }
                            console.log(typeof json);//object

                            fs.unlinkSync(xmlFile);//Suppression du fichier xml car il nous a servie à créer le fichier json et ne sert donc plus à rien

                        });
                });
        });
    });
}

export function loadAndUpdateEssenceStationsAutomatically() {
    loadEssenceStations();
    setInterval(loadEssenceStations, 900000);
}
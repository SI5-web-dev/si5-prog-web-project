import https from "https";
import fs from "fs";
import * as unzipper from "unzipper";
import xmLToJSON from "./xmLToJSON.js";
import Station from "./models/station.js";

let zip = "./stations.zip";
let xmlFile = "./stations.xml";

export function loadEssenceStations() {
    fs.readdirSync("./").forEach(file =>{
        if(file === "stations.zip" || file === "stations.xml"){
            fs.unlinkSync(file);
            console.log('Old file removed')
        }
    });
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

                            let json:any = await xmLToJSON(xmlFile);
                            if (typeof json === "string") {
                                json = JSON.parse(json);
                            }
                            await fs.promises.unlink(xmlFile);

                            // try{
                            //     await Station.deleteMany({});
                            //     console.log("Old documents deleted successfully");
                            // }
                            // catch (error){
                            //     console.log(error);
                            // }
                            //
                            // try {
                            //     await Station.insertMany(json);
                            //     console.log("Data inserted");
                            // }
                            // catch (error){
                            //     console.log(error);
                            // }
                        });
                });
        });
    });
}

export function loadAndUpdateEssenceStationsAutomatically() {
    loadEssenceStations();
    setInterval(loadEssenceStations, 900000);
}
import https from "https";
import fs from "fs";
import * as unzipper from "unzipper";
import xmLToJSON from "./xmLToJSON.js";
import Station from "./models/station.js";

let zip = "./stations.zip";
let xmlFile = "./stations.xml";

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

                            let json:any = await xmLToJSON(xmlFile);
                            if (typeof json === "string") {
                                json = JSON.parse(json);
                            }
                            //console.log(typeof json);//object

                            //fs.unlinkSync(xmlFile);//Suppression du fichier xml car il nous a servie à créer le fichier json et ne sert donc plus à rien
                            //console.log(json[0]["@id"])
                            // for (let i = 0; i < json.length; i++) {
                            //     const station = new Station({
                            //         "id" : json[i]["@id"],
                            //         "@latitude" : json[i]["@latitude"],
                            //         "@longitude" : json[i]["@longitude"],
                            //         "@cp" : json[i]["@cp"],
                            //         "@pop" : json[i]["@pop"],
                            //         "adresse" : json[i]["adresse"],
                            //         "ville" : json[i]["ville"],
                            //         "horaires" : json[i]["horaires"],
                            //         "services" : json[i]["services"],
                            //         "prix" : json[i]["prix"],
                            //     })
                            //
                            //     // await station.save();
                            //     // console.log("insertedddddddddddddddddddddddddd")
                            //     Station.insertMany(json).then( () => {
                            //         console.log("Data inserted")
                            //     })
                            // }

                            try{
                                await Station.deleteMany({});
                                console.log("Old documents deleted successfully");
                            }
                            catch (error){
                                console.log(error);
                            }

                            try {
                                await Station.insertMany(json);
                                console.log("Data inserted");
                            }
                            catch (error){
                                console.log(error);
                            }
                        });
                });
        });
    });
}

export function loadAndUpdateEssenceStationsAutomatically() {
    loadEssenceStations();
    setInterval(loadEssenceStations, 900000);
}
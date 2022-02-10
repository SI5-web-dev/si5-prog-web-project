import https from "https";
import fs from "fs";
import * as unzipper from "unzipper";

    export function loadEssenceStations ()
{
    if(fs.existsSync("./stations.xml")){
        fs.unlinkSync("./stations.xml")
    }
    if(fs.existsSync("./stations.zip")){
        fs.unlinkSync("./stations.zip")
    }
    https.get('https://donnees.roulez-eco.fr/opendata/instantane', function (response) {
        response.on('data', function (data) {
            fs.appendFileSync('./stations.zip', data);
        });
        response.on('end', function () {
            fs.createReadStream('./stations.zip')
                .pipe(unzipper.Parse())
                .on('entry', function (entry: any) {
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
}

    export function loadAndUpdateEssenceStationsAutomatically () {
        loadEssenceStations();
        setTimeout(loadAndUpdateEssenceStationsAutomatically, 900000); //every 15minutes
}


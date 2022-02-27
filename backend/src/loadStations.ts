import https from "https";
import fs from "fs";
import * as unzipper from "unzipper";
import xmLToJSON from "./xmLToJSON.js";
import Stations from "./models/station.js";
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

                            for(const theStation of json)
                                {
                                    try {
                                        await Stations.Station.updateOne({
                                            "@latitude": theStation["@latitude"],
                                            "@longitude": theStation["@longitude"]
                                        }, theStation).then();
                                    }catch (error){
                                        console.log(error);
                                    }
                            }
                            console.log("data updated")
                            /*try{
                                await Stations.Station.deleteMany({});
                                console.log("Old documents deleted successfully");
                            }
                            catch (error){
                                console.log(error);
                            }

                            try {
                                await Stations.Station.insertMany(json);
                                console.log("Data inserted");
                            }
                            catch (error){
                                console.log(error);
                            }*/

                        });
                });
        });
    });
}

export function loadAndUpdateEssenceStationsAutomatically() {
    loadEssenceStations();
    setInterval(loadEssenceStations, 900000);
}

export function loadEssenceStationsHistory(year: String) {
    let zip = "./stations"+year+".zip";
    let xmlFile = "./stations"+year+".xml";
    fs.readdirSync("./").forEach(file =>{
        if(file === "stations"+year+".zip" || file === "stations"+year+".xml"){
            fs.unlinkSync(file);
            console.log('Old file removed')
        }
    });
        https.get('https://donnees.roulez-eco.fr/opendata/annee/' + year, function (response) {
            if(response.statusCode === 200){
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
                                console.log("fichier ./stations" + year + ".xml prêt");
                                fs.unlinkSync(zip);

                                let json: any = await xmLToJSON(xmlFile);
                                if (typeof json === "string") {
                                    json = JSON.parse(json);
                                }
                                fs.promises.unlink(xmlFile).then(() => {

                                    let yearStation: any;
                                    switch (year) {
                                        case "2007":
                                            yearStation = Stations.Station2007;
                                            break;
                                        case "2008":
                                            yearStation = Stations.Station2008;
                                            break;
                                        case "2009":
                                            yearStation = Stations.Station2009;
                                            break;
                                        case "2010":
                                            yearStation = Stations.Station2010;
                                            break;
                                        case "2011":
                                            yearStation = Stations.Station2011;
                                            break;
                                        case "2012":
                                            yearStation = Stations.Station2012;
                                            break;
                                        case "2013":
                                            yearStation = Stations.Station2013;
                                            break;
                                        case "2014":
                                            yearStation = Stations.Station2014;
                                            break;
                                        case "2015":
                                            yearStation = Stations.Station2015;
                                            break;
                                        case "2016":
                                            yearStation = Stations.Station2016;
                                            break;
                                        case "2017":
                                            yearStation = Stations.Station2017;
                                            break;
                                        case "2018":
                                            yearStation = Stations.Station2018;
                                            break;
                                        case "2019":
                                            yearStation = Stations.Station2019;
                                            break;
                                        case "2020":
                                            yearStation = Stations.Station2020;
                                            break;
                                        case "2021":
                                            yearStation = Stations.Station2021;
                                            break;
                                        case "2022":
                                            yearStation = Stations.Station2022;
                                            break;
                                        default:
                                            break;
                                    }
                                    if (yearStation !== undefined) {

                                        yearStation.deleteMany({}).then(() => {
                                                console.log("Old documents deleted successfully");
                                            },
                                            (err: any) => {
                                                console.log(err);
                                            });


                                    }
                                })

                            });

                    });
            });
        }})
}
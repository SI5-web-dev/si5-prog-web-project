import { RequestHandler, Request, Response, NextFunction } from "express";
import Stations from '../models/station.js';

export const askStation : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    
        let latitiude = parseFloat(req.body.latitude)*100000
        let longitude = parseFloat(req.body.longitude)*100000
        if(!checkParameter(req.body)){
            res.send({"status" : "401","message" : "Des informations sont manquantes"});
            return
        }
        let list : JSON[] = [];

        const stations : any = await Stations.Station.find({$and:[
                                                    {$and:[
                                                        {'@latitude': {$lt : latitiude +7000}} , 
                                                        {'@latitude': {$gt : latitiude-7000}}
                                                    ]},
                                                    {$and:[
                                                        {'@longitude': {$lt : longitude +10000}} , 
                                                        {'@longitude': {$gt : longitude-10000}}
                                                    ]}
                                                ]}).lean()
    stations.forEach((station:any) => {
        let added = false;
        if(station.prix) {
            station.prix.forEach((price: any) => {
                if (!added) {
                    if (req.body.Gazole && price["@nom"] === "Gazole") {
                            list.push(station);
                            added = true;
                    } else if (req.body.SP95E10 && price["@nom"] === "SP95E10") {
                            list.push(station);
                            added = true;
                    } else if (req.body.SP98 && price["@nom"] === "SP98") {
                            list.push(station);
                            added = true;
                    } else if (req.body.SP95 && price["@nom"] === "SP95") {
                            list.push(station);
                            added = true;
                    } else if (req.body.GPLc && price["@nom"] === "GPLc") {
                            list.push(station);
                            added = true;
                    } else if (req.body.E85 && price["@nom"] === "E85") {
                            list.push(station);
                            added = true;
                    }
                }
            });
        }
    });
    res.send({"status":"200","list":list});
   
    
}

function checkParameter(body : any){
    if(typeof parseFloat(body.latitude) !== "number") return false;
    if(typeof parseFloat(body.longitude) !== "number") return false;
    if(typeof body.Gazole !== "boolean" ) return false;
    if(typeof body.SP95E10 !== "boolean" ) return false;
    if(typeof body.SP98 !== "boolean" ) return false;
    if(typeof body.SP95 !== "boolean" ) return false;
    if(typeof body.GPLc !== "boolean" ) return false;
    if(typeof body.E85 !== "boolean"  ) return false;
    return true;

}

export const historyStation : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
        let latitude = parseFloat(req.body.latitude)*100000;
        let longitude = parseFloat(req.body.longitude)*100000;

        let listPrice :any = [];
        let dataFinal :any = [];

        await loadPricesStation("2021",latitude,longitude, listPrice);
        await loadPricesStation("2022",latitude,longitude, listPrice);
                let echantillon = 1;
                if (listPrice.length > 50) {
                    echantillon = parseInt(String(listPrice.length / 20));
                }

                for (let i = 0; i < listPrice.length; i = i + echantillon) {
                    dataFinal.push(listPrice[i]);
                }
                res.send({"status":"200", "listPrices" : dataFinal});

};

async function loadPricesStation(year: string, latitude: number, longitude: number, listPrice:any) {
    let stationsModel: any;
    switch (year) {
        case "2020":
            stationsModel = Stations.Station2020;
            break;
        case "2021":
            stationsModel = Stations.Station2021;
            break;
        case "2022":
            stationsModel = Stations.Station2022;
            break;
        default:
            break;
    }
    const station: any = await stationsModel.findOne({
        "@latitude": latitude,
        "@longitude": longitude
    }).lean()
        if (station) {
            if (station.prix) {
                let date = station.prix[0]["@maj"].slice(0, 10);

                let indexStartE10 = 0;


                for (let i = 0; i < station.prix.length; i++) {
                    if (indexStartE10 === 0 && station.prix[i]["@nom"] === 'E10') {
                        indexStartE10 = i;
                    }
                    if (date !== station.prix[i]["@maj"].slice(0, 10) && station.prix[i]["@nom"] === 'Gazole') {
                        let prixGazole: { [key: string]: any } = {
                            "date": "",
                            "Gazole": 0,
                        }
                        listPrice.push(prixGazole)
                        date = station.prix[i]["@maj"].slice(0, 10);
                        prixGazole.date = station.prix[i]["@maj"].slice(0, 10);
                        prixGazole.Gazole = station.prix[i]["@valeur"] / 1000;
                    }
                    if (station.prix[i]["@nom"] === 'E10') {
                        for (let z = 0; z < listPrice.length; z++) {
                            if (listPrice[z].date === station.prix[i]["@maj"].slice(0, 10)) {
                                listPrice[z]["E10"] = station.prix[i]["@valeur"] / 1000;
                            }
                        }
                    } else if (station.prix[i]["@nom"] === 'SP98') {
                        for (let p = 0; p < listPrice.length; p++) {
                            if (listPrice[p].date === station.prix[i]["@maj"].slice(0, 10)) {
                                listPrice[p]["SP98"] = station.prix[i]["@valeur"] / 1000;
                            }
                        }
                    }
                }
            }
        }
        return listPrice;
}

export const cheapest : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    res.send("ok");
}
import { RequestHandler, Request, Response, NextFunction, json } from "express";
import mongoose from 'mongoose';
import Station from '../models/station.js';

export const proximity : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    console.log(req.body);
    if(!checkParameter(req.body)){
        res.send({"status" : "401","message" : "Des informations sont manquantes"});
        return
    }
    let list : JSON[] = []
    const stations : any = await Station.find({ville: req.body.location }).lean();
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
        //console.log(list)
    });
    res.send({"status":"200","list":list});
}

function checkParameter(body : any){
    console.log(typeof body.Gazole)
    
    if(typeof body.location !== "string") return false;
    if(typeof body.Gazole !== "boolean" ) return false;
    if(typeof body.SP95E10 !== "boolean" ) return false;
    if(typeof body.SP98 !== "boolean" ) return false;
    if(typeof body.SP95 !== "boolean" ) return false;
    if(typeof body.GPLc !== "boolean" ) return false;
    if(typeof body.E85 !== "boolean"  ) return false;
    return true;

}

export const cheapest : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    res.send("ok");
}
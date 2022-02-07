import { RequestHandler, Request, Response, NextFunction, json } from "express";
import mongoose from 'mongoose';
import Station from '../models/station.js';

export const proximity : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    console.log(req.body);
    let list : JSON[] = []
    const stations : any = await Station.find({ville: req.body.location }).lean();
    var breakException = "";
    stations.forEach((station:any) => {
        let added = false;
        station.prix.forEach((price:any) => { 
            if(!added){
                if(req.body.Gazole && price["@nom"]==="Gazole"){
                    list.push(station);
                    added = true;
                }else if(req.body.SP95E10 && price["@nom"]==="SP95E10"){
                    list.push(station);
                    added = true;
                }else if(req.body.SP98 && price["@nom"]==="SP98"){
                    list.push(station);
                    added = true;
                }else if(req.body.SP95 && price["@nom"]==="SP95"){
                    list.push(station);
                    added = true;
                }else if(req.body.GPLc && price["@nom"]==="GPLc"){
                    list.push(station);
                    added = true;
                }else if(req.body.E85 && price["@nom"]==="E85"){
                    list.push(station);
                    added = true;
                }
            }
            
        });
        console.log(list)
    });
    
    res.send("ok");
    
}

export const cheapest : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    res.send("ok");
}
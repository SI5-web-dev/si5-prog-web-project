import { RequestHandler, Request, Response, NextFunction, json } from "express";
import mongoose from 'mongoose';
import Station from '../models/station.js';
import * as utils from "../utils.js"
import { exec, spawn } from "child_process";

export const proximity : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    exec('python geocoder.py "'+req.body.location+'"', async (error:any, stdout:string, stderr:any) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        let geocode : any= stdout
        geocode = geocode.replace("(","").replace(")","").replace(/\r\n/g,"");
        geocode = geocode.split(",")
        let latitiude = parseFloat(geocode[0])*100000
        let longitude = parseFloat(geocode[1])*100000
        console.log(latitiude , longitude);
        if(!checkParameter(req.body)){
            res.send({"status" : "401","message" : "Des informations sont manquantes"});
            return
        }
        let list : JSON[] = [];

        const stations : any = await Station.find({$and:[
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
        //console.log(list)
        });
        res.send({"status":"200","list":list});
    })
    
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
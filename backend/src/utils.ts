import mongoose from 'mongoose';
import Station from './models/station.js';
import { exec, spawn } from "child_process";
class Utils {
    
    static async getVilles() {
        let listVille:any[]=[];
        const stationsVille : any = await Station.find().lean();
        stationsVille.forEach((station:any) => {
            if(!listVille.includes(station.ville)){
                listVille.push(station.ville.toString().toLowerCase())
            }
        });
        //console.log(listVille)
        // A finir

    }

    
    static async getGeocode(localisation:string) {
        exec('python geocoder.py "'+localisation+'"', (error:any, stdout:string, stderr:any) => {
            if (error) {
                console.error(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            return stdout
        })
        
    }
}


export default Utils;
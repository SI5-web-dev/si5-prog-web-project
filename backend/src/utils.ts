import mongoose from 'mongoose';
import Stations from './models/station.js';
import { exec } from "child_process";
class Utils {
    
    static async getVilles() {
        let listVille:any[]=[];
        const stationsVille : any = await Stations.Station.find().lean();
        stationsVille.forEach((station:any) => {
            if(!listVille.includes(station.ville)){
                listVille.push(station.ville.toString().toLowerCase())
            }
        });

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
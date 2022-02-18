import mongoose from 'mongoose';
import Station from './models/station.js';


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
}


export default Utils;
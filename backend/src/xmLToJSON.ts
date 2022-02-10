import * as fs from 'fs' ;
import xml2js from "xml2js";
import * as util from "util";

let parser = new xml2js.Parser();

function convertXMLToJSON(xmlFile:string, jsonFile:string){
    fs.readFile(xmlFile, function(err, data) {
        parser.parseString(data, function (err: any, result: any) {
            if (err) {
                throw err;
            }
            console.log(util.inspect(result, false, null))
            //JSON.stringify(result)
            //console.log(result);
            console.log('Done');
            let writeStream = fs.createWriteStream(jsonFile);
            writeStream.write(util.inspect(result, false, null));
        });
    });
}

export default convertXMLToJSON;
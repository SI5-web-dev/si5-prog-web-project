import * as fs from 'fs' ;
import xml2js from "xml2js";
import * as util from "util";

let parser = new xml2js.Parser();

function convertXMLToJSON(xmlFile: string) {
    return new Promise((resolve) => {
        fs.readFile(xmlFile,"utf8", function (err, data) {
            parser.parseString(data, function (err: any, result: any) {
                if (err) {
                    throw err;
                }
                console.log('Done');

                let json = util.inspect(result, false, null);
                console.log(`Type : ${typeof json}`);

                json = json.slice(26);
                json = json.slice(0 , json.length -6 );
                json = JSON.parse(JSON.stringify(json));

                //JSON.stringify(result);
                //fs.createWriteStream("./ossaZ.json").write(json);
                //console.log(json);

                resolve(json);
            });
        });
    })
}

export default convertXMLToJSON;


/*let writeStream = fs.createWriteStream(jsonFile);
            writeStream.write(util.inspect(result, false, null));
            writeStream.on('finish', function () {
                console.log('file has been written');
            });
            writeStream.on('end', function () {
                console.log('Enddddddd');
            });*/
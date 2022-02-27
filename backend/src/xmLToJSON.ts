import  {spawn} from "child_process"//.spawn;

function convertXMLToJSON(xmlFile: string) {
    return new Promise((resolve) => {
        const pythonProcess = spawn('python',["./xml_to_json.py" , xmlFile]);

        pythonProcess.stdout.on('data', (data) => {
            // Do something with the data returned from python script
            let json = data.toString();
            json = json.slice(22);
            json = json.slice(0 , json.length - 2 );
            json = JSON.parse(JSON.stringify(json));
            resolve(json);
        });

        pythonProcess.on('close', (code) => {
            // Do something with the data returned from python script
            console.log(`Python script exited with code ${code}`)
        });

        pythonProcess.stderr.on('data', (data) => {
            // Do something with the data returned from python script
            console.error(`stderr: ${data}`)
        });
    })
}

export default convertXMLToJSON;

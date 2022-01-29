import * as http from 'http';
import app from "./app.js";
import "dotenv/config";

const port = process.env.PORT;
app.set('port', port);
const serverHttp = http.createServer(app);
serverHttp.listen(port, () => {
    console.log("Server http is running on port " + port);
});
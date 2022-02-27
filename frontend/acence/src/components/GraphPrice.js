import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useEffect, useState} from "react";
import * as Utils from "../Utils";

const GraphPrice = (props) => {
    const [listPrices, setListPrices] = useState([]);
    useEffect(() => {
        let request = JSON.stringify({ 'latitude': props.latitude,'longitude': props.longitude})
        Utils.default.sendRequest('POST', '/querys/historyStation', request, (res)=> {
            setListPrices(JSON.parse(res).listPrices)
        });
    },[props.latitude, props.longitude]);

    function CreateChart() {
       if(listPrices.length>4){
           return (
               <ResponsiveContainer width="100%" height="100%">
                   <LineChart
                       width={500}
                       height={300}
                       data={listPrices}
                       margin={{
                           top: 5,
                           right: 30,
                           left: 20,
                           bottom: 5,
                       }}
                   >
                       <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey="date" />
                       <YAxis domain={[1,2]}/>
                       <Tooltip />
                       <Legend />
                       <Line type="monotone" dataKey="Gazole" stroke="#8884d8" activeDot={{ r: 1 }} />
                       <Line type="monotone" dataKey="E10" stroke="#82ca9d" activeDot={{ r: 1 }} />
                       <Line type="monotone" dataKey="SP98" stroke="#f0ae91" activeDot={{ r: 1 }} />
                   </LineChart>
               </ResponsiveContainer>
           );
       }else{
           return (
               <div>L'historique des prix n'est pas disponible pour cette station</div>
           )
       }
    }

    return (
        <CreateChart/>
    );
};

export default GraphPrice;


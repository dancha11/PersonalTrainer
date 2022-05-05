import React, {useState, useEffect} from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import _ from 'lodash';

export default function Chart({link}) {

    const [trainings, setTrainings] = useState([]);

    useEffect(()=> {
    function fetchData(){
        fetch(link)
        .then(response=>response.json())
        .then(data=>setTrainings(data.content))
        .catch(err=>console.log(err))
    }
    fetchData();   
    } , []); // eslint-disable-line react-hooks/exhaustive-deps

    
    const chartData = trainings.map((training) => {
        return {
            name: training.activity,
            mins: parseInt(training.duration)
        }
    })

    const data = _(chartData)
    .groupBy('name')
    .map((activity, id)=> ({
        name: id,
        mins: _.sumBy(activity, 'mins')

    }))
    .value()

return (
    <div>
    <h1>Statistics page</h1>

    <BarChart width={700} height={400} data={data}   margin={{ top: 50, right: 20, left: 50, bottom: 5 }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Total duration in minutes', angle: -90, position: 'insideLeft' }}/>
        <Tooltip />
        <Bar dataKey="mins" fill="#00394e" />
    </BarChart>
    </div>
  );
}
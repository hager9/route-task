import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale , CategoryScale, PointElement, LineElement, Title,Tooltip, Legend} from "chart.js";

ChartJS.register(LinearScale , CategoryScale, PointElement, LineElement, Title,Tooltip, Legend);


export default function Chart({data, customerName}) {

    const lineCharData = {
            labels: data.map(d => d.date),
            datasets: [{
                label: `Total Transaction Amount for ${customerName}`,
                data: data.map(d => d.amount),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
              }]
    }

    const options = {};



  return (
    <div className="w-full lg:w-6/12 mt-5">
               <Line
   options={options}
   data={lineCharData}
   />
    </div>

  )
}

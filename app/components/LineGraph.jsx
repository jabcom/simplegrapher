import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";

const colours = ['#072448', '#54d2d2', '#ffcb00', '#f8aa4b', '#ff6150', '#1f306e', '#553772', '#8f3b76', '#c7417b', '#f5487f']

function getColour(index) {
  if (index < colours.length) {
    return colours[index]
  }
  return colours[index % colours.length]
}

const LineGraph = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      scales: {
        xAxis: {
          type: 'time',
        }
      }
    },
  };

  const [chartData, setChartData] = useState(null)


  function formatChartData(data) {
    let labels = []
    let datasets = []
    let datasetObj = {}
    for (let entry of data) {
      const time = new Date(entry.time)
      const timeString = time.toLocaleTimeString()
      labels.push(timeString)
      Object.keys(entry.reading).forEach(readingDataKey => {
        const datasetName = `${entry.sensor} ${readingDataKey}`
        // Create dataset if it doesn't exist
        if (!datasetObj[datasetName]) {
          datasetObj[datasetName] = {
            label: datasetName,
            data: [],
            fill: false,
            borderColor: colours[Object.keys(datasetObj).length],
            tension: 0.1
          }
        // Add data to dataset
        }
        datasetObj[datasetName].data.push({x: timeString, y: entry.reading[readingDataKey]})
        //datasetObj[datasetName].data.push(entry.reading[readingDataKey])
      })
    }
    // Convert dataset object to array
    Object.keys(datasetObj).forEach(datasetName => {
      datasets.push(datasetObj[datasetName])
    })
    return {labels, datasets}
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/getData')
        .then(res => res.json())
        .then(returndData => {
          if (returndData.result !== "success") {
            console.log(returndData.error)
            return
          }
          console.log(returndData.data)
          //if (returndData.data.length === chartData.length) {
          //  console.log("no new data")
          //  return // No new data
          //} // Just update the bloody thing
          console.log("new data")
          setChartData(formatChartData(returndData.data))
        })
        .catch(err => console.log(err))
    }, 1000)
    return () => clearInterval(interval)
  }, [])


  return (<>
    {chartData ? <Line options={options} data={chartData} /> : <h1>Loading...</h1>}
    </>
  )
}

export default LineGraph
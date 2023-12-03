"use client"

import { useEffect, useState } from 'react'
import LineGraph from './components/LineGraph'

export default function Home() {

  const [graphData, setGraphData] = useState({})

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetch('/api/getData')
        .then(res => res.json())
        .then(data => {
          if (data.result !== "success") {
            console.log(data.error)
            return
          }
          setGraphData(data.data)
        })
        .catch(err => console.log(err))
    }, 1000)
    return () => clearTimeout(timeOut)
  }, [])

  return (
    <main>
      {graphData ? <LineGraph data={graphData} /> : <h1>No Data ... trying to load</h1>}
    </main>
  )
}

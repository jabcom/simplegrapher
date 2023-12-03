"use client"

import { useEffect, useState } from 'react'
import LineGraph from './components/LineGraph'

export default function Home() {

  const [graphData, setGraphData] = useState({})

  return (
    <main>
      <LineGraph />
    </main>
  )
}

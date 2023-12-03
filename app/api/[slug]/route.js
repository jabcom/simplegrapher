import fs from 'fs'

export const dynamic = 'force-dynamic' // defaults to force-static
export const fetchCache = 'no-cache' // defaults to default

export async function GET(request, { params }) {
  const slug = params.slug

  //Get Data
  if ( slug === "getData" ) {
    // Read from a csv file
    const csvPath = 'data.csv'
    const csv = fs.readFileSync(csvPath, 'utf8')
    const lines = csv.split('\n')
    let data = []
    try {
      for (let line of lines) {
        const [time, sensor] = line.split(',')
        const reading = line.split(sensor + ',')[1] // handle commas in reading - not perfect - but works
        if (time && sensor && reading) {
          let readingObj = JSON.parse(reading)
          data.push({time, sensor, reading: readingObj})
        }
      }
      return Response.json({result: "success", data: data})
    } catch (error) {
      console.log(error)
      return Response.json({result: "error", error: error})
    }
    return Response.json({result: "error"})
  }

  // Set Data
  if ( slug === "setData" ) {
  const searchParams = request.nextUrl.searchParams
  const dataString = searchParams.get('data')
  try {
    const data = JSON.parse(dataString)
    console.log(data)
    const sensor = data.sensor.replace(/,/g, '') // Remove commas from sensor name - just in case
    const reading = JSON.stringify(data.reading)
    const timeString = new Date().toISOString()
    // Save to a csv file
    const csv = `${timeString},${sensor},${reading}\n`
    const csvPath = 'data.csv'
    fs.appendFileSync(csvPath, csv)
  } catch (error) {
    console.log(error)
    return Response.json({result: "error", error: error})
  }
  return Response.json({result: "success"})
  }
return Response.json({result: "error"})
}

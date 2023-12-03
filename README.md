This is a [Next.js](https://nextjs.org/) project for graphing simple data which is saved in a csv file

Data can be added with a GET request to /api/setData with a JSON data string for the readings and sensor name

The data string should be JSON and contain a "sensor" and "readings" element. Sensor should be the name of the physical sensor, and readings contain a object of all the values to be stored.

The data is stored in data.csv and can be edited as required

e.g.:
http://localhost:3000/api/setData?data={"sensor":"sensor1","reading":{"humidity":7,"temprature":5}}

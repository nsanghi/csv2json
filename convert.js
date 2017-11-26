const csv = require('csvtojson')
const fs = require('fs')

const csvFilePath=process.argv[2]

let buff = []

csv()
.fromFile(csvFilePath)
.on('json', jsonObj => {
  buff.push(jsonObj)
})
.on('error', (err) => {
  console.log(err)
  process.exit(1)
})
.on('done', (error) => {
  if (error) {
    console.log(error) 
    process.exit(1)
  } else {
    fs.writeFileSync(csvFilePath.slice(0,-3)+'json', 
      JSON.stringify(buff, null, 2))
    console.log('conversion done!')
  }
})


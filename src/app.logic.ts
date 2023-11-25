import  fs from 'fs'
import { yarg } from "./config/plugins/args.plugin"


const {b: base, l:limit, s: show} = yarg

const headerMessage = `
=======================================
        Tabla del ${base}
=======================================\n        
`

let outputMessage= headerMessage

for(let i= 1; i<=limit; i++){
    outputMessage += `${base} x ${i} = ${base*i}\n`
}

const outputPath = 'outputs'

fs.mkdirSync(outputPath, {recursive: true})
fs.writeFileSync(`${ outputPath}/tabla-${base}.txt`, outputMessage)
console.log('File created!')

if (show) console.log(outputMessage)

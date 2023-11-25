import  fs from 'fs'
import { error } from "console"

export interface ISaveFileUseCase {
    executionAsyncResource: ( options: ISaveFileOptions) => boolean
}

export interface ISaveFileOptions{
    fileContent: string,
    fileDestination?: string,
    fileName?: string
}

export class SaveFile implements ISaveFileUseCase {

    constructor(){}

    executionAsyncResource ( { 
                fileContent, 
                fileDestination = 'outputs', 
                fileName = `table.txt`
            }: ISaveFileOptions) : boolean {

        try {
            const outputPath = fileDestination
            fs.mkdirSync(outputPath, {recursive: true})
            fs.writeFileSync(`${ fileDestination}/${fileName}`, fileContent)

            return true;
        }
        catch(ex) {
            console.error(error)
            return false;
        }
    }
}
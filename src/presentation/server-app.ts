import { CreateTable } from "../domain/user-cases/create-table.use-case"
import { SaveFile } from "../domain/user-cases/save-file.use-case"

interface RunOptions {
    base: number,
    limit: number,
    showTable: boolean,
    name: string,
    destination: string
}

export class ServerApp {

    static run({base, limit, showTable, name, destination}: RunOptions) {
        console.log('Server running...', showTable)

        const table = new CreateTable()
            .execute({base, limit})

        const wasCreated = new SaveFile()
            .executionAsyncResource({ fileContent: table, fileDestination: destination, fileName: name})

        wasCreated ?    console.log('File created!') :console.log('File not created!')

        if (showTable) console.log(table)
    }
}
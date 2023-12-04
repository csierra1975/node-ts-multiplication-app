import fs from 'fs'
import { SaveFile } from '../../../src/domain/user-cases/save-file.use-case'

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name.txt'
    }

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}`

    afterEach(() => {
        
        const outputFoderExist = fs.existsSync('outputs')
        if (outputFoderExist) fs.rmSync('outputs', { recursive: true})
        
        const customOutputFoderExist = fs.existsSync('custom-outputs')
        if (customOutputFoderExist) fs.rmSync('custom-outputs', { recursive: true})
    })

    test('should save file with custom values', () => {

        const saveFile = new SaveFile()

        const result = saveFile.executionAsyncResource(customOptions)
        const fileExists = fs.existsSync(customFilePath)
        const fileContent = fs.readFileSync(customFilePath, {encoding: 'utf-8'})

        expect( result ).toBeTruthy()
        expect( fileExists ).toBe(true)
        expect( fileContent ).toBe(customOptions.fileContent)
    })

    test('should save file with default values', () => {

        const filePath = 'outputs/table.txt'

        const options = {
            fileContent: 'test content'
        }
        
        const saveFile = new SaveFile()

        const result = saveFile.executionAsyncResource(options)
        const fileExists = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})

        expect( result ).toBeTruthy()
        expect( fileExists ).toBe(true)
        expect( fileContent).toBe(options.fileContent)
    })

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile()
        const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => {throw new Error('This is a custom error message from testing')}
        )

        const result = saveFile.executionAsyncResource(customOptions)

        expect( result ).toBe( false)

        mkdirMock.mockRestore()
    })

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile()
        const mkdirMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => {throw new Error('This is a custom error message from testing')}
        )

        const result = saveFile.executionAsyncResource({fileContent: 'Hola'})

        expect( result ).toBe( false)
        mkdirMock.mockRestore()
    })
})
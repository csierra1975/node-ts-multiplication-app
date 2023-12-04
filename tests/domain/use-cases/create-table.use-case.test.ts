import {CreateTable} from '../../../src/domain/user-cases/create-table.use-case'

describe('CreateTableUseCase', () => {

    test('should create table with default values', () => {

        const createTable = new CreateTable()

        const table = createTable.execute({base: 2})
        const rows = table.split('\n').length

        expect(createTable).toBeInstanceOf(CreateTable)
        expect( table ).toContain('2 x 1 = 2')
        expect( table ).toContain('2 x 2 = 4')
        expect(rows).toBe(10)
    })

    test('should create table with custom values', () => {

        const options = {
            base: 3,
            limit: 20
        }

        const createTable = new CreateTable()
        const table = createTable.execute(options)
        const rows = table.split('\n').length

        expect( table ).toContain('3 x 1 = 3')
        expect( table ).toContain('3 x 2 = 6')
        expect(rows).toBe(options.limit)
    })
})
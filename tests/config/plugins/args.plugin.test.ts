import yargs from "yargs"

const originalArgv = process.argv

const runCommand = async( args: string[]) => {
    process.argv = [...process.argv, ... args ]

    const { yarg } = await import('../../../src/config/plugins/args.plugin')

    return yarg
}

beforeEach( () => {
    process.argv = originalArgv
    jest.resetModules()
})

describe('Args.plugin.ts', () => {

    test('should return default values', async() => {

        const argv = await runCommand(['-b', '5'])
        
        expect(argv).toEqual(expect.objectContaining(
            { b: 5,
              l: 10,
              s: false
            }
            )
        )
    })

    test('should return configuration with custom values', async() => {

        const argv = await runCommand(['-b', '7', '-l', '20', '-s', 'true', '-n', 'multiplication-table'])
        
        expect(argv).toEqual(expect.objectContaining(
            { 
                b: 7,
                l: 20,
                s: true,
                n: 'multiplication-table'
            })
        )
    })

})
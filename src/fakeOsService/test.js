export default {

/*eslint-disable */

    init: ( OS ) => {

        OS.on( 'test.event', () => {

            OS.receive( 'test.event', "{}")
        })

    }
}
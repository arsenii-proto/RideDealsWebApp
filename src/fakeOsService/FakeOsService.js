import env from "../env";
import toast from "./toast"
import config from "./config"
import test from "./test"

/*eslint-disable */
if(! window[ env.moduleName ] ){

    var OS = window[env.moduleName] = {

        listenners: {},

        off: (e, l) => OS.listenners[e] && OS.listenners[e].forEach((c, i) => c == l && (delete OS.listenners[e][i])),
        on: (e, l) => ((!OS.listenners[e] && (OS.listenners[e] = [])), (OS.listenners[e].push(l))),

        run: (c, args) => {

            var jsArgs = OS.getArgs(args)

            switch (c) {

                case 'toast.show': toast.show(jsArgs); break;
                case 'toast.show': toast.show(jsArgs); break;

                case 'config.get': return config.get(jsArgs); break;


                default:
                    break;
            }

        },

        dispatch: (e, args) => {

            OS.listenners[e] && OS.listenners[e].forEach(l => l(e, OS.getArgs(args)))
        },

        receive: (e, args) => {

        },

        commandsList: () => {

            return JSON.stringify([

                'toast.show',
                'toast.showLong',
                'config.get',

            ])

        },

        getArgs: (v) => {

            var vr = {};

            v.split('&&').forEach(v1 => {

                var vs = v1.split('='),
                    vs1 = vs[0].split(':'),
                    namespace = vs1[0],
                    type = vs1[1],
                    value = vs[1],
                    vals = namespace.split('.'),
                    curr = vr;

                vals.forEach((v2, i) => {

                    if (!curr[v2]) {

                        curr[v2] = {}
                    }

                    if (i == vals.length - 1) {

                        switch (type) {

                            case 'string': curr[v2] = "" + value; break;
                            case 'number': curr[v2] = +value; break;
                            case 'array': curr[v2] = JSON.parse(value); break;
                            case 'object': curr[v2] = JSON.parse(value); break;
                            case 'boolean': curr[v2] = (value == "true"); break;

                            default: curr[v2] = value;
                        }
                    }

                    curr = curr[v2]
                })
            })

            return vr
        }

    }


    test.init(OS)

}
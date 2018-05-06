import env from "../env"; 

var OS              = window[ env.moduleName ] || (() => { });
var listenners      = {};
var callCmd         = (c, d) => OS.run(c, makeArgs(d).substr(2))
var triggerEvent    = (e, d) => OS.dispatch(e, makeArgs(d).substr(2))

var onEvent         = (e, l) => {

    !listenners[ e ] && ( listenners[ e ] = [] )
    listenners[ e ].push( l )
}

var offEvent        = (e, l) => {

    listenners[ e ] && listenners[ e ].forEach( (c, i) => c == l && ( delete listenners[ e ][ i ] ) )
}

var makeArgs        = (d, k) => {

    var data = "";

    if( typeof d === "object" ) {
        
        k && (data += `&&${k}:${(d instanceof Array ? 'array' : 'object')}`)

        for ( var sk in d ) {

            if ( d.hasOwnProperty(sk) ) {
                
                var key = (k ? `${k}.` : '') + `${(d instanceof Array ? '_' : '')}${sk}`
                data += makeArgs(d[sk], key)
            }
        }

    }else{
        
        data += `&&${k}:${typeof d}=${d}`
    }

    return data
}

window[ env.moduleName ].receive = (e, d) => {

    listenners[ e ] && listenners[ e ].forEach( l => l( e, JSON.parse( d )  ) )
}

export default {

    install: function ( Vue ) {

        if ( OS ) {

            var OSC = {
                trigger:    (e, d) => triggerEvent(e, d),
                on:         (e, l) => onEvent(e, l),
                off:        (e, l) => offEvent(e, l),
                loaded: OS.commandsList ? !0 : !1,
                cmds: []
            }
            
            OS.commandsList && JSON.parse( OS.commandsList() ).forEach(cmd => {

                if(! cmd ) return
                
                var spaces      = cmd.split('.');
                var lastSpace   = "";
                var lastMod     = OSC
                
                spaces.forEach(space => {

                    var currentSpace = (lastSpace ? lastSpace + '.' : lastSpace) + space

                    if(! lastMod[ space ] ){
                        
                        lastMod[ space ] = d => callCmd( currentSpace , d )
                    }

                    lastSpace   = currentSpace
                    lastMod     = lastMod[ space ]
                })
            });
            
            Object.defineProperty(Vue, '$OS', { get: () => OSC })
            Object.defineProperty(Vue.prototype, '$OS', { get: () => OSC })
        }
    }

}
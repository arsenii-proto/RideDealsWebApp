import env from "../env"; 

var OS = {

    target:     window[env.moduleName] || (() => { }),
    listenners: {},
    call:       (c, d) => this.target.run(c, this.args(d).substr(2)),
    trigger:    (e, d) => this.target.dispatch(e, this.args(d).substr(2)),
    on:         (e, l) => ( ( !this.listenners[ e ] && ( this.listenners[ e ] = [] ) ), ( this.listenners[ e ].push( l ) ) ),
    off:        (e, l) => this.listenners[ e ] && this.listenners[ e ].forEach( (c, i) => c == l && ( delete this.listenners[ e ][ i ] ) ),
    args:       (d, k) => {

                    var data = "";

                    if( typeof d === "object" ) {
                        
                        k && (data += `&&${k}:${(d instanceof Array ? 'array' : 'object')}`)

                        for ( var sk in d ) {

                            if ( d.hasOwnProperty(sk) ) {
                                
                                var key = (k ? `${k}.` : '') + `${(d instanceof Array ? '_' : '')}${sk}`
                                data += this.args(d[sk], key)
                            }
                        }

                    }else{
                        
                        data += `&&${k}:${typeof d}=${d}`
                    }

                    return data
                }
}

OS.target.receive = (e, d) => this.listenners[e] && this.listenners[e].forEach(l => l(e, JSON.parse(d)))

export default {

    install: function ( Vue ) {

        if ( OS ) {

            var OSC = {
                trigger:    (e, d) => OS.trigger(e, d),
                on:         (e, l) => OS.on(e, l),
                off:        (e, l) => OS.off(e, l),
                loaded:     OS.target.commandsList ? !0 : !1,
            }
            
            OS.target.commandsList && JSON.parse( OS.target.commandsList() ).forEach(cmd => {

                if(! cmd ) return
                
                var spaces      = cmd.split('.');
                var lastSpace   = "";
                var lastMod     = OSC
                
                spaces.forEach(space => {

                    var currentSpace = (lastSpace ? lastSpace + '.' : lastSpace) + space

                    if(! lastMod[ space ] ){
                        
                        lastMod[ space ] = d => this.call( currentSpace , d )
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
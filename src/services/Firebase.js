import * as firebase from 'firebase';

export default {

    install: function (Vue) {
        
        if ( Vue.$OS ) {

            firebase.initializeApp(Vue.$OS.config.get({ name: "firebase" }))
            
            var db = firebase.database();

            Object.defineProperty(Vue, '$DB', { get: () => db })
            Object.defineProperty(Vue.prototype, '$DB', { get: () => db })

        }
    }

}
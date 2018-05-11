import * as firebase from 'firebase';

export default {

    install: function (Vue) {
        
        if ( Vue.$OS ) {

            firebase.initializeApp(Vue.$OS.config.get({ name: "firebase" }))
            
            Object.defineProperty(Vue, '$FIREBASE', { get: () => firebase })
            Object.defineProperty(Vue.prototype, '$FIREBASE', { get: () => firebase })
            
            var db = firebase.firestore();

            Object.defineProperty(Vue, '$DB', { get: () => db })
            Object.defineProperty(Vue.prototype, '$DB', { get: () => db })
            
            var auth = firebase.auth();
            auth.RecaptchaVerifier = firebase.auth.RecaptchaVerifier

            Object.defineProperty(Vue, '$AUTH', { get: () => auth })
            Object.defineProperty(Vue.prototype, '$AUTH', { get: () => auth })

        }
    }

}
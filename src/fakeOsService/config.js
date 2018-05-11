export default {

    get: (a) => {

        if( a.name == "firebase" ){

            return JSON.stringify({

                apiKey: "AIzaSyAQb8NpWhD0S6GOO9V2XdbgaDNNVdLNWQ4",
                authDomain: "arsenii-ride-deals.firebaseapp.com",
                databaseURL: "https://arsenii-ride-deals.firebaseio.com",
                projectId: "arsenii-ride-deals",
                storageBucket: "arsenii-ride-deals.appspot.com",
                messagingSenderId: "414909120149"
                
            })

        }

        if ( a.name == 'user_id' ) {

            return JSON.stringify({
                user_id: null //f4XNcIZD2xKLzmQ5Whsw
            })
        }

        if ( a.name == 'language' ) {

            return JSON.stringify({ language: 'ro' });
        }
    }
}
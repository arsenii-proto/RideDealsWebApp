import Vue  from "vue";
import Router  from "vue-router";
import Middleware from "vue-router-middleware";

import Home  from "./views/Home.vue";
import About  from "./views/About.vue";
import Client from "./views/ClientHome";
import Driver from "./views/DriverHome";
import Login from "./views/Login";

Vue.use( Router )

var router = new Router({
    
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/home/client',
            name: 'client-home',
            component: Client
        },
        {
            path: '/home/driver',
            name: 'driver-home',
            component: Driver
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
    ]
    
})

Vue.use( Middleware, { 
    router,
    middlewares: {
        
    }
})

export default router
import Vue  from "vue";
import Router  from "vue-router";
import Middleware from "vue-router-middleware";
import Home  from "./components/Home.vue";
import About  from "./components/About.vue";

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
        }
    ]
    
})

Vue.use( Middleware, { 
    router,
    middlewares: {
        
    }
})

export default router
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',   
            redirect: '/login'  
        },
        {
            path: '/seat',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/student',
                    component: resolve => require(['../components/page/Student.vue'], resolve)
                },
                {
                    path: '/seat',
                    component: resolve => require(['../components/page/Seat.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})

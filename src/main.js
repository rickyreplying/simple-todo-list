import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'


import "bootstrap/dist/css/bootstrap.css";



import Home from './components/Home.vue'
import TaskDetail from './components/TaskDetail.vue'

const app = createApp(App)


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            redirect: {
                name: 'home'
            },
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            
            path: '/detail/:id', name:'task-detail', component: TaskDetail,
            name: 'Detail',
            props: true,
        }
    ]
});

app.use(router)
app.mount('#app')


import "bootstrap/dist/js/bootstrap.js";
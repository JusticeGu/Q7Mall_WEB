import Vue from 'vue'
import VueRouter from 'vue-router'


const Login=()=>import('../components/login.vue');
const Home=()=>import('../components/home.vue');
const Welcome=()=>import('../components/welcome.vue');

const News=()=>import('../components/news/news.vue');
const Persons=()=>import('../components/persons/persons')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/news', component: News },
      { path: '/persons', component: Persons },
    ] }

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

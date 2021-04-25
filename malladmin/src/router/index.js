import Vue from 'vue'
import VueRouter from 'vue-router'


const Login=()=>import('../components/login.vue');
const Home=()=>import('../components/home.vue');
const Welcome=()=>import('../components/welcome.vue');

const Category=()=>import('../components/goods/category.vue');
const Brand=()=>import('../components/goods/brand.vue');
const Persons=()=>import('../components/persons/persons');
const AddCategory=()=>import('../components/goods/addCategory.vue');


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/brand', component: Brand },
      { path: '/persons', component: Persons },
      { path: '/category', component: Category },
      { path: '/addCategory', component: AddCategory }
    ] }

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

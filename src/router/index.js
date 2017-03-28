import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/admin/login.vue'
import Manage from '../components/admin/manage.vue'
import Publish from '../components/admin/publish.vue'
import ArticleManage from '../components/admin/articleManage.vue'
import Classes from '../components/admin/classes.vue'
import AdminHome from '../components/admin/home.vue'
import Settings from '../components/admin/settings.vue'
import PreLogin from '../components/admin/preLogin.vue'
import Home from '../components/home/home.vue'
import List from '../components/home/list.vue'
import Article from '../components/home/article.vue'
import Archives from '../components/home/archives.vue'
import About from '../components/home/about.vue'
import Links from '../components/admin/links.vue'
import error from '../components/error.vue'
Vue.use(VueRouter)
export default new VueRouter({
   
  routes: [
    
    {
    	path:'/',redirect:'/home/list?page=1'
    },
    {
    	path:'/admin/login',component:Login
    },
    {
    	path:'/admin/manage',
    	component:Manage,
    	children:[
    		{
    			path:'publish',component:Publish
    		},
    		{
    			path:'articleManage',component:ArticleManage
    		},
    		{
    			path:'classes',component:Classes
    		},
            {
                path:'home',component:AdminHome
            },
            {
                path:'settings',component:Settings
            },
            {
                path:'links',component:Links
            },
            
    	]
    },
    {
        path:'/admin/preLogin',component:PreLogin
    },
    {
        path:'/home',
        component:Home,
        children:[
            {
                path:'list',component:List
            },
            {
                path:'article/:id',component:Article
            },
            {
                path:'archives',component:Archives
            },
            {
                path:'about',component:About
            },
        ]
    },
    {
        path:'/error',component:error
    }
  ]
})


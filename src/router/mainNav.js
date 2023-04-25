import HomeView from '@/views/HomeView.vue'
import UsersView from '@/views/Users/UsersView.vue'
import Controllers from '@/views/Controllers.vue'
import TpaInfo from '@/views/TpaInfo.vue'

const mainNav = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/users',
        name: 'users',
        component: UsersView
    },
    {
        path: '/controllers',
        name: 'controllers',
        component: Controllers
    },
    {
        path: '/tpa/:id',
        name: 'tpa',
        component: TpaInfo
    }
]

export { mainNav }
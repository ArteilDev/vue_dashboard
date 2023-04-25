import CurrentUserView from '@/views/Users/CurrentUserView.vue'

const users = [
    {
        path: '/users/:id',
        name: 'currentUser',
        meta: { auth: true },
        component: CurrentUserView
    }
]

export { users }
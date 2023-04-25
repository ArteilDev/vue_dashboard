import { createRouter, createWebHistory } from 'vue-router'

import { mainNav} from './mainNav'
import { users} from './users'

export const routes = [
	...mainNav, ...users
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
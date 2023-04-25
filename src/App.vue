<template>
	<div v-if="$route.name !== 'login' && $route.name !== 'dispatcher'">
		<sidebar />
		<section class="dashboard">
			<header-panel />

			<div class="content">
				<RouterView />
			</div>
		</section>
	</div>

	<div v-else>
		<RouterView />
	</div>
</template>

<script>
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import HeaderPanel from '@/components/HeaderPanel.vue'

import { mapGetters } from 'vuex'

export default {
	components: {
		Sidebar, HeaderPanel
	},

	methods: {
	},

	computed: {
		...mapGetters({
			isAuthentificated: 'auth/isAuthentificated'
		})
	}
}
</script>
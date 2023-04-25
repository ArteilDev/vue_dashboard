<template>
	<Line v-if="!isLoading"
		id="chart"
		:options="getChartOptions"
		:data="getChartData"
	/>

	<pu-skeleton v-else class="chart-loading"></pu-skeleton>

	<div v-if="chartError" class="chart-error">
		<div v-if="chartError == 'Network Error'">
			Ошибка соединения
		</div>
		<div v-if="!isLoading">
			{{ chartError }}
		</div>
	</div>
</template>
  
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, PointElement, LineElement, TimeScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'
import 'chartjs-adapter-moment';

import { mapState, mapGetters, mapActions } from 'vuex'

ChartJS.register(Title, Tooltip, Legend, LineElement, TimeScale, LinearScale, PointElement, CategoryScale)

export default {
	name: 'Chart',

	data() {
		return {
			upadteInterval: ''
		}
	},

	components: { Line },

	created() {
		this.fetchChartData(this.$route.params.id)
		this.upadteInterval = setInterval(async () => { this.fetchChartData(this.$route.params.id) }, 30000)
	},

	methods: {
		...mapActions({
			fetchChartData: 'chart/fetchChartData',
		}),

		cancelAutoUpdate() {
			clearInterval(this.upadteInterval);
		}
	},

	computed: {
		...mapState({
			chartData: state => state.chart.chartData,
			chartError: state => state.chart.chartError,
			isLoading: state => state.isLoading
		}),

		...mapGetters({
			getChartData: 'chart/getChartData',
			getChartOptions: 'chart/getChartOptions'
		})
	},

	beforeUnmount () {
    	this.cancelAutoUpdate();
    }
}
</script>
import $http from "@/api"

export const chartModule = {
	namespaced: true,

    state:() => ({
		chartPlan: [], // Объект для формирования графика плана
		chartFact: [], // Объект для формирования графика с фактическими данными
		chartData: {}, // Финальный объект с данными, для передачи в график
		chartOptions: {}, // Опции/настройки графика
		chartError: ''
    }),

    getters: {
		// Передача финального объекта с данными
        getChartData(state) {
			state.chartData = {
				datasets: [{ 
						data: state.chartFact,
						backgroundColor: 'rgba(117, 211, 130, 0.2)',
						borderColor: 'rgba(117, 211, 130, 1)',
						tension: 0,
						fill: false,
						borderWidth: 3,
						label: 'Факт'
					},
					{
						data: state.chartPlan,
						borderColor: 'rgba(54, 162, 235, 1)',
						tension: 0,
						fill: false,
						borderWidth: 1,
						label: 'План'
					}
				]
			}
			return state.chartData
		},

		// Передача опций/настроек графика
		getChartOptions(state) {
			state.chartOptions = {
				responsive: true,
				spanGaps: true,
				animation: false,
				elements: {
					point: {
						radius: 0
					}
				},  
				scales: {
					x: {
						type: 'time',
						time: {
							unit: 'hour',
							min: '2023-03-01 07:00:00.00',
							max: '2023-03-01 19:00:00.00',
							displayFormats: {
								hour: 'HH:mm'
							}
						}
					},  
					y: {
						ticks: {
							beginAtZero: true,
							min: Object.keys(state.chartPlan)[0],
							max: Object.keys(state.chartPlan)[state.chartPlan.length-1],
							stepSize: (Object.keys(state.chartPlan)[state.chartPlan.length-1] / 12),
							callback: function (value) { return Math.floor(value) }
						}
					}
				},  
				title: {
					display: false
				},
				plugins: {
					legend: {
						display: false
					}
				}
			}

			return state.chartOptions
		}
    },

    mutations: {
		setChartData(state, chartData) {
			state.chartPlan = chartData['plan']
			state.chartFact = chartData['trend']
		},

		setChartError(state, error) {
			state.chartError = error
		}
    },

    actions: {
		// Получение данных графика из API
		async fetchChartData({ commit, state, rootState }, oid) {
			try {
				if (state.chartPlan.length === 0){ // Проверка на пустоту массива (если это первый запрос, то отображаем загрузку)
					rootState.isLoading = true
				}

				const response = await $http.get('644795f7b89b1e2299913531')

				if(!response.data['error']) { // Если запрос выполнен успешно и сервер не вернул пользовательскую ошибку
					commit('setChartData', response.data.record) // Присваиваем полученные данные
					commit('setChartError', '')
				} else { // Если запрос выполнен успешно, но сервер вернул пользовательскую ошибку (например, "Отсутсвует сменное задание")
					commit('setChartData', {plan: [], trend: []}) // Присваиваем пустой объект к графику
					commit('setChartError', response.data['error']) // Назначаем переменную с пользовательской ошибкой
				}			
			} catch(err) { // Если запрос не выполнен, возвращаем ошибку
				commit('setChartError', err.message)
			} finally {
				rootState.isLoading = false // После всех шагов, убираем состояние загрузки
			}
		},
    }
}
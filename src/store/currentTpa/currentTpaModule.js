import $http from "@/api"

export const currentTpaModule = {
    namespaced: true,

    state:() => ({
        tpaData: [],
        execPlan: 0
    }),

    getters: {
        getCurrentTpaData(state) {
            return state.tpaData
        },

        getExecPlan(state) {
			state.execPlan = 0
			if (state.tpaData.ExecPlan !== undefined && state.tpaData.ExecPlan) {
				// Форматируем строку с временем до конца плана с 0:00:00.000000 до 0:00:00
				let execPlanStr = state.tpaData.ExecPlan.split('.')[0]
				// Делаем из времени HH:mm:ss, миллисекунды (т.к компонент обратного отсчета принимает только в этом формате)
				state.execPlan = Number(execPlanStr.split(':')[0]) * 60 * 60 * 1000 + Number(execPlanStr.split(':')[1]) * 60 * 1000 + Number(execPlanStr.split(':')[2]) * 1000;
			}

			return state.execPlan
		}
    },

    mutations: {
        setCurrentTpaData(state, data) {
            state.tpaData = data
        }
    },

    actions: {
        async fetchCurrentTpaData ({ commit, state, rootState}, oid) {
            try {
                if(state.tpaData.length === 0) { // Проверка на пустоту массива (если это первый запрос, то отображаем загрузку)
					rootState.isLoading = true
				}
                const response = await $http.get(oid)

                commit('setCurrentTpaData', response.data.record)
            } catch(err) { // Если есть ошибка
				rootState.error = err.message // Назначаем переменную ошибки
				// router.push({path: "/error"}) // Переход на страницу ошибки
			} finally {
                rootState.isLoading = false
            }
        }
    }
}
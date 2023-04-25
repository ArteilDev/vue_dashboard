import $http from "@/api"

export const homeModule = {
    namespaced: true,

    state:() => ({
        allTpa: [],
        tpaCount: 0,
        downtimeTPA: 0,
    }),

    getters: {
        // Фунция подсчета количества ТПА в простое и в работе
        completeData(state) {
            state.downtimeTPA = 0
            for (let i = 0; i < state.allTpa.length; i++){
                if(state.allTpa[i]['EamState'] === 'В простое' || state.allTpa[i]['MesState'] === 'В простое') {
                    state.downtimeTPA++
                }
            }

            return state.allTpa
        }
    },

    mutations: {
        setAllTpaData(state, data) {
            state.allTpa = data
        },

        setTpaCount(state, data) {
            state.tpaCount = data
        }
    },

    actions: {
        // Получение данных по одному, конкретному ТПА из API при первой загрузке страницы
        async fetchAllTpaData ({ commit, state, rootState}) {
            try {
                if(state.allTpa.length === 0) { // Проверка на пустоту массива (если это первый запрос, то отображаем загрузку)
					rootState.isLoading = true
				}

                const response = await $http.get('64478d3b9d312622a351b9e0')

                commit('setAllTpaData', response.data.record)
                commit('setTpaCount', response.data.record.length)
            } catch (err) {
                alert(err)
            } finally {
                rootState.isLoading = false
            }
        }
    }
}
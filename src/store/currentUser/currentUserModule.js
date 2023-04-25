import $http from '@/api'

export const currentUserModule = {
	namespaced: true,

    state:() => ({
        userData: {},
        rolesList: {},
        employeeRoles: {}
    }),

    getters: {
        getUserData(state) {
            return state.userData
        },
        
        getEmployeeRoles(state) {
            let rolesObject = {}
            for(let i in state.rolesList){
                rolesObject[state.rolesList[i]] = false
            }

            for(let i in state.rolesList) {
                for(let e in state.userData.roles)
                {
                    if(state.userData.roles[e] === state.rolesList[i]){
                        rolesObject[state.rolesList[i]] = true
                    }
                }
            }
            state.employeeRoles = rolesObject

            return state.employeeRoles
        }
    },

    mutations: {
        setUserData(state, data) {
            state.userData = data;
        },

        setRolesList(state, data) {
            state.rolesList = data
        }
    },

    actions: {
		// Получение данных о пользователе из API
		async fetchUserData({ commit, rootState }, oid) {
			try {
                rootState.isLoading = true

				const response = await $http.get(oid)

                commit('setUserData', response.data.record)
			} catch(err) { // Если запрос не выполнен, возвращаем ошибку
                alert(err)
			} finally {
				rootState.isLoading = false // После всех шагов, убираем состояние загрузки
			}
		},

        // Получение списка всех ролей
		async fetchRulesList({commit}) {
			try {
				const response = await $http.get('6447c19f9d312622a351da8c')
                commit('setRolesList', response.data.record.roles)
			} catch(err) { // Если запрос не выполнен, возвращаем ошибку
                alert(err)
			}
		},
    }
}
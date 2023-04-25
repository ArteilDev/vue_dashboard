import axios from 'axios'

export const fixedTpaData = {
    namespaced: true,

    state:() => ({
        weightData: {},
        wasteDefectData: {},
        downtimesData: {}
    }),

    mutations: {
        setWeightData(state, data) {
            state.weightData = data
        },

        setWasteDefectData(state, data) {
            state.wasteDefectData = data
        },

        setDowntimesData(state, data) {
            state.downtimesData = data
        },
    },

    actions: {
        async fetchWeightData ({ commit }, oid) {
            try {
                const response = await axios.get('http://192.168.107.44:5000/api/weight?oid='+ oid)
                
                commit('setWeightData', response.data)
            } catch(err) { // Если есть ошибка
                alert(err)
			}
        },

        async fetchWasteDefectData ({ commit }, oid) {
            try {
                const response = await axios.get('http://192.168.107.44:5000/api/wastes?oid='+ oid)
                
                commit('setWasteDefectData', response.data)
            } catch(err) { // Если есть ошибка
                alert(err)
			}
        },

        async fetchDowntimesData ({ commit }, oid) {
            try {
                const response = await axios.get('http://192.168.107.44:5000/api/downtime?oid='+ oid)

                commit('setDowntimesData', response.data)
            } catch(err) { // Если есть ошибка
                alert(err)
			}
        }
    }
}
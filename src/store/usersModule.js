import $http from '@/api'
import _ from 'lodash'

export const usersModule = {
    
    state: () => ({
        users: [],
        allUsers: [],
        isUsersLoading: false,
        page: 1,
        pageSize: 11,
        totalPages: 0,
        selectedSort: '',
        searchQuery: '',
        sortOptions: [
            { value: 'Name', name: 'По фамилии'},
            { value: 'UserName', name: 'По имени пользователя'},
            // { value: 'Roles', name: 'По ролям'},
        ],
    }),

    getters: {
        sortedUsers(state) {
            return [...state.allUsers].sort((user1, user2) => {
                return user1[state.selectedSort]?.localeCompare(user2[state.selectedSort])
            })
        },

        sortedAndSearchedUsers(state, getters) {
            return getters.sortedUsers.filter(user => user.Name.toLowerCase().includes(state.searchQuery.toLowerCase()))
        },

        getUsers(state, getters) {
            let sortedUsers = getters.sortedAndSearchedUsers

            sortedUsers = _.chunk(sortedUsers, state.pageSize)
            state.totalPages = _.size(sortedUsers)
            state.users = sortedUsers[state.page - 1] || sortedUsers[0]

            return state.users
        },

    },

    mutations: {
        setUsers(state, allUsers) {
            state.allUsers = allUsers;
        },

        setLoading(state, bool) {
            state.isUsersLoading = bool
        },

        setPage(state, page) {
            state.page = page
        },
        
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },

        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    },

    actions: {
        async fetchUsers({state, commit}) {
            try {
                commit('setLoading', true)

                const response = await $http.get('6447abec8e4aa6225e909900')

                commit('setUsers', response.data.record)
            } catch {
                alert('Error!')
            }
            finally {
                commit('setLoading', false)
            }
        }
    },
    namespaced: true
}
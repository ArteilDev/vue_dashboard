<template>
    <div class="page">
        <h1 class="page_title">Информация о пользователе</h1>
        <current-user-data :userData="getUserData" :employeeRoles="getEmployeeRoles" :isLoading="isLoading"></current-user-data>
    </div>
</template>
<script>
    import CurrentUserData from '@/components/Users/CurrentUserData.vue'

    import {mapState, mapGetters, mapActions} from 'vuex'

    export default {
        components: {
            CurrentUserData
        },

        methods: {
            ...mapActions ({
                fetchUserData: 'currentUser/fetchUserData',
                fetchRulesList: 'currentUser/fetchRulesList'
            }),
        },

        mounted () {
            this.fetchRulesList(),
            this.fetchUserData(this.$route.params.id)
        },

        computed: {
            ...mapState ({
                isLoading: state => state.isLoading,
                userData: state => state.currentUser.userData,
                rolesList: state => state.currentUser.rolesList,
                employeeRoles: state => state.currentUser.employeeRoles
            }),

            ...mapGetters ({
                getUserData: 'currentUser/getUserData',
                getEmployeeRoles: 'currentUser/getEmployeeRoles',
            })
        }
    }
</script>
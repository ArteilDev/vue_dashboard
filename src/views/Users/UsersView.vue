<template>
    <div class="page">

        <popup :class="popupType" v-model:show="popupVisible" :message="popupMessage"></popup>

        <div class="row row-cols-1 row-cols-xl-2">
            <div class="col">
                <h1 class="page_title">Пользователи</h1>
            </div>
            <div class="col mb-3">
                <div v-if="addButton" class="row row-cols-1 row-cols-md-2">
                    <div class="col col-md-8">
                        <div class="input-with-icon">
                            <input-search :model-value="searchQuery" @update:model-value="setSearchQuery" type="text" class="input input-search me-4" placeholder="Найти пользователя..." />
                            <i class="icon-search"></i>
                        </div>
                    </div>
                    <div м-ша class="col col-md-4 gy-3 gy-md-0 mb-3 mb-md-0">
                        <button @click="showModal" class="button button_adduser button_primary">
                            <i class="icon-plus"></i>
                            Добавить пользователя
                        </button>
                    </div>
                </div>
                <div v-else class="row row-cols-1">
                    <div class="col">
                        <div class="input-with-icon">
                            <input-search :model-value="searchQuery" @update:model-value="setSearchQuery" type="text" class="input input-search me-4" placeholder="Найти пользователя..." />
                            <i class="icon-search"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

        <div class="list-container users-list">
            <div class="list-container__title">
                <span>Список пользователей:</span>
                <sort-select :model-value="selectedSort" :options="sortOptions" @update:model-value="setSelectedSort" />
            </div>
            <div class="list-container__header row row-cols-3">
                <span>ФИО</span>
                <span>Имя пользователя</span>
                <span>Роли</span>
            </div>
            <div v-if="!isUsersLoading">
                <div class="list-container__body">
                    <users-list :users="getUsers"/>
                </div>
                <div class="list-container__footer">
                    <paginate
                        :page-count="totalPages"
                        :page-range="pageRange"
                        :margin-pages="2"
                        :click-handler="clickCallback"
                        :prev-text="'<<'"
                        :next-text="'>>'"
                        :container-class="'pagination'"
                        :page-class="'page-item'"
                    />
                </div>
            </div>
            <div v-else>
                <div v-for="index in 11" class="list-container__body">
                    <div class="list-item row row-cols-3">
                        <pu-skeleton />
                        <pu-skeleton />
                        <pu-skeleton />
                    </div>
                    
                </div>
                <div class="list-container__footer">
                    <div class="m-3"></div>
                </div>
            </div>
        </div>

        <modal v-model:show="modalVisible">
            <template v-slot:modal-title>
                Добавить пользователя
            </template>
            <template v-slot:modal-body>
                <add-user-modal @create="createUser"/>
            </template>
            
        </modal>
    </div>
</template>

<script>
    import UsersList from '@/components/Users/UsersList.vue'
    import AddUserModal from '@/components/modals/AddUserModal.vue'

    import Paginate from 'vuejs-paginate-next';

    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

    import $http from '@/api'

    export default {
        components: {
            UsersList, AddUserModal, Paginate
        },

        data() {
            return {
                modalVisible: false,
                popupVisible: false,
                popupMessage: '',
                popupType: '',
                pageRange: 5,
                addButton: true
            }
        },
        methods: {
            ...mapMutations ({
                setPage: 'users/setPage',
                setSelectedSort: 'users/setSelectedSort',
                setSearchQuery: 'users/setSearchQuery',
            }),

            ...mapActions ({
                fetchUsers: 'users/fetchUsers'
            }),

            // async checkPermission ({}, rolename) {
            //     try {
            //         const response = await $http.get('/check/role?rolename='+rolename)
            //         if(response.data.role_required) {
            //             return true
            //         } else {
            //             return false
            //         }
            //     } catch (err) {
            //         alert(err)
            //     }
            // },

            async createUser(user) {
                // try {
                //     const response = await $http.post('/users/adduser', {
                //        user
                //     })
                //     if(response['data']['error']) {
                //         this.showPopup(response['data']['error'], 'popup_danger')
                //     } else {
                //         this.showPopup('Пользователь успешно добавлен!', 'popup_success')
                //         this.modalVisible = false
                //         this.fetchUsers()
                //     }
                // } catch(err) {
                //     alert(err)
                // } 
                this.showPopup('Пользователь успешно добавлен!', 'popup_success')
                this.modalVisible = false
            },
            
            showModal() {
                this.modalVisible = true
            },

            showPopup(message, type) {
                this.popupVisible = true
                this.popupMessage = message
                this.popupType = type
            },

            clickCallback (pageNum) {
                this.setPage(pageNum)
            },

            // async showAddButton() {
            //     let result = await this.checkPermission({}, 'Администратор')
            //     if(result) {
            //         this.addButton = true
            //     } else {
            //         this.addButton = false
            //     }
            // }
        },

        created() {
            if(document.documentElement.scrollWidth <= 600){
                this.pageRange = 2
            }
        },

        mounted () {
            this.fetchUsers()
            // this.showAddButton()
        },

        computed: {
            ...mapState ({
                users: state => state.users.users,
                allUsers: state => state.users.allUsers,
                isUsersLoading: state => state.users.isUsersLoading,
                page: state => state.users.page,
                pageSize: state => state.users.pageSize,
                totalPages: state => state.users.totalPages,
                selectedSort: state => state.users.selectedSort,
                sortOptions: state => state.users.sortOptions,
                searchQuery: state => state.users.searchQuery
            }),
            ...mapGetters ({
                sortedUsers: 'users/sortedUsers',
                sortedAndSearchedUsers: 'users/sortedAndSearchedUsers',
                getUsers: 'users/getUsers'
            })
        }
    }
</script>
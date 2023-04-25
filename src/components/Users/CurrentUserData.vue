<template>
<popup :class="popupType" v-model:show="popupVisible" :message="popupMessage"></popup>
<section class="section section-container shadow-1">
    <h2 class="h6 mb-3">Общая информация</h2>
    <div v-if="!isLoading" class="row row-cols-1 row-cols-md-2">
        <div class="col">
            <div class="input-group">
                <label for="login" class="f-grey-5">Фамилия</label>
                <input
                    type="text" class="input" name="user_lastname" 
                    v-model="editedUserData.last_name"
                    :disabled="editable ? false : true"
                />
                <div v-if="errors.last_name" class="modal__errors">
                    <div class="modal__errors__item"> Введите фамилию!</div>
                </div>
            </div>
            <div class="input-group">
                <label for="login" class="f-grey-5">Имя</label>
                <input
                    type="text" class="input" name="user_name"
                    v-model="editedUserData.first_name"
                    :disabled="editable ? false : true"
                />
                <div v-if="errors.name" class="modal__errors">
                    <div class="modal__errors__item"> Введите имя!</div>
                </div>
            </div>
            <div class="input-group">
                <label for="login" class="f-grey-5">Отчество</label>
                <input
                    type="text" class="input" name="user_middlename"
                    v-model="editedUserData.middle_name"
                    :disabled="editable ? false : true"
                />
            </div>
        </div>
        <div class="col">
            <div class="input-group">
                <label for="login" class="f-grey-5">Роли</label>
                <div class="checkbox-group checkbox-group_roles">
                    <div v-for="(value, key) in employeeRoles" class="checkbox-button">
                        <input v-if="value === true"
                            type="checkbox" checked id="role-operator"
                            v-model="editedUserData.roles"
                            :value="key"
                            :disabled="editable ? false : true"
                        />
                        <input v-else
                            type="checkbox" id="role-operator"
                            v-model="editedUserData.roles"
                            :value="key"
                            :disabled="editable ? false : true"
                        />
                        <div>
                            <span> {{key}} </span>
                        </div>
                    </div>
                </div>
                <div v-if="errors.roles" class="modal__errors">
                    <div class="modal__errors__item"> Выберите хотя бы одну роль!</div>
                </div>
            </div>
            <div class="input-group">
                <label for="login" class="f-grey-5">Имя пользователя</label>
                <input
                    type="text" class="input" name="username"
                    v-model="editedUserData.user_login"
                    :disabled="editable ? false : true"
                />
                <div v-if="errors.username" class="modal__errors">
                    <div class="modal__errors__item"> Введите имя пользователя!</div>
                </div>
            </div>
            <div class="input-group">
                <label for="login" class="f-grey-5">Номер карты</label>
                <input
                    type="text" class="input" name="user_name"
                    v-mask="'###,#####'"
                    v-model="editedUserData.card_number"
                    :disabled="editable ? false : true"
                />
                <div v-if="errors.card_number" class="modal__errors">
                    <div class="modal__errors__item"> Введите номер карты!</div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section section-container shadow-1">
    <h2 class="h6 mb-3">Прочее</h2>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2">
        <div class="col">
            <div class="input-group">
                <label for="login" class="f-grey-5">Дата добавления</label>
                <input type="text" class="input" name="user_lastname" :value="userData.add_date" disabled/>
            </div>
            <div class="input-group">
                <label for="login" class="f-grey-5">Дата изменения</label>
                   <input type="text" class="input" name="user_name" :value="userData.last_edit_date" disabled/>
            </div>
        </div>
        <div class="col">
            <div class="input-group">
                <label for="login" class="f-grey-5">Добавлен пользователем</label>
                <input type="text" class="input" name="user_lastname" :value="userData.creator" disabled/>
            </div>
            <div class="input-group">
                <label for="login" class="f-grey-5">Изменен пользователем</label>
                   <input type="text" class="input" name="user_name" disabled/>
            </div>
            <div class="section-container_footer">
                <div v-if="canEdit">
                    <div v-if="!editable" class="row row-cols-1 row-cols-md-2">
                        <div class="col mb-3">
                            <button @click="deleteUser(this.$route.params.id)" class="button button_danger">
                                <i class="icon-delete"></i>
                                Удалить
                            </button>
                        </div>
                        <div class="col">
                            <button @click="editUser" class="button button_primary" id="userEdit_button">
                                <i class="icon-edit"></i>
                                Редактировать
                            </button>
                        </div>
                    </div>
                    <div v-else class="row row-cols-1 row-cols-md-2">
                        <div class="col mb-3">
                            <button @click="editUser" class="button button_danger">
                                <i class="icon-close"></i>
                                Отмена
                            </button>
                        </div>
                        <div class="col">
                            <button @click="saveEditedUser" class="button button_primary" id="userEdit_button">
                                <i class="icon-save"></i>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>
<script>
    import { mask } from 'vue-the-mask'
    import $http from '@/api'
    import { mapMutations } from 'vuex'

    export default {
        directives: { mask },

        data() {
            return {
                // Доступ к редактированию данных пользователя
                canEdit: true,
                editable: false,

                // Данные пользователя для редактирования
                editedUserData: {
                    emp_oid: '',
                    last_name: '',
                    first_name: '',
                    middle_name: '',
                    user_login: '',
                    card_number: '',
                    roles: []
                },

                errors: {
                    last_name: false,
                    name: false,
                    user_login: false,
                    card_number: false,
                    roles: false
                },

                popupVisible: false,
                popupMessage: '',
                popupType: '',
            }
        },

        props: {
            // Данные о пользователе полученные с сервера
            userData: {
                type: Object,
                required: true,
                default: {}
            },
            // Доступные роли текущего пользователя 
            employeeRoles: {
                type: Object,
                required: true,
                default: {}
            },

            isLoading: {
                type: Boolean,
                default: true
            }
        },

        methods: {
            ...mapMutations ({
                setPage: 'users/setPage',
            }),

            // Функция включения/выключения режима редактирования данных пользователя
            editUser() {
                if(!this.editable) {
                    this.editable = true
                } else {
                    this.editable = false
                }
            },

            async saveEditedUser() {
                // Формирования объекта с ошибками (если обязательные поля не заполнены. TRUE-не заполнено)
                for (let i in this.editedUserData) {
                    // Является ли обязательное поле массивом(выбор ролей) и количество выбранных полей <= 0
                    if(Array.isArray(this.editedUserData[i]) & Object.keys(this.editedUserData[i]).length <= 0) {
                        // В таком случае отмечаем поле пустым т.е ошибка true
                        this.errors[i] = true 
                    // Обязательное поле не является массивом, а так же пуст                        
                    } else if(!this.editedUserData[i]) {
                        // В таком случае отмечаем поле пустым т.е ошибка true
                        this.errors[i] = true
                    // Иначе поле не пустое т.е без ошибок
                    } else {
                        this.errors[i] = false
                    }
                }

                // Проверка, есть ли в объекте с ошибками, значение true
                if(!Object.values(this.errors).includes(true)) {
                    // Если нет ошибок и имеются права адмнистратора, выполняем отправку данных

                    // this.editUserResponse(this.editedUserData)
                    this.showPopup('Информация успешна изменена!', 'popup_success')
                    this.editable = false

                }
            },

            // Отправка запроса на изменение данных пользователя
            async editUserResponse(editedUser) {
                try {
                    const userOid = this.$route.params.id
                    const response = await $http.post('/user/edit_user', {
                        userOid,
                        editedUser
                    })
                
                    if(response['data']['error']) {
                        this.showPopup(response['data']['error'], 'popup_danger')
                    } else {
                        this.showPopup('Информация успешна изменена!', 'popup_success')
                    }
                } catch(err) {
                    alert(err)
                } 
            },

            // Запрос на удаление пользователя
            async deleteUser() {
                // Проверка прав пользователя
                // let emp_oid = this.userData.emp_oid
                // let user_oid = this.$route.params.id.toLowerCase()
                // try {
                //     const response = await $http.post('/user/delete_user', {
                //         user_oid,
                //         emp_oid
                //     })
                //     if(response['data']['error']) {
                //         this.showPopup(response['data']['error'], 'popup_danger')
                //     } else {
                //         this.showPopup('Пользователь успешно удален!', 'popup_success')
                //         setTimeout(() => {
                //             this.$router.push('/users')
                //         }, 1500);
                //     }
                // } catch(err) {
                //     alert(err)
                // }
                this.showPopup('Пользователь успешно удален!', 'popup_success')
            },

            // Фукнция для присвоения данных о пользователе с сервера, на страницу/форму (для возможности редактирования)
            // Присвоение данных одного объекта, к другому, нужно для того, чтобы привязать форму(инпуты) к новому объекту "editedUserData"
            // Так как v-model не может работать вместе с v-bind(:value)
            dataAssign() {
                this.editedUserData['emp_oid'] = this.userData.emp_oid
                this.editedUserData['last_name'] = this.userData.last_name
                this.editedUserData['first_name'] = this.userData.first_name
                this.editedUserData['middle_name'] = this.userData.middle_name
                this.editedUserData['user_login'] = this.userData.username 
                this.editedUserData['card_number'] = this.userData.card_num
                this.editedUserData['roles'] = this.userData.roles
            },

            showPopup(message, type) {
                this.popupVisible = true
                this.popupMessage = message
                this.popupType = type
            },

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

            // async checkCanEdit() {
            //     let result = await this.checkPermission({}, 'Администратор')
            //     if (result) {
            //         this.canEdit = true
            //     } else {
            //         this.canEdit = false
            //     }
            // }
        },

        // mounted() {
        //     this.checkCanEdit()
        // },
        
        watch: {
            // Фукнция наблюдения за состояние "isLoading"
            isLoading: function() {
                if(this.isLoading == false) {
                    this.dataAssign()
                }
            }
        }
    }
</script>
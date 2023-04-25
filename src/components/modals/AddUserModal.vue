<template>
    <form @submit.prevent>
        <div class="modal__body">
            <div class="row row-cols-1 row-cols-md-3">
                <div class="col">
                    <div class="input-group">
                        <label for="login" class="f-grey-5">Фамилия</label>
                        <input v-model.trim="user.last_name" type="text" class="input" tabindex="1"/>
                        <div v-if="errors.last_name" class="modal__errors">
                            <div class="modal__errors__item"> Введите фамилию!</div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="login" class="f-grey-5">Имя пользователя</label>
                        <input v-model.trim="user.username" type="text" class="input" tabindex="4"/>
                        <div v-if="errors.username" class="modal__errors">
                            <div class="modal__errors__item"> Введите имя пользователя!</div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group">
                        <label for="login" class="f-grey-5">Имя</label>
                        <input v-model.trim="user.name" type="text" class="input" tabindex="2"/>
                        <div v-if="errors.name" class="modal__errors">
                            <div class="modal__errors__item"> Введите имя!</div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="login" class="f-grey-5">Номер карты</label>
                        <input v-model.trim="user.card_number" v-mask="'###,#####'" class="input" placeholder="000,00000" tabindex="5"/>
                        <div v-if="errors.card_number" class="modal__errors">
                            <div class="modal__errors__item"> Введите номер карты!</div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group">
                        <label for="login" class="f-grey-5">Отчество</label>
                        <input v-model.trim="user.middle_name" type="text" class="input" tabindex="3"/>
                    </div>
                </div>
            </div>
            <div class="input-group">
                <label for="login" class="f-grey-5">Роли</label>
                <div class="checkbox-group">
                    <div class="checkbox-button">
                        <input v-model="user.roles" type="checkbox" id="role-operator" value="Оператор"/>
                        <div>
                            <span> Оператор </span>
                        </div>
                    </div>
                    <div class="checkbox-button">
                        <input v-model="user.roles" type="checkbox" id="role-operator" value="Наладчик"/>
                        <div>
                            <span> Наладчик </span>
                        </div>
                    </div>
                    <div class="checkbox-button">
                        <input v-model="user.roles" type="checkbox" id="role-operator" value="Технолог"/>
                        <div>
                            <span> Технолог </span>
                        </div>
                    </div>
                    <div class="checkbox-button">
                        <input v-model="user.roles" type="checkbox" id="role-operator" value="Администратор"/>
                        <div>
                            <span> Администратор </span>
                        </div>
                    </div>
                </div>
                <div v-if="errors.roles" class="modal__errors">
                    <div class="modal__errors__item"> Выберите хотя бы одну роль!</div>
                </div>
            </div>
        </div>
        <div class="modal__footer">
            <button @click="createUser" type="submit" class="button button_large button_primary">
                Добавить
            </button>
        </div>
    </form>
</template>

<script>
    import {mask} from 'vue-the-mask'

    export default {
        directives: {mask},

        data () {
            return {
                user: {
                    last_name: '',
                    name: '',
                    middle_name: '',
                    username: '',
                    card_number: '',
                    roles: []
                },

                errors: {
                    last_name: false,
                    name: false,
                    username: false,
                    card_number: false,
                    roles: false
                },
            }
        },

        methods: {
            createUser() {

                // Формирования объекта с ошибками (если обязательные поля не заполнены. TRUE-не заполнено)
                for (let i in this.user) {
                    // Является ли обязательное поле массивом(выбор ролей) и количество выбранных полей <= 0
                    if(Array.isArray(this.user[i]) & Object.keys(this.user[i]).length <= 0) {
                        // В таком случае отмечаем поле пустым т.е ошибка true
                        this.errors[i] = true 
                    // Обязательное поле не является массивом, а так же пуст                        
                    } else if(!this.user[i]) {
                        // В таком случае отмечаем поле пустым т.е ошибка true
                        this.errors[i] = true
                    // Иначе поле не пустое т.е без ошибок
                    } else {
                        this.errors[i] = false
                    }
                }

                // Проверка, есть ли в объекте с ошибками, значение true
                if(!Object.values(this.errors).includes(true)) {
                    // Если нет, выполняем отправку данных
                    this.$emit('create', this.user)
                    
                    this.user = {
                        last_name: '',
                        name: '',
                        middle_name: '',
                        username: '',
                        card_number: '',
                        roles: []
                    }
                } else {
                    console.log('Emit Error!')
                }
            }
        }
    }
</script>
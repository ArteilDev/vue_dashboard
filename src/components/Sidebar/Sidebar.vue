<template>
    <nav class="sidebar" id="sidebar">
        <div class="sidebar__header">
            <img src="/img/nav_logo.svg" class="sidebar__logo" alt="Logo">
            <div class="sidebar__brand">
                <span class="f-info">iMES</span>
                <span class="f-white">Panel</span>
            </div>
        </div>
        <div class="sidebar__list">
            <ul class="sidebar__links">
                <li>
                    <router-link class="sidebar__item active" to="/">
                        <i class="icon-gears"></i>
                        <span class="sidebar__links_name">Список ТПА</span>
                    </router-link>
                </li>
                <li>
                    <router-link class="sidebar__item" to="/users">
                        <i class="icon-users"></i>
                        <span class="sidebar__links_name">Пользователи</span>
                    </router-link>
                </li>
                <li>
                    <router-link class="sidebar__item" to="/controllers">
                        <i class="icon-microchip"></i>
                        <span class="sidebar__links_name">Контроллеры</span>
                    </router-link>
                </li>
            </ul>

            <ul class="sidebar__logout">
                <li>
                    <a @click="onLogout" class="sidebar__item">
                        <i class="icon-log-out"></i>
                        <span class="sidebar__links_name">Выйти</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>

    <nav class="sidebar sidebar_small hidden" id="sidebar_small">
        <div class="sidebar__header">
            <img src="/img/nav_logo.svg" class="sidebar__logo" alt="Logo">
            <div class="sidebar__brand">
                <span class="f-info">iMES</span>
                <span class="f-white">Panel</span>
            </div>
        </div>
        <div class="sidebar__list">
            <ul class="sidebar__links">
                <li>
                    <router-link class="sidebar__item active" to="/">
                        <i class="icon-gears"></i>
                        <span class="sidebar__links_name">Список ТПА</span>
                    </router-link>
                </li>
                <li>
                    <router-link class="sidebar__item" to="/users">
                        <i class="icon-users"></i>
                        <span class="sidebar__links_name">Пользователи</span>
                    </router-link>
                </li>
                <li>
                    <router-link class="sidebar__item" to="/controllers">
                        <i class="icon-microchip"></i>
                        <span class="sidebar__links_name">Контроллеры</span>
                    </router-link>
                </li>
            </ul>
            <ul class="sidebar__logout">
                <li>
                    <a @click="onLogout" class="sidebar__item">
                        <i class="icon-log-out"></i>
                        <span class="sidebar__links_name">Выйти</span>
                    </a>
                </li>
                <li>
                    <a class="sidebar__item sidebar__item_collapse" @click="collapseSidebar">
                        <i class="icon-left"></i>
                        <span class="sidebar__links_name">Закрыть меню</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Sidebar',

        methods: {
            onLogout() {
                this.$store.dispatch('auth/Logout')
                return this.$router.push('/login')
            },

            collapseSidebar() {
                document.querySelector('#sidebar_small').classList.toggle('hidden')
            }
        }
    }
</script>
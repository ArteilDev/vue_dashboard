<template>
    <div class="header shadow-1">
        <i class="sidebar-toggler sidebar-toggler_wide icon-menu" id="toggler_wide" @click="toggleSidebar"></i>
        <i class="sidebar-toggler sidebar-toggler_small icon-menu" id="toggler_small" @click="toggleSidebar"></i>
        <a href="#" class="header__user">
            <i class="header__user_avatar icon-user"></i>
            <p class="header__user_name"> {{ current_user }}</p>
        </a>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                current_user: ''
            }
        },

        methods: {
            setCurrentUser() {
                this.current_user = localStorage.getItem('employee')
            },

            toggleSidebar(event) {
                let sidebar = document.querySelector('#sidebar')
                let sidebar_small = document.querySelector('#sidebar_small')
                if(event.target.id == 'toggler_wide') {
                    sidebar.classList.toggle('active')
                } else {
                    sidebar_small.classList.toggle('hidden')
                }
            }
        },

        mounted() {
            this.setCurrentUser()
        }
    }
</script>
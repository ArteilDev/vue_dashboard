<template>
    <div v-if="show === true" class="popup shadow-2">
        <p> {{ message }} </p>
        <span class="popup__close icon-close" @click="hidePopup"></span>
    </div>
</template>

<script>
    export default {
        name: 'popup',

        props: {
            show: {
                type: Boolean,
                default: false
            },

            message: ''
        },

        methods: {
            hidePopup() {
                this.$emit('update:show', false)
            }
        },

        watch: {
            show(newValue, oldValue) {
                if(oldValue === false & newValue === true) {
                    setTimeout(this.hidePopup, 5000);
                }
            }
        }
    }
</script>
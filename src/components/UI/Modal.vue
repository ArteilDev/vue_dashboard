<template>
    <div v-if="show === true" @click="hideModal" class="modal-container">
        <div @click.stop class="modal">
            <div class="modal__header">
                <span><slot name="modal-title"></slot></span>
                <span class="cursor-pointer icon-close" @click="hideModal"></span>
            </div>
            <slot name="modal-body"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'modal',

        props: {

            show: {
                type: Boolean,
                default: false
            },
        },

        methods: {
            hideModal() {
                this.$emit('update:show', false)
            }
        },
    }
</script>
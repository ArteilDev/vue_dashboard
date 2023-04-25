<template>
    <select v-bind:value="modelValue" class="select" @change="changeOptions">
        <option disabled selected value="">Сортировать...</option>
        <option v-for="option in options" :key="option.value" :value="option.value"> {{ option.name }}</option>
    </select>
</template>

<script>
    export default {
        name: 'sort-select',
        props: {
            modelValue: {
                type: String
            },
            options: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            changeOptions(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>
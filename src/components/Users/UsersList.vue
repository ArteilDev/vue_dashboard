<template>
    <div @click="$router.push(`/users/6447c09e8e4aa6225e90a59d`)" class="list-item row row-cols-3 align-items-center" v-for="user in users" :key="user.Oid">
        <span>{{ user.Name }} </span>
        <span>{{ user.UserName }}</span>
        <!-- <span><span v-for="role in user.Roles">{{ role }}, </span></span> -->
        <VTooltip class="list-item__roles" v-if="user.Roles.length > 1">
            <div>
                {{ user.Roles[0] }}
                <span v-if="user.Roles.length > 1" class="list-item__count">{{ user.Roles.length }}</span>
            </div>
            <template #popper>
                <div v-for="role in user.Roles">{{ role }}</div>
            </template>
        </VTooltip>
        <span v-else>{{ user.Roles[0] }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            users: {
                type: Array,
                required: true,
                default: []
            },
        },
    }
</script>
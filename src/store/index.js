import { createStore } from 'vuex'

import { homeModule } from '@/store/homeModule'

import { usersModule } from '@/store/usersModule'
import { currentUserModule } from '@/store/currentUser/currentUserModule'

import { currentTpaModule } from '@/store/currentTpa/currentTpaModule'
import { chartModule } from '@/store/currentTpa/chartModule'
import { fixedTpaData } from '@/store/currentTpa/fixedTpaData'


export default createStore ({
    state: {
        isLoading: false,
    },

    modules: {
        home: homeModule,
        users: usersModule,
        currentUser: currentUserModule,
        currentTpa: currentTpaModule,
        chart: chartModule,
        fixedTpaData: fixedTpaData,
    },
})
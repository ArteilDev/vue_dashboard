<template>
     <div class="page">
        <div class="row row-cols-2">
            <div class="col-8">
                <h1 class="page_title">Информация о ТПА</h1>
            </div>
            <div class="col-4">
                <vue-date-picker
                    v-model="date"
                    model-type="dd.MM.yyyy"
                    :max-date="new Date()"
                    locale="ru"
                    :format="format"
                    cancelText=""
                    selectText="Выбрать"
                    placeholder="Выбрать предыдущую смену"
                    :enable-time-picker="false"
                    auto-apply
                />
            </div>
        </div>

        <current-tpa :tpaData="getCurrentTpaData" :execPlan="getExecPlan"/>

        <div class="row row-cols-xl-2 row-cols-xxl-4">
            
            <fixed-weight :fixedWeight="weightData" />

            <fixed-defects :fixedDefects="wasteDefectData" />
            
            <fixed-wastes :fixedWastes="wasteDefectData" />

            <downtimes :downtimesData="downtimesData"/>
        </div>
    </div>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex'

import CurrentTpa from '@/components/CurrentTpa.vue';
import fixedWeight from '@/components/currentTpa/fixedWeight.vue';
import fixedDefects from '@/components/currentTpa/fixedDefects.vue';
import fixedWastes from '@/components/currentTpa/fixedWastes.vue';
import Downtimes from '@/components/currentTpa/Downtimes.vue';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {

    data() {
		return {
			updateInterval: '', // Переменная интервала, с которой отправляется запрос
            
            date: null,
            format: (date) => { // Форматирование даты для выбора прошлой смены (из ММ/ДД/ГГ, на ДД.ММ.ГГ)
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const year = date.getFullYear();

                return `${day}.${month}.${year}`;
            },
		}
	},

    components: {
        CurrentTpa, fixedWeight, fixedDefects, fixedWastes, Downtimes, VueDatePicker 
    },

    created() {
		this.fetchCurrentTpaData(this.$route.params.id) // Первичный запрос данных
        
		this.updateInterval = setInterval(async() => {
            this.fetchCurrentTpaData(this.$route.params.id),
            this.fetchWasteDefectData(this.$route.params.id)
            this.fetchDowntimesData(this.$route.params.id)
            this.fetchWeightData(this.$route.params.id)
        }, 30000) // Запрос на обновление данные с интервалом
	},

    computed: {
        ...mapState ({
            isLoading: state => state.isLoading,
            tpaData: state => state.currentTpa.tpaData,
            execPlan: state => state.currentTpa.execPlan,
            wasteDefectData: state => state.fixedTpaData.wasteDefectData,
            downtimesData: state => state.fixedTpaData.downtimesData,
            weightData: state => state.fixedTpaData.weightData
        }),

        ...mapGetters ({
            getCurrentTpaData: 'currentTpa/getCurrentTpaData',
            getExecPlan: 'currentTpa/getExecPlan',
        })
    },

    methods: {
        ...mapActions ({
            fetchCurrentTpaData: 'currentTpa/fetchCurrentTpaData',
            fetchWasteDefectData: 'fixedTpaData/fetchWasteDefectData',
            fetchDowntimesData: 'fixedTpaData/fetchDowntimesData',
            fetchWeightData: 'fixedTpaData/fetchWeightData'
        }),

        cancelAutoUpdate () {
            clearInterval(this.updateInterval);
        },
    },

    mounted() {
        this.fetchCurrentTpaData(this.$route.params.id)
        this.fetchWasteDefectData(this.$route.params.id)
        this.fetchDowntimesData(this.$route.params.id)
        this.fetchWeightData(this.$route.params.id)
    },

    // После удаления компонента(смены страницы и тд), вызываем удаление интервала, таймера
	beforeUnmount () {
    	this.cancelAutoUpdate();
    }
}

</script>
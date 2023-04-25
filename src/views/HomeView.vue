<template>
    <div class="page">
        <h1 class="page_title h4"> <i class="icon-gears me-2"></i> Список всех ТПА</h1>
        <div class="tpa-list row row-cols-md-2 row-cols-xl-3">
            <div class="col">
                <div class="card card__all-tpa-info shadow-1">
                    <div class="card__all-tpa-info_line" style="background-color: #11A1FD;"></div>
                    <div class="d-flex flex-column">
                        <span class="card__all-tpa-info_title">Всего</span>
                        <span class="card__all-tpa-info_subtitle h2" style="color: #11A1FD;">{{ tpaCount }}</span>
                    </div>
                    <i class="icon-chart card__all-tpa-info_icon h2" style="color: #11A1FD;"></i>
                </div>
            </div>
            <div class="col">
                <div class="card card__all-tpa-info shadow-1">
                    <div class="card__all-tpa-info_line" style="background-color: #07C180;"></div>
                    <div class="d-flex flex-column">
                        <span class="card__all-tpa-info_title">В работе</span>
                        <span class="card__all-tpa-info_subtitle h2" style="color: #07C180;">{{ tpaCount - downtimeTPA }}</span>
                    </div>
                    <i class="card__all-tpa-info_subtitle icon-check h2" style="color: #07C180;"></i>
                </div>
            </div>
            <div class="col">
                <div class="card card__all-tpa-info shadow-1">
                    <div class="card__all-tpa-info_line" style="background-color: #F42B3D;"></div>
                    <div class="d-flex flex-column">
                        <span class="card__all-tpa-info_title">В простое</span>
                        <span class="card__all-tpa-info_subtitle h2" style="color: #F42B3D;">{{ downtimeTPA }}</span>
                    </div>
                    <i class="card__all-tpa-info_subtitle icon-warning h2" style="color: #F42B3D;"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h1 class="section_title h5">Общая информация</h1>
        
        <div v-if="!isLoading">
            <tpa-cards :tpaCards="completeData"/>
        </div>

        <div v-else>
            <loader />
        </div>
        
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'

    import TpaCards from '@/components/TpaCards.vue'

    export default {

        data() {
			return {
				updateInterval: '', // Переменная интервала, с которой отправляется запрос на обновление
			}
		},

        components: {
            TpaCards,
        },

        created() {
			this.fetchAllTpaData() // Первичный запрос данных
			this.updateInterval = setInterval(async() => { this.fetchAllTpaData() }, 30000) // Запрос на обновление данные с интервалом
		},

        computed: {
			...mapState ({
                isLoading: state => state.isLoading,
				allTpa: state => state.home.allTpa,
                tpaCount: state => state.home.tpaCount,
                downtimeTPA: state => state.home.downtimeTPA
			}),

            ...mapGetters ({
				completeData: 'home/completeData'
			})
        },

        methods: {
			...mapActions ({
				fetchAllTpaData: 'home/fetchAllTpaData'
			}),

            cancelAutoUpdate () {
            	clearInterval(this.updateInterval);
        	}
		},

        		// После удаления компонента(смены страницы и тд), вызываем удаление интервала, таймера
		beforeUnmount () {
    		this.cancelAutoUpdate();
    	}
    }
</script>
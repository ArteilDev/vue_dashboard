<template>
    <div class="tpa-list row row-cols-md-3 row-cols-xl-4">
        <div class="col">
            <div class="card card-tpa-header shadow-1">
                <div class="card__all-tpa-info_line" style="background-color: #223345;"></div>
                <div class="d-flex flex-column">
                    <span class="card-tpa-header_subtitle" style="color: #223345;"> {{ tpaData.Name }} </span>
                </div>
                <i class="icon-gears card-tpa-header_icon h2" style="color: #223345;"></i>
            </div>
        </div>
        <div class="col">
            <div v-if="tpaData.EAMState">
                <div class="card card-tpa-header shadow-1">
                    <div class="card__all-tpa-info_line" style="background-color: #07C180;"></div>
                    <div class="d-flex flex-column">
                        <span class="card-tpa-header_title">Состояние в ЕАМ</span>
                        <span class="card-tpa-header_subtitle" style="color: #07C180;">В работе</span>
                    </div>
                    <i class="card-tpa-header_icon icon-check h2" style="color: #07C180;"></i>
                </div>
            </div>
            <div v-else>
                <div class="card card-tpa-header shadow-1">
                    <div class="card__all-tpa-info_line" style="background-color: #F42B3D;"></div>
                    <div class="d-flex flex-column">
                        <span class="card-tpa-header_title">Состояние в ЕАМ</span>
                        <span class="card-tpa-header_subtitle" style="color: #F42B3D;">В простое</span>
                    </div>
                    <i class="card-tpa-header_icon icon-warning h2" style="color: #F42B3D;"></i>
                </div>
            </div>
        </div>
        <div class="col">
            <div v-if="tpaData.MESState">
                <div class="card card-tpa-header shadow-1">
                    <div class="card__all-tpa-info_line" style="background-color: #07C180;"></div>
                    <div class="d-flex flex-column">
                        <span class="card-tpa-header_title">Состояние терминала</span>
                        <span class="card-tpa-header_subtitle" style="color: #07C180;">В работе</span>
                    </div>
                    <i class="card-tpa-header_icon icon-check h2" style="color: #07C180;"></i>
                </div>
            </div>
            <div v-else>
                <div class="card card-tpa-header shadow-1">
                    <div class="card__all-tpa-info_line" style="background-color: #F42B3D;"></div>
                    <div class="d-flex flex-column">
                        <span class="card-tpa-header_title">Состояние терминала</span>
                        <span class="card-tpa-header_subtitle" style="color: #F42B3D;">В простое</span>
                    </div>
                    <i class="card-tpa-header_icon icon-warning h2" style="color: #F42B3D;"></i>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card card-tpa-header shadow-1">
                <div class="card__all-tpa-info_line" style="background-color: #11A1FD;"></div>
                <div class="d-flex flex-column">
                    <span class="card-tpa-header_title">До конца плана</span>
                    <span class="card-tpa-header_subtitle" style="color: #11A1FD;">
                        <vue-countdown :time="execPlan" v-slot="{ hours, minutes, seconds }">
                            <span v-if="hours.toString().length != 1">
                                {{ hours }} :
                            </span>
                            <span v-else>
                                0{{ hours }} :
                            </span>

                            <span v-if="minutes.toString().length != 1">
                                {{ minutes }} :
                            </span>
                            <span v-else>
                                0{{ minutes }} :
                            </span>

                            <span v-if="seconds.toString().length != 1">
                                {{ seconds }}
                            </span>
                            <span v-else>
                                0{{ seconds }}
                            </span>
				        </vue-countdown>
                    </span>
                </div>
                <i class="card-tpa-header_icon icon-time h2" style="color: #11A1FD;"></i>
            </div>
        </div>
    </div>

    <div v-if="tpaData.Product !== 'Нет сменного задания'" class="grid-tpa_wide">
        <div class="chart-container shadow-1">
            <chart />
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">Пресс-форма</div>
            <div class="card-current-tpa__data_subtitle">{{ tpaData.PressForm }}</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">Продукт</div>
            <div v-for="product in tpaData.Product">
                <div v-if="tpaData.Product.length > 1">
                    <div class="card-current-tpa__data_subtitle">{{ product }}</div>
                </div>
                <div v-else>
                    <div class="card-current-tpa__data_subtitle">{{ product }}</div>
                </div>
            </div>
        </div>
        <div class="card-current-tpa card-current-tpa__data ">
            <div class="card-current-tpa__data_title">План по прод.</div>
            <div class="d-flex">
                <div v-for="plan in tpaData.Plan">
                    <div v-if="tpaData.Plan.length > 1">
                        <div class="card-current-tpa__data_prodCount" style="color: #11A1FD;"> {{ plan }} </div>
                    </div>
                    <div v-else>
                        <div class="card-current-tpa__data_prodCount" style="color: #11A1FD;">{{ plan }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">Выпущено прод.</div>
            <div class="d-flex">
                <div v-for="fact in tpaData.Fact">
                    <div v-if="tpaData.Fact.length > 1">
                        <div class="card-current-tpa__data_prodCount" style="color: #07C180;">{{ fact }}</div>
                    </div>
                    <div v-else>
                        <div class="card-current-tpa__data_prodCount" style="color: #07C180;">{{ fact }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Плановый цикл</div>
            <div class="card-current-tpa__data_subtitle">{{ tpaData.plan_cycle }}</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Цикл за смену</div>
            <div class="card-current-tpa__data_subtitle">{{ tpaData.fact_cycle }}</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Плановый вес</div>
            <div class="d-flex">
                <div v-for="plan_weight in tpaData.plan_weight">
                    <div v-if="tpaData.plan_weight.length > 1">
                        <div class="card-current-tpa__data_subtitle mx-3">{{ plan_weight }}</div>
                    </div>
                    <div v-else>
                        <div class="card-current-tpa__data_subtitle">{{ plan_weight }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Средний вес</div>
            <div v-if="tpaData.average_weight">
                <div v-for="average_weight in tpaData.average_weight">
                    <div v-if="tpaData.average_weight.length > 1">
                        <div class="card-current-tpa__data_subtitle mx-3">{{ average_weight }}</div>
                    </div>
                    <div v-else>
                        <div class="card-current-tpa__data_subtitle">{{ average_weight }}</div>
                    </div>
                </div>
            </div>
            <div v-else>
                0
            </div>
        </div>
    </div>

    <div v-else class="grid-tpa_wide">
        <div class="chart-container shadow-1">
            <chart />
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">Пресс-форма</div>
            <div class="card-current-tpa__data_subtitle">{{ tpaData.PressForm }}</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">Продукт</div>
            <div class="card-current-tpa__data_subtitle" style="color: #F42B3D;">Нет сменного задания</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_prodCount">
            <div class="card-current-tpa__data_title">План по прод.</div>
            <div class="card-current-tpa__data_subtitle" style="color: #11A1FD;">0</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">Выпущено прод.</div>
            <div class="d-flex">
                <div v-for="fact in tpaData.Fact">
                    <div v-if="tpaData.Fact.length > 1">
                        <div class="card-current-tpa__data_prodCount" style="color: #07C180;">{{ fact }}</div>
                    </div>
                    <div v-else>
                        <div class="card-current-tpa__data_prodCount" style="color: #07C180;">{{ fact }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Плановый цикл</div>
            <div class="card-current-tpa__data_subtitle">0</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Цикл за смену</div>
            <div class="card-current-tpa__data_subtitle">{{ tpaData.fact_cycle }}</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Плановый вес</div>
            <div class="card-current-tpa__data_subtitle">0</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Средний вес</div>
            <div class="card-current-tpa__data_subtitle">0</div>
        </div>
    </div>

    <div v-if="tpaData.Product !== 'Нет сменного задания'" class="grid-tpa_small">
        <div class="chart-container shadow-1">
            <chart />
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">Пресс-форма</div>
            <div class="card-current-tpa__data_subtitle">{{ tpaData.PressForm }}</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">Продукт</div>
            <div v-for="product in tpaData.Product">
                <div v-if="tpaData.Product.length > 1">
                    <div class="card-current-tpa__data_subtitle">{{ product }}</div>
                </div>
                <div v-else>
                    <div class="card-current-tpa__data_subtitle">{{ product }}</div>
                </div>
            </div>
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">План по прод.</div>
            <div class="d-flex">
                <div v-for="plan in tpaData.Plan">
                    <div v-if="tpaData.Plan.length > 1">
                        <div class="card-current-tpa__data_prodCount" style="color: #11A1FD;"> {{ plan }} </div>
                    </div>
                    <div v-else>
                        <div class="card-current-tpa__data_prodCount" style="color: #11A1FD;">{{ plan }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">Выпущено прод.</div>
            <div class="d-flex">
                <div v-for="fact in tpaData.Fact">
                    <div v-if="tpaData.Fact.length > 1">
                        <div class="card-current-tpa__data_prodCount" style="color: #07C180;">{{ fact }}</div>
                    </div>
                    <div v-else>
                        <div class="card-current-tpa__data_prodCount" style="color: #07C180;">{{ fact }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Плановый цикл</div>
            <div class="card-current-tpa__data_subtitle">{{ tpaData.plan_cycle }}</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Цикл за смену</div>
            <div class="card-current-tpa__data_subtitle">{{ tpaData.fact_cycle }}</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Плановый вес</div>
            <div class="d-flex">
                <div v-for="plan_weight in tpaData.plan_weight">
                    <div v-if="tpaData.plan_weight.length > 1">
                        <div class="card-current-tpa__data_subtitle mx-3">{{ plan_weight }}</div>
                    </div>
                    <div v-else>
                        <div class="card-current-tpa__data_subtitle">{{ plan_weight }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Средний вес</div>
            <div v-if="!tpaData.average_weight">
                <div v-for="average_weight in tpaData.average_weight">
                    <div v-if="tpaData.average_weight.length > 1">
                        <div class="card-current-tpa__data_subtitle mx-3">{{ average_weight }}</div>
                    </div>
                    <div v-else>
                        <div class="card-current-tpa__data_subtitle">{{ average_weight }}</div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="card-current-tpa__data_subtitle">0</div>
            </div>
        </div>
    </div>
    
    <div v-else class="grid-tpa_small">
        <div class="chart-container shadow-1">
            <chart />
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">Пресс-форма</div>
            <div class="card-current-tpa__data_subtitle">{{ tpaData.PressForm }}</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data">
            <div class="card-current-tpa__data_title">Продукт</div>
            <div class="card-current-tpa__data_subtitle" style="color: #F42B3D;">Нет сменного задания</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_prodCount">
            <div class="card-current-tpa__data_title">План по прод.</div>
            <div class="card-current-tpa__data_subtitle" style="color: #11A1FD;">0</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_prodCount">
            <div class="card-current-tpa__data_title">Выпущено прод.</div>
            <div class="d-flex">
                <div v-for="fact in tpaData.Fact">
                    <div v-if="tpaData.Fact.length > 1">
                        <div class="card-current-tpa__data_subtitle mx-3" style="color: #07C180;">{{ fact }}</div>
                    </div>
                    <div v-else>
                        <div class="card-current-tpa__data_subtitle" style="color: #07C180;">{{ fact }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Плановый цикл</div>
            <div class="card-current-tpa__data_subtitle">0</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Цикл за смену</div>
            <div class="card-current-tpa__data_subtitle">{{ tpaData.fact_cycle }}</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Плановый вес</div>
            <div class="card-current-tpa__data_subtitle">0</div>
        </div>
        <div class="card-current-tpa card-current-tpa__data card-current-tpa__data_count">
            <div class="card-current-tpa__data_title">Средний вес</div>
            <div class="card-current-tpa__data_subtitle">0</div>
        </div>
    </div>
</template>

<script>
    import Chart from '@/components/UI/Chart.vue'
    import VueCountdown from '@chenfengyuan/vue-countdown';

    export default {
        props: {
            tpaData: {
                type: Object,
                required: true
            },

            execPlan: 0
        },

        components: {
            Chart, VueCountdown
        }
    }
</script>
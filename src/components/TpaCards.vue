<template>
<div class="tpa-card-list">
    <div  class="tpa-list row row-cols-1 row-cols-md-2 row-cols-xl-4">
        <div v-for="card in tpaCards" :key="card.TpaOid" class="col">
            <div @click="$router.push(`/tpa/${card.TpaOid}`)" class="card card-tpa shadow-1">
                <div class="card-tpa__title h5">{{ card.Name }}</div>
                <div class="card-tpa__data-list">
                    <div class="card-tpa__chart">
                        <div v-if="card.fact !== '0'">
                            <div class="pie animate text-main"
                                :style="{ '--p': 'calc(100 * ' + card.fact / card.plan + ')', '--c': '#11A1FD' }">
                                {{ card.fact }}
                            </div>
                        </div>
                        <div v-else>
                            <div class="pie animate text-main"
                                :style="{ '--p': '0', '--c': '#11A1FD' }">
                                {{ card.fact }}
                            </div>
                        </div>
                    </div>
                    <div class="card-tpa__data">
                        <span class="fw-bold">Тех состояние</span>
                        <div class="card-tpa__data_group">
                            <span>ЕАМ</span>
                            <span v-if="card.EamState === 'В простое'" class="badge badge_info" data-tpa-data="techStatusEAM"> В простое </span>
                            <span v-else class="badge badge_success" data-tpa-data="techStatusEAM">В работе</span>
                        </div>
                        <div class="card-tpa__data_group">
                            <span>Терминал</span>
                            <span v-if="card.MesState === 'В простое'" class="badge badge_info" data-tpa-data="techStatusTerminal"> В простое </span>
                            <span v-else class="badge badge_success" data-tpa-data="techStatusTerminal">В работе</span>
                        </div>
                    </div>
                    <div class="card-tpa__data">
                        <span class="fw-bold">Пресс-форма</span>
                        <div class="card-tpa__data_group">
                            <span v-if="!card.PressForm" class="badge badge_outline_danger" data-tpa-data="pressForm">Отсутствует</span>
                            <span v-else data-tpa-data="pressForm">{{ card.PressForm }}</span>
                        </div>
                    </div>
                    <div class="card-tpa__data d-flex justify-content-between">
                        <span class="fw-bold">Произведено</span>
                        <span class="badge badge_primary" data-tpa-data="productFact">{{ card.fact }}</span>
                    </div>
                    <div class="card-tpa__data d-flex justify-content-between">
                        <span class="fw-bold">План</span>
                        <span class="badge badge_info" data-tpa-data="productPlan">{{ card.plan }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        props: {
            tpaCards: {
                type: Array,
                required: true
            }
        }
    }
</script>
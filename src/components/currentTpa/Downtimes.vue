<template>
    <div class="col mb-3">
        <div class="section section-list-container">
            <div class="section section-list-container">
                <div class="section-list-container__header">
                    <h2 class="h6">Простои</h2>
                    <span class="badge badge_danger h6 d-flex align-content-center">
                        <span class="me-2">{{ count }}</span>
                        <i class="icon-info"></i>
                    </span>
                </div>
                <div class="section-list-container__body">
                    <div v-for="downtime in downtimesData" class="section-list-container__item">

                        <VTooltip v-if="downtime.MalfunctionCause">
                            <div class="row row-cols-4">
                                <div class="col-2">
                                    <span>Начало</span>
                                </div>
                                <div class="col-4">
                                    <p style="text-align:end;">{{ downtime.StartDate }}</p>
                                </div>
                                <div class="col-2">
                                    <span>Конец</span>
                                </div>
                                <div class="col-4">
                                    <p style="text-align:end;">{{ downtime.EndDate }}</p>
                                </div>
                            </div>
                            <template #popper>
                                <p><b>Причина: </b>{{ downtime.MalfunctionCause }}</p>
                                <p><b>Описание: </b>{{ downtime.MalfunctionDescription }}</p>
                                <p><b>Предпринятые меры :</b>{{ downtime.TakenMesures }}</p>
                                <p><b>Комментарий: </b>{{ downtime.Note }}</p>
                                <p><b>Наладчик: </b>{{ downtime.Creator }}</p>
                            </template>
                        </VTooltip>

                        <div v-else class="row row-cols-4">
                            <div class="col-2">
                                <span>Начало</span>
                            </div>
                            <div class="col-4">
                                <p style="text-align:end;">{{ downtime.StartDate }}</p>
                            </div>
                            <div class="col-2">
                                <span>Конец</span>
                            </div>
                            <div class="col-4">
                                <p style="text-align:end;">{{ downtime.EndDate }}</p>
                                <span class="badge-sm badge-sm_danger"></span>
                            </div>
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
            downtimesData: {}
        },

        data() {
            return {
                count: 0
            }
        },

        updated() {
            this.count = Object.keys(this.downtimesData).length
        }
    }
</script>
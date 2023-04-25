<template>
    <div class="col mb-3">
        <div class="section section-list-container">
            <div class="section-list-container__header">
                <h2 class="h6">Брак</h2>
                <span class="badge badge_outline_danger h6 d-flex align-content-center">
                    <span class="me-2">{{ count }}</span>
                    <i class="icon-info"></i>
                </span>
            </div>
            <div class="section-list-container__body">
                <div v-for="defect in computedData">
                    <div v-if="defect.type === 'Брак'" class="section-list-container__item"
                        v-tooltip="{
                            content: `
                                <b>Продукт: </b>`+ defect.product_name +`<br>
                                <b>Сотрудник:</b>`+ defect.creator,
                            html:true}">
                        <div class="row row-cols-2">
                            <div class="col">
                                <span>{{ defect.create_date }}</span>
                            </div>
                            <div class="col me-auto">
                                <span>{{ defect.count }} шт. {{ defect.weight }} кг.</span>
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
            fixedDefects: {}
        },

        data() {
            return {
                count: 0
            }
        },

        computed: {
            computedData() {
                this.count = 0
                
                for (let i in this.fixedDefects) {
                    this.fixedDefects[i].weight = Math.round(this.fixedDefects[i].weight)
                    this.fixedDefects[i].count = Math.round(this.fixedDefects[i].count)

                    if(this.fixedDefects[i].type === 'Брак') {
                        this.count += 1
                    }
                }
                
                return this.fixedDefects
            }
        },
    }
</script>
<template>
    <div class="col mb-3">
        <div class="section section-list-container">
            <div class="section-list-container__header">
                <h2 class="h6">Отходы</h2>
                <span class="badge badge_outline_warning h6 d-flex align-content-center">
                    <span class="me-2">{{ count }}</span>
                    <i class="icon-info"></i>
                </span>
            </div>
            <div class="section-list-container__body">
                <div v-for="waste in computedData">
                    <div v-if="waste.type === 'Отход'" class="section-list-container__item"
                        v-tooltip="{
                            content: `
                                <b>Материал: </b>` + waste.material + `<br>
                                <b>Продукт: </b>` + waste.product_name + `<br>
                                <b>Сотрудник: </b>` + waste.creator,
                            html:true}">
                        <div class="row row-cols-3">
                            <div class="col-2">
                                <span>{{ waste.create_date }}</span>
                            </div>
                            <div class="col-8">
                                <p>{{ waste.material }}</p>
                            </div>
                            <div class="col-2">
                                <span>{{ waste.weight }} кг.</span>
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
            fixedWastes: {}
        },

        data() {
            return {
                count: 0
            }
        },

        computed: {
            computedData() {
                this.count = 0
                
                for (let i in this.fixedWastes) {
                    this.fixedWastes[i].weight = Math.round(this.fixedWastes[i].weight)

                    if(this.fixedWastes[i].type === 'Отход') {
                        this.count += 1
                    }
                }
                return this.fixedWastes
            }
        }
    }
</script>
<template>
    <div class="col mb-3">
        <div class="section section-list-container">
            <div class="section-list-container__header">
                <h2 class="h6">Введенный вес</h2>
                <span class="badge badge_primary h6 d-flex align-content-center">
                    <span class="me-2">{{ count }}</span>
                    <i class="icon-info"></i>
                </span>
            </div>
            <div class="section-list-container__body">
                <div v-for="(weight, index) in computedData" :key="index" class="section-list-container__item"
                    v-tooltip="{
                        content: `
                            <b>Продукт: </b> `+ weight.product +`<br>
                            <b>Вес:</b> `+ weight.weight +` кг. <br>
                            <b>Оператор: </b>`+ weight.creator,
                        html:true}">
                    <div class="row row-cols-3">
                        <div class="col-2">
                            <span>{{ weight.date }}</span>
                        </div>
                        <div class="col-7">
                            <p>{{ weight.product }}</p>
                        </div>
                        <div class="col-3">
                            <p>{{ weight.weight }} кг.</p>
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
            fixedWeight: {}
        },

        
        data() {
            return {
                count: 0
            }
        },

        computed: {
            computedData() {
                this.count = 0
                
                for (let i in this.fixedWeight) {
                    this.fixedWeight[i].weight = Math.round(this.fixedWeight[i].weight)
                    this.count += 1
                }
                return this.fixedWeight
            }
        }
    }
</script>
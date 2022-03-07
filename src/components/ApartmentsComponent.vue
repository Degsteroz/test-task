<template>
  <div class="apartmentComponent">
    <div
      v-for="apartment in apartmentsList"
      :key="apartment.id"
      class="apartmentWrapper"
      >
      <BaseApartment
        :apartment="apartment"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseApartment from '@/components/BaseApartment.vue'

export default Vue.extend({
  name: 'ApartmentsComponent',
  components: {
    BaseApartment
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    apartmentsList () {
      return this.data
    }
  },
  methods: {}
})
</script>

<style scoped lang="sass">
@import "src/styles/mixins"
@import "src/styles/colors"

.apartmentComponent
  display: flex
  flex-wrap: wrap
  justify-content: space-between

.apartmentWrapper
  margin-bottom: 30px
</style>

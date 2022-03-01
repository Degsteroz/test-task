<template>
  <v-container class="filter">
    <h1>{{ msg }}</h1>
    <input v-model="floorFilter.value[0]">
    <input v-model="floorFilter.value[1]">
    <v-range-slider
      @change="changeFloorValue"
      v-model="floorFilter.value"
      :max="floorFilter.range.max"
      :min="floorFilter.range.min"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FilterComponent',
  props: {
    msg: String
  },
  data () {
    return {
      floorFilter: {
        range: {
          min: 1,
          max: 99
        },
        value: [0, 99]
      }
    }
  },
  methods: {
    changeFloorValue (newValue: Array<number>) {
      this.floorFilter.value = newValue
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.filter
  display: flex

</style>

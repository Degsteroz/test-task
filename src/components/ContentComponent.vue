<template>
  <v-container class="content">
    <div class="content__header">
      {{this.message}}
    </div>
    <FilterComponent msg="Welcome to Your Vue.js + TypeScript App"/>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import FilterComponent from '@/components/FilterComponent.vue'

export default Vue.extend({
  name: 'ContentComponent',
  components: {
    FilterComponent
  },
  data () {
    return {
      message: 'Lorem ipsum dolor sit'
    }
  }
})
</script>

<style lang="sass" scoped>
.content
  background-color: #F8F8F8
  border-radius: 10px
  padding: 38px 0 102px

.content__header
  font-size: 34px
  line-height: 60px
  text-transform: uppercase
  color: #2C323A
  margin-bottom: 50px
</style>

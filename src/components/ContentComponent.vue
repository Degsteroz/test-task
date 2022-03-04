<template>
  <v-container class="content">
    <div class="content__header">
      {{this.message}}
    </div>
    <FilterComponent
      :filter-value="filterValue"
      @change="setNewFilterValue"
    />
    {{filterValue}}
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import FilterComponent from '@/components/FilterComponent.vue'

interface FilterValue {
  floors: number[],
  square: number[],
  price: number[],
  rooms: number[]
}

export default Vue.extend({
  name: 'ContentComponent',
  components: {
    FilterComponent
  },

  async created () {
    const store = this.$store
    await store.dispatch('fetchData')
      .then(() => {
        store.dispatch('createDefaultFilterValue').then(() => {
          this.filterValue = { ...store.getters.getDefaultFilterValue }
        })
      })
  },

  data () {
    return {
      message: 'Lorem ipsum dolor sit',
      filterValue: {
        floors: [0, 99],
        square: [0, 99],
        price: [0, 99],
        rooms: [] as Array<number>
      }
    }
  },
  computed: {
    values () {
      return this.$store.getters.getValue
    }
  },
  methods: {
    setNewFilterValue (newValue : FilterValue) {
      this.filterValue = { ...newValue }
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

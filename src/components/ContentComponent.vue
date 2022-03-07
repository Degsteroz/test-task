<template>
  <v-container class="content">
    <div class="content__header">
      {{headerText}}
    </div>
    <FilterComponent
      :filter-value="filterValue"
      @change="setNewFilterValue"
      class="content__filter"
    />
    <ApartmentsComponent
      :data="values"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import FilterComponent from '@/components/FilterComponent.vue'
import ApartmentsComponent from '@/components/ApartmentsComponent.vue'

interface FilterValue {
  floor: number[],
  square: number[],
  price: number[],
  rooms: number[]
}

export default Vue.extend({
  name: 'ContentComponent',
  components: {
    FilterComponent,
    ApartmentsComponent
  },

  async created () {
    const store = this.$store

    await store.dispatch('fetchData')
      .then(() => {
        store.dispatch('createDefaultFilterValue')
      })
  },

  data () {
    return {
      headerText: 'Lorem ipsum dolor sit'
    }
  },

  computed: {
    values () {
      return this.$store.getters.getValue
    },

    filterValue: {
      get () {
        return this.$store.getters.getFilterValue
      },

      set (newValue) {
        this.$store.commit('setFilterValue', newValue)
      }
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
  padding: 0
  border-radius: 10px
  margin: 0
  max-width: 1200px

.content__header
  font-size: 34px
  line-height: 60px
  text-transform: uppercase
  color: #2C323A
  margin-bottom: 50px

.content__filter
  margin-bottom: 50px
</style>

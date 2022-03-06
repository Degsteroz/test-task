<template>
  <v-container class="content">
    <div class="content__header">
      {{this.message}}
    </div>
    <FilterComponent
      :filter-value="filterValue"
      @change="setNewFilterValue"
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
  floors: number[],
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
  border-radius: 10px
  padding: 38px 20px 102px
  margin: 0
  overflow: auto
  max-width: 1200px

.content__header
  font-size: 34px
  line-height: 60px
  text-transform: uppercase
  color: #2C323A
  margin-bottom: 50px
</style>

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filterValue: {
      floors: [0, 99],
      square: [0, 99],
      price: [0, 99],
      rooms: [] as Array<number>
    },
    defaultFilterValue: {
      floors: [0, 99],
      square: [0, 99],
      price: [0, 99],
      rooms: [] as Array<number>
    },
    values: [] as Array<Record<string, string | boolean | number>>,
    filteredValues: ['asd']
  },
  getters: {
    getFilterValue (state) {
      return state.filterValue
    },
    getValue (state) {
      return state.filteredValues
    },
    getDefaultFilterValue (state) {
      return state.defaultFilterValue
    }
  },
  mutations: {
    setFilterState (state, filter) {
      state.filterValue = filter
    },
    setValue (state, value) {
      state.values = value
    },
    setDefaultFilterState (state) {
      interface Acc {
        [key: string] : Array<number>
      }
      const filterFields = ['floor', 'square', 'price']

      // Тут, конечно, можно было обойтись одним проходом,
      // но я посчитал, что лучше сделать в 2, т.к. это правильнее
      // в плане симантики

      const accValues = state.values
        .reduce((acc : Acc, item: Record<string, string | number| boolean>) => {
          filterFields.forEach((field : string) => {
            if (!acc[field]) acc[field] = []
            acc[field].push(Math.floor(item[field] as number))
          })

          return acc
        }, {} as Acc)

      const defaultFilterValues = {
        floors: [Math.min(...accValues.floor), Math.max(...accValues.floor)],
        price: [
          Math.floor(Math.min(...accValues.price) / 1000000),
          Math.floor(Math.max(...accValues.price) / 1000000)
        ],
        square: [Math.min(...accValues.square), Math.max(...accValues.square)],
        rooms: []
      }
      state.defaultFilterValue = defaultFilterValues
      state.filterValue = { ...defaultFilterValues }
    }
  },
  actions: {
    async fetchData (context) {
      await axios.get('./index.json')
        .then((res) => {
          context.commit('setValue', res.data)
        })
    },
    createDefaultFilterValue (context) {
      context.commit('setDefaultFilterState')
    }
  },
  modules: {
  }
})

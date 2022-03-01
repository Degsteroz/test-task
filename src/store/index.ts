import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filterValue: {
      floor: [0, 99],
      square: [0, 99],
      price: [0, 99],
      rooms: [] as Array<number>
    } as Record<string, Array<number>>,

    defaultFilterValue: {
      floor: [0, 99],
      square: [0, 99],
      price: [0, 99],
      rooms: [] as Array<number>
    }as Record<string, Array<number>>,

    values: [] as Array<Record<string, string | boolean | number>>,
    filteredValues: [] as Array<Record<string, string | boolean | number>>
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
    setFilteredValuesState (state) {
      function isBetween (
        value : number,
        [min, max]: Array<number>,
        needToBeHigher = false) {
        return value >= min && (needToBeHigher ? value < max : value <= max)
      }

      state.filteredValues = state.values
        .filter(
          (value) => {
            return (
              isBetween(value.floor as number, state.filterValue.floor) &&
              isBetween(value.square as number, state.filterValue.square) &&
              isBetween(
                Math.floor(value.price as number / 1000000),
                state.filterValue.price,
                true
              ) && (
                !state.filterValue.rooms.length ||
                state.filterValue.rooms.includes(value.rooms as number)
              )
            )
          }
        )
    },

    setValue (state, value) {
      state.values = value
      state.filteredValues = value
    },

    createDefaultFilterState (state) {
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
            acc[field].push((item[field] as number))
          })

          return acc
        }, {} as Acc)

      const defaultFilterValues = {
        floor: [Math.min(...accValues.floor), Math.max(...accValues.floor)],
        price: [
          Math.floor(Math.min(...accValues.price) / 1000000),
          Math.round(Math.max(...accValues.price) / 1000000) + 1
        ],
        square: [Math.min(...accValues.square) - 1, Math.max(...accValues.square)],
        rooms: []
      }

      state.defaultFilterValue = defaultFilterValues
      state.filterValue = { ...defaultFilterValues }
    },

    changeFilterValueToDefault (state) {
      state.filterValue = state.defaultFilterValue
      state.filteredValues = state.values
    },

    setFilterValue (state, filter) {
      state.filterValue = filter
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
      context.commit('createDefaultFilterState')
    },

    setDefaultFilterValue (context) {
      context.commit('changeFilterValueToDefault')
    }
  }
})

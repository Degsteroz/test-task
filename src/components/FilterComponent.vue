<template>
  <v-container class="filter">
    <div class="buttonContainer">
      <span class="buttonContainer__header">Комнаты</span>
      <div class="buttonWrapper">
        <div
          v-for="button in filterOptions.rooms"
          :key="button.id"
          @click="changeButtonState(button.id)"
          class="buttonWrapper__button"
          :class="button.active ? '-active' : ''"
        >
          {{button.title}}
        </div>
      </div>

    </div>
    <BaseSlider
      v-for="field in filterFields"
      :key="field"
      :value="filterValue[field]"
      :options="filterOptions[field]"
      :min-value="defaultFilterValue[field][0]"
      :max-value="defaultFilterValue[field][1]"
      @change="(newValue) => changeFilterValue(newValue, field)"
    />
    <div class="actionWrapper">
      <div
        class="action -active -long"
        @click="saveFilters"
      >
        Применить
      </div>
      <div
        class="setDefaultAction"
        @click="setFilterValueToDefault"
      >
        Сбросить фильтр
        <div class="setDefaultAction__underline"/>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseSlider from '@/components/BaseSlider.vue'

export default Vue.extend({
  name: 'FilterComponent',
  components: {
    BaseSlider
  },
  props: {
    filterValue: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      filterFields: ['floors', 'square', 'price'] as Array<'floors' | 'square'| 'price'>,
      filterOptions: {
        floors: {
          header: 'Этаж'
        },
        square: {
          header: 'Площадь',
          subheader: 'м2'
        },
        price: {
          header: 'Стоимость',
          subheader: 'млн. р.'
        },
        rooms: [
          {
            id: 0,
            value: 0,
            title: 'S',
            active: false
          },
          {
            id: 1,
            value: 1,
            title: '1к',
            active: false
          },
          {
            id: 2,
            value: 2,
            title: '2к',
            active: false
          },
          {
            id: 3,
            value: 3,
            title: '3к',
            active: false
          }
        ]
      }
    }
  },
  computed: {
    defaultFilterValue () {
      return this.$store.getters.getDefaultFilterValue
    },
    localFilterValue: {
      get () {
        return this.filterValue
      },
      set (newValue) {
        this.$emit('change', newValue)
      }
    }
  },
  methods: {
    changeFilterValue (newValue: Array<number>, field: 'floors'| 'square' | 'price' | 'rooms') {
      const tempFilterValue = { ...this.localFilterValue }
      tempFilterValue[field] = newValue
      this.localFilterValue = tempFilterValue
    },
    changeButtonState (buttonId: number) : void {
      const currentButtonId = this.filterOptions.rooms
        .findIndex((button) => button.id === buttonId)
      this.filterOptions.rooms[currentButtonId].active = !this.filterOptions.rooms[currentButtonId].active
      const activeButtonsValue = this.filterOptions.rooms
        .filter((button) => button.active)
        .map((filteredButton) => filteredButton.value)

      this.changeFilterValue(activeButtonsValue, 'rooms')
    },

    saveFilters () {
      console.log(this.filterValue)
    },
    setFilterValueToDefault () {
      this.localFilterValue = {
        ...this.defaultFilterValue
      }
      this.filterOptions.rooms.forEach((button) => {
        button.active = false
      })
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "src/styles/mixins"
@import "src/styles/colors"

.filter
  display: flex
  align-items: flex-start

.buttonContainer
  display: flex
  flex-direction: column
  align-items: flex-start

.buttonContainer__header
  @include smallHeader

.buttonWrapper
  display: flex
  flex-direction: row

.action,
.buttonWrapper__button
  @include border
  display: flex
  justify-content: center
  min-width: 48px
  padding: 6px 0
  margin-right: 4px

  background: #FFFFFF
  cursor: pointer
  font-weight: bold

  &.-active
    background-color: $lightGreen
    color: white

  &.-long
    padding: 5px 54px 7px
    margin: 28px 0 5px

.actionWrapper
  display: flex
  flex-direction: column
  align-items: center

.setDefaultAction
  font-size: 10px !important // Переопредеяем значение в миксине
  @include smallHeader
  max-width: 106px
  cursor: pointer

.setDefaultAction__underline
  width: 100%
  height: 1px
  background-color: $lightGreen
</style>

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
          :class="button.active ? 'active' : ''"
        >
          {{button.title}}
        </div>
      </div>

    </div>
    <BaseSlider
      :value="filterValue.floor"
      :options="filterOptions.floor"
      @change="changeFloorValue"
    />
    <BaseSlider
      :value="filterValue.square"
      :options="filterOptions.square"
      @change="changeSquareValue"
    />
    <BaseSlider
      :value="filterValue.price"
      :options="filterOptions.price"
      @change="changePriceValue"
    />
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
  data () {
    return {
      filterValue: {
        floor: [0, 99],
        square: [0, 99],
        price: [0, 99]
      },
      filterOptions: {
        floor: {
          header: 'Этаж',
          minValue: 0,
          maxValue: 99
        },
        square: {
          header: 'Площадь',
          subheader: 'м2',
          minValue: 0,
          maxValue: 99
        },
        price: {
          header: 'Стоимость',
          subheader: 'млн. р.',
          minValue: 0,
          maxValue: 99
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
  methods: {
    changeFloorValue (newValue: Array<number>) {
      this.filterValue.floor = newValue
    },
    changeSquareValue (newValue: Array<number>) {
      this.filterValue.square = newValue
    },
    changePriceValue (newValue: Array<number>) {
      this.filterValue.price = newValue
    },
    changeButtonState (buttonId: number) : void {
      const currentButton = this.filterOptions.rooms
        .findIndex((button) => button.id === buttonId)

      if (currentButton > -1) {
        this.filterOptions.rooms[currentButton].active = !this.filterOptions.rooms[currentButton].active
      }
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "src/styles/mixins"

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

.buttonWrapper__button
  @include border
  display: flex
  justify-content: center
  width: 48px
  padding: 6px 0
  margin-right: 4px

  background: #FFFFFF
  cursor: pointer

  &.active
    background-color: #70D24E
    color: white
</style>

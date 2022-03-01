<template>
  <v-container class="slider">
    <div>
      <span class="slider__header">{{options.header}}</span>
      <span class="slider__header subheader">{{options.subheader}}</span>
    </div>
    <div class="inputWrapper">
      <input
        :max="maxSliderValue + 1"
        :min="minSliderValue - 1"
        type="number"
        v-model="sliderValue[0]"
      >
      <span class="inputWrapper__separator"/>
      <input
        :max="maxSliderValue + 1"
        :min="minSliderValue"
        type="number"
        v-model="sliderValue[1]"
      >
    </div>
    <v-range-slider
      @change="changeSliderValue"
      v-model="sliderValue"
      :max="maxSliderValue"
      :min="minSliderValue"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseSlider',
  props: {
    options: {
      type: Object
    },
    value: {
      type: Array,
      required: true
    },
    maxValue: {
      type: Number
    },
    minValue: {
      type: Number
    }
  },
  computed: {
    sliderValue: {
      get (): Array<number> {
        return this.$props.value
      },
      set (newValue) : void {
        this.$emit('change', newValue)
      }
    },
    maxSliderValue () {
      return this.$props.maxValue
    },
    minSliderValue () {
      return this.$props.minValue
    }
  },
  methods: {
    changeSliderValue (newValue: [number, number]) : void {
      this.sliderValue = newValue
    }
  }
})
</script>

<style scoped lang="sass">
@import "src/styles/mixins"

input
  @include border
  background: #FFFFFF
  padding: 7px 0 5px
  text-align: center
  width: 80px

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none
  margin: 0

.slider
  display: flex
  flex-direction: column
  width: 175px
  padding: 0

.slider__header
  @include smallHeader
  align-self: flex-start
  margin-right: 3px
  &.subheader
    font-size: 10px

.inputWrapper
  display: flex
  align-items: center

.inputWrapper__separator
  margin: 0 5px
  &:after
    content: '-'
</style>

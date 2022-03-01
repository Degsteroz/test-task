<template>
<div class="apartment">
  <header>
    <span class="header__floor">
      {{apartment.floor}} этаж
    </span>
    <div class="header__roomContainer">
      {{apartment.rooms}} {{'комнат' + (apartment.rooms > 1 ? 'ы' : 'а')}}
      <div class="header__separator"/>
      {{apartment.square}}м2
    </div>
  </header>
  <div class="imageContainer">
    <div class="imageContainer__numberWrapper">
      <span class="imageContainer__number">№{{apartment.number}}</span>
    </div>
    <img
      class="image"
      :src="apartment.plan"
      alt="apartment plan"
    />
  </div>
  <div class="priceContainer">
    <div class="price --bigPrice">
      {{transformPrice(apartment.price)}}р.
    </div>
    <div class="price">
      {{transformPrice(apartment.price / apartment.square)}} р. за м2
    </div>
  </div>
  <div class="apartment__button">
    ПОДРОБНЕЕ
  </div>

</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { priceTransform } from '@/utils'

export default Vue.extend({
  name: 'BaseApartment',
  components: {
  },
  props: {
    apartment: {
      type: Object,
      required: true
    }
  },
  methods: {
    transformPrice (price : number) {
      return priceTransform(price)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "src/styles/mixins"
@import "src/styles/colors"

.apartment
  width: 270px
  height: 365px
  background-color: $baseWhite

  @include border
  padding: 8px 15px
  display: flex
  flex: 1 1 auto
  flex-direction: column
  overflow: hidden

  &:hover
    .image
      width: 152px

    .priceContainer
      margin-bottom: 10px

header
  display: flex
  justify-content: space-between
  font-weight: bold
  font-size: 12px
  line-height: 28px
  color: $defBlack

  margin-bottom: 4px

.header__floor
  opacity: 0.5

.header__separator
  opacity: 0.5
  margin: 0 5px
  &:after
    content: '-'

.header__roomContainer
  display: flex

.imageContainer
  display: flex
  position: relative
  width: 250px
  height: 250px
  flex-direction: column
  align-items: center
  @include border

  margin-bottom: 11px
  padding: 31px 10px
  flex-grow: 1

.imageContainer__numberWrapper
  flex: 1 0 70px
  position: absolute
  top: 0
  right: 0

  @include border
  border-radius: 0 0 0 10px
  border-top: none
  border-right: none

  padding: 0 10px

.imageContainer__number
  @include smallHeader
  font-size: 14px

.image
  display: flex
  width: 230px
  transition: all .2s ease

.priceContainer
  display: flex
  align-items: flex-end
  flex-direction: column
  margin-bottom: 20px
  transition: all 1.3s ease

  @include smallHeader
  text-transform: none

.price
  width: max-content
  opacity: 0.5
  line-height: 2.23
  &.--bigPrice
    font-size: 20px
    opacity: 1
    line-height: 1.4

.apartment__button
  padding: 7px 0 5px
  flex-grow: 2
  border-radius: 2px 2px 5px 5px
  background-color: $lightGreen
  cursor: pointer

  @include smallHeader
  font-size: 14px
  color: $baseWhite
</style>

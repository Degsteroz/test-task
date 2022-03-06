<template>
<div class="apartment">
  <header>
    <span class="header__floor">
      {{apartment.floor}} этаж
    </span>
    <div class="header__roomContainer">
      {{apartment.rooms}} {{'комнат' + (apartment.rooms > 1 ? 'ы' : 'а')}}
      <div class="header__separator"/>
      {{apartment.square}} м2
    </div>
  </header>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

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
  methods: {}
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
  margin-bottom: 30px

header
  display: flex
  justify-content: space-between
  font-weight: bold
  font-size: 12px
  line-height: 28px
  color: $defBlack

.header__floor
  color: grey

.header__separator
  color: grey
  margin: 0 5px
  &:after
    content: '-'

.header__roomContainer
  display: flex
</style>

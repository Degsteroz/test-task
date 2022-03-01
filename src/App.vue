<template>
  <v-app id="app">
    <div class="contentWrapper">
      <ContentComponent/>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import ContentComponent from '@/components/ContentComponent.vue'

export default Vue.extend({
  name: 'App',
  components: {
    ContentComponent
  }
})
</script>

<style lang="sass">
@font-face
  font-family: 'Gotham Pro Regular'
  src: url('./static/GothamPro.eot')
  src: url('./static/GothamPro.eot?#iefix') format('embedded-opentype'), url('./static/GothamPro.woff') format('woff'), url('./static/GothamPro.ttf') format('truetype')
  font-weight: normal
  font-style: normal

$bigPadding: 80px
$padding: 30px

html
  overflow: hidden
body
  margin: 0
  background-color: #2f2e2d
  padding: $bigPadding
  height: 100vh

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  font-family: 'Gotham Pro Regular', sans-serif

  padding: $padding
  height: calc(100vh - 80px * 2)
  border-radius: 10px

  text-align: center
  color: #2C323A
  background-color: white
  overflow: auto

.contentWrapper
  display: flex
  justify-content: center
  border-radius: 10px
  background-color: #F8F8F8
  padding: 38px 0 102px
  min-height: calc(100vh - 160px - 60px)

.v-application--wrap
  flex-basis: 100%
  height: max-content
  min-height: unset !important
</style>

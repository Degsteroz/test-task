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
$padding: 80px

@font-face
  font-family: 'Gotham Pro Regular'
  src: url('./static/GothamPro.eot')
  src: url('./static/GothamPro.eot?#iefix') format('embedded-opentype'), url('./static/GothamPro.woff') format('woff'), url('./static/GothamPro.ttf') format('truetype')
  font-weight: normal
  font-style: normal

body
  margin: 0
  background-color: #2f2e2d
  padding: $padding
  height: 100vh

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  font-family: 'Gotham Pro Regular', sans-serif

  display: flex
  padding: 30px
  max-height: 100%
  overflow: auto
  border-radius: 10px

  text-align: center
  color: #2C323A
  background-color: white

.contentWrapper
  display: flex
  justify-content: center
  width: 100%
  border-radius: 10px
  background-color: #F8F8F8

</style>

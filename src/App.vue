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

body,
html
  margin: 0

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  font-family: 'Gotham Pro Regular', sans-serif

  display: flex
  text-align: center
  color: #2C323A
  padding: $padding
  background-color: #2f2e2d

  height: 100vh
  width: 100vw

.contentWrapper
  background-color: white
  border-radius: 10px
  padding: 30px
  width: 100%
</style>

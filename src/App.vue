<template>
  <div id="app">
    <v-toolbar fixed>
      <v-btn icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title>{{bottomNav}}</v-toolbar-title>
    </v-toolbar>

    <router-view/>

    <v-footer fixed height="102">
      <v-btn
        absolute
        dark
        fab
        top
        right
        color="teal"
      >
        <v-icon>add</v-icon>
      </v-btn>

      <v-bottom-nav
        :active.sync="bottomNav"
        :value="true"
        absolute
        color="transparent"
      >
        <v-btn
          color="teal"
          flat
          value="recent"
        >
          <span>Recent</span>
          <v-icon>history</v-icon>
        </v-btn>

        <v-btn
          color="teal"
          flat
          value="favorites"
        >
          <span>Favorites</span>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn
          color="teal"
          flat
          value="nearby"
        >
          <span>Nearby</span>
          <v-icon>place</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      bottomNav: 'recent'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

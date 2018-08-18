<template>
  <div id="app">
    <v-toolbar fixed>
      <v-btn icon v-if="hasBackLink">
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title>{{pageTitle}}</v-toolbar-title>
    </v-toolbar>

    <router-view @syncHeader="syncHeader"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      pageTitle: '',
      hasBackLink: false
    }
  },
  methods: {
    syncHeader (pageTitle) {
      this.pageTitle = pageTitle
      this.hasBackLink = this.$route.meta.backLink
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
}
</style>

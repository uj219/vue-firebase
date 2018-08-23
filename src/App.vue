<template>
  <div id="app">
    <v-app>
      <v-toolbar fixed>
        <v-btn icon v-if="hasBackLink">
          <router-link to="/">
            <v-icon>arrow_back</v-icon>
          </router-link>
        </v-btn>

        <v-toolbar-title>{{pageTitle}}</v-toolbar-title>
      </v-toolbar>

      <router-view @syncHeader="syncHeader" @addItem="addItem" />
    </v-app>
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
    },
    addItem (item) {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  text-decoration: none!important;
  color: inherit;
}
</style>

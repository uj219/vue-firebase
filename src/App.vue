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

      <snackbar :snackbar="snackbar" @closeSnackbar="closeSnackbar"/>
    </v-app>
  </div>
</template>

<script>
import * as firebaseFunction from './functions/firebaseFunction'
import Snackbar from '@/components/common/Snackbar'

export default {
  name: 'App',
  components: {
    'snackbar': Snackbar
  },
  data () {
    return {
      pageTitle: '',
      hasBackLink: false,
      snackbar: {
        isShown: false,
        color: '',
        text: ''
      }
    }
  },
  methods: {
    syncHeader (pageTitle) {
      this.pageTitle = pageTitle
      this.hasBackLink = this.$route.meta.backLink
    },
    showSnackbar (obj) {
      this.snackbar.isShown = true
      this.snackbar.color = obj.color
      this.snackbar.text = obj.text
    },
    closeSnackbar () {
      this.snackbar.isShown = false
    },
    addItem (item) {
      firebaseFunction.addItemFirestore(item)
        .then((response) => {
          this.showSnackbar(response)
        }).catch((error) => {
          this.showSnackbar(error)
        })
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

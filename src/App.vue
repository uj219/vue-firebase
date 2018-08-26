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

      <router-view @syncHeader="syncHeader" @addItem="addItem" @showSnackbar="showSnackbar" :list="list"/>

      <snackbar :snackbar="snackbar" @closeSnackbar="closeSnackbar"/>
    </v-app>
  </div>
</template>

<script>
import * as FirebaseFunction from './functions/FirebaseFunction'
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
      list: [],
      snackbar: {
        isShown: false,
        color: '',
        text: ''
      }
    }
  },
  created () {
    this.getList()
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
    getList () {
      FirebaseFunction.getListFirestore()
        .then((response) => {
          response.forEach((doc) => {
            this.list.push({
              id: doc.id,
              data: doc.data(),
              flexXs: 6,
              flexSm: 3
            })
          })

          this.list[0] = Object.assign(this.list[0], {flexXs: 12, flexSm: 12})
          this.list[1] = Object.assign(this.list[1], {flexXs: 6, flexSm: 6})
          this.list[2] = Object.assign(this.list[2], {flexXs: 6, flexSm: 6})
        })
    },
    addItem (item) {
      FirebaseFunction.addItemFirestore(item)
        .then((response) => {
          this.showSnackbar(response)
          this.list = []
          this.getList()
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

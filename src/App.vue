<template>
  <div id="app">
    <v-app>
      <toolbar :pageTitle="pageTitle" :hasBackLink="hasBackLink" :currentUser="currentUser" @login="login" @logout="logout"/>

      <router-view :list="list" :currentUser="currentUser" @syncHeader="syncHeader" @addItem="addItem" @showSnackbar="showSnackbar"/>

      <snackbar :snackbar="snackbar" @closeSnackbar="closeSnackbar"/>
    </v-app>
  </div>
</template>

<script>
import * as FirebaseFunction from './functions/FirebaseFunction'
import Toolbar from '@/components/common/Toolbar'
import Snackbar from '@/components/common/Snackbar'

export default {
  name: 'App',
  components: {
    'snackbar': Snackbar,
    'toolbar': Toolbar
  },
  data () {
    return {
      currentUser: null,
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
          // 空であれば何もしない
          if (response.empty) return

          response.forEach((doc) => {
            this.list.push({
              id: doc.id,
              data: doc.data()
            })
          })
        })
    },
    addItem (item) {
      FirebaseFunction.addItemFirestore(item, this.currentUser.uid)
        .then((response) => {
          this.showSnackbar(response)
          this.list = []
          this.getList()
        }).catch((error) => {
          this.showSnackbar(error)
        })
    },
    login () {
      FirebaseFunction.login()
        .then((result) => {
          // 初回ログインであればユーザーをDBに追加
          const isNewUser = result.additionalUserInfo.isNewUser
          if (isNewUser) this.addUser(result.user.uid)

          this.syncCurrentUser()
          this.showSnackbar({
            color: 'success',
            text: 'ログインしました'
          })
        }).catch((error) => {
          this.showSnackbar(error)
        })
    },
    logout () {
      FirebaseFunction.logout()
        .then(() => {
          this.syncCurrentUser()
          this.$router.push('/')
          this.showSnackbar({
            color: 'success',
            text: 'ログアウトしました'
          })
        }).catch((error) => {
          this.showSnackbar(error)
        })
    },
    syncCurrentUser () {
      this.currentUser = FirebaseFunction.getCurrentUser()
    },
    addUser (userId) {
      FirebaseFunction.addUserFiresotre(userId)
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

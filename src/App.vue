<template>
  <div id="app">
    <v-app>
      <toolbar :pageTitle="pageTitle" :hasBackLink="hasBackLink" :currentUser="currentUser" @login="login" @logout="logout"/>

      <router-view
        :list="list"
        :currentUser="currentUser"
        @syncHeader="syncHeader"
        @addItem="addItem"
        @showSnackbar="showSnackbar"
        @addFav="addFav"
        @deleteFav="deleteFav"
        @syncLoginDialog="syncLoginDialog"
      />

      <snackbar :snackbar="snackbar" @closeSnackbar="closeSnackbar"/>

      <login-dialog :loginDialog="loginDialog" @login="login" @syncLoginDialog="syncLoginDialog"/>
    </v-app>
  </div>
</template>

<script>
import * as FirebaseFunction from './functions/FirebaseFunction'
import Toolbar from '@/components/common/Toolbar'
import Snackbar from '@/components/common/Snackbar'
import LoginDialog from '@/components/common/LoginDialog'

export default {
  name: 'App',
  components: {
    'snackbar': Snackbar,
    'toolbar': Toolbar,
    'login-dialog': LoginDialog
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
      },
      loginDialog: false
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
    syncLoginDialog (bool) {
      this.loginDialog = bool
    },
    getList () {
      // 重複しないよう毎回初期化
      this.list = []

      FirebaseFunction.getListFirestore()
        .then((querySnapshotList) => {
          // 空であれば何もしない
          if (querySnapshotList.empty) return

          querySnapshotList.forEach((docList) => {
            const userFav = []

            FirebaseFunction.getItemUserFavFirestore(docList.id)
              .then((querySnapshotUserFav) => {
                querySnapshotUserFav.forEach((docUserFav) => {
                  userFav.push(docUserFav.id)
                })

                this.list.push({
                  id: docList.id,
                  data: docList.data(),
                  userFav: userFav
                })
              })
          })
        })
    },
    addItem (item) {
      if (!this.currentUser) {
        this.syncLoginDialog(true)
        return
      }
      FirebaseFunction.addItemFirestore(item, this.currentUser.uid)
        .then((response) => {
          this.showSnackbar(response)
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

      // ログイン時にお気に入りをいっしょに格納
      if (this.currentUser !== null) {
        this.currentUser.fav = []
        FirebaseFunction.getUserFavFirestore(this.currentUser.uid)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.currentUser.fav.push(doc.id)
            })
          }).catch((error) => {
            this.showSnackbar({
              color: 'error',
              text: error
            })
          })
      }
    },
    addUser (userId) {
      FirebaseFunction.addUserFiresotre(userId)
    },
    addFav (itemId, userId) {
      FirebaseFunction.addFavFirestore(itemId, userId)
        .then(() => {
          this.list.forEach((el) => {
            if (el.id === itemId) el.userFav.push(userId)
          })
          this.showSnackbar({
            color: 'success',
            text: 'お気に入りに追加しました'
          })
        }).catch((error) => {
          this.showSnackbar({
            color: 'error',
            text: error
          })
        })
    },
    deleteFav (itemId, userId) {
      FirebaseFunction.deleteFavFirestore(itemId, userId)
        .then(() => {
          this.list.forEach((el) => {
            if (el.id === itemId) {
              el.userFav = el.userFav.map((id) => {
                if (id !== userId) return id
              })
            }
          })
          this.showSnackbar({
            color: 'success',
            text: 'お気に入りから削除しました'
          })
        }).catch((error) => {
          this.showSnackbar({
            color: 'error',
            text: error
          })
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

<template>
  <div id="toolbar">
    <v-toolbar fixed>
      <v-btn icon v-if="hasBackLink">
        <router-link to="/">
          <v-icon>arrow_back</v-icon>
        </router-link>
      </v-btn>
      <v-toolbar-title>{{pageTitle}}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu
          v-if="currentUser"
          offset-y
        >
          <v-avatar
            slot="activator"
            :size=30
          >
            <img :src="currentUser.photoURL" alt="currentUser.displayName">
          </v-avatar>

          <v-list>
            <v-list-tile @click="logout">
              <v-list-tile-title>ログアウト</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-btn
          v-else
          flat
          @click="login"
        >
          login
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  props: ['pageTitle', 'hasBackLink', 'currentUser'],
  methods: {
    login () {
      this.$emit('login')
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

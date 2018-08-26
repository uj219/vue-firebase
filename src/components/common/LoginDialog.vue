<template>
  <div class="login-dialog">
    <v-dialog
      v-model="loginDialog"
      max-width="290"
      persistent
    >
      <v-card>
        <v-card-title class="headline">ログインしてください</v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 d-flex mb-2>
              <button class="btn-googleLogin" @click="login"></button>
            </v-flex>
            <v-flex xs12 d-flex>
              <v-btn
                flat
                @click="cancel"
              >
                キャンセル
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'LoginDialog',
  props: ['loginDialog'],
  methods: {
    cancel () {
      this.$emit('syncLoginDialog', false)
    },
    login () {
      this.$emit('login')
      this.$emit('syncLoginDialog', false)
    }
  }
}
</script>

<style scoped>
.btn-googleLogin {
  width: 191px;
  height: 46px;
  background: url("../../assets/btn_google_signin.png") left top no-repeat;
  background-size: 100% auto;
}
</style>

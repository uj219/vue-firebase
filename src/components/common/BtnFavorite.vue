<template>
  <div class="btn-favorite">
    <v-btn
      v-if="currentUser"
      icon
      flat
      :color="color"
      @click="toggleFav(!isFav, item.id, currentUser.uid)"
    >
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn
      v-else
      icon
      flat
      color="color"
      @click="syncLoginDialog(true)"
    >
      <v-icon>favorite</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'BtnFavorite',
  props: ['item', 'currentUser'],
  data () {
    return {
      isFav: false,
      color: 'gray'
    }
  },
  created () {
    if (typeof this.$props.item.data.userFav === 'undefined' || this.$props.currentUser === null) return
    if (this.$props.item.data.userFav[this.$props.currentUser.uid]) {
      this.isFav = true
      this.color = 'pink'
    }
  },
  methods: {
    toggleFav (bool, itemId, userId) {
      this.$emit('toggleFav', bool, itemId, userId)
      if (bool) {
        this.color = 'pink'
        this.isFav = true
      } else {
        this.color = 'gray'
        this.isFav = false
      }
    },
    syncLoginDialog (bool) {
      this.$emit('syncLoginDialog', bool)
    }
  }
}
</script>

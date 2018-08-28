<template>
  <div class="btn-favorite">
    <v-btn
      v-if="currentUser && !isFav"
      icon
      flat
      @click="addFav(item.id, currentUser.uid)"
    >
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn
      v-else-if="currentUser && isFav"
      icon
      flat
      color="pink"
      @click="deleteFav(item.id, currentUser.uid)"
    >
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn
      v-else
      icon
      flat
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
  computed: {
    isFav: function () {
      return this.$props.item.userFav.includes(this.$props.currentUser.uid)
    }
  },
  methods: {
    addFav (itemId, userId) {
      this.$emit('addFav', itemId, userId)
    },
    deleteFav (itemId, userId) {
      this.$emit('deleteFav', itemId, userId)
    },
    syncLoginDialog (bool) {
      this.$emit('syncLoginDialog', bool)
    }
  }
}
</script>

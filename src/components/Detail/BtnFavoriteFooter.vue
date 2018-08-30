<template>
  <div class="btn-favorite">
    <v-btn
      v-if="currentUser && !isFav"
      absolute
      fab
      top
      right
      color="gray"
      @click.stop="addFav(item.id, currentUser.uid)"
    >
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn
      v-else-if="currentUser && isFav"
      absolute
      fab
      top
      right
      color="pink"
      @click.stop="deleteFav(item.id, currentUser.uid)"
    >
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn
      v-else
      absolute
      fab
      top
      right
      color="gray"
      @click.stop="syncLoginDialog(true)"
    >
      <v-icon>favorite</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'BtnFavoriteFooter',
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

<style scoped>
.v-btn .v-btn__content .v-icon {
  color: #fff;
}
</style>

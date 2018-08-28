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
    <span class="fav-count">{{favCount}}</span>
  </div>
</template>

<script>
export default {
  name: 'BtnFavorite',
  props: ['item', 'currentUser'],
  computed: {
    isFav: function () {
      return this.$props.item.userFav.includes(this.$props.currentUser.uid)
    },
    favCount: function () {
      return this.$props.item.userFav.length
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
.fav-count {
  color: gray;
  position: relative;
  top: 2px;
}
</style>

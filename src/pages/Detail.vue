<template>
  <div class="detail">
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>

    <v-footer fixed height="42">
      <v-btn
        absolute
        dark
        fab
        top
        right
        color="pink"
      >
        <v-icon>favorite</v-icon>
      </v-btn>

    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      pageTitle: 'Pre-fab homes',
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
        }
      ]
    }
  },
  created () {
    this.$emit('syncHeader', this.pageTitle)
  }
}
</script>

<style scoped>
</style>

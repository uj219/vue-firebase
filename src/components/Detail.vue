<template>
  <div class="detail">
    <v-jumbotron
      :gradient="gradient"
      dark
      :src="card.src"
    >
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3">{{card.title}}</h3>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data: () => ({
    card: { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' }
  })
}
</script>


<style scoped>
</style>

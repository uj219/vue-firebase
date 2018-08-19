<template>
  <div class="bottom-nav">
    <v-footer fixed height="102">
      <v-btn
        absolute
        dark
        fab
        top
        right
        color="teal"
        @click.stop="syncDialog(true)"
      >
        <v-icon>add</v-icon>
      </v-btn>

      <v-bottom-nav
        :active.sync="bottomNav"
        :value="true"
        absolute
        color="transparent"
      >
        <v-btn
          color="teal"
          flat
          value="recent"
          @click="syncHeader('recent')"
        >
          <span>Recent</span>
          <v-icon>history</v-icon>
        </v-btn>

        <v-btn
          color="teal"
          flat
          value="favorites"
          @click="syncHeader('favorites')"
        >
          <span>Favorites</span>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn
          color="teal"
          flat
          value="nearby"
          @click="syncHeader('nearby')"
        >
          <span>Nearby</span>
          <v-icon>place</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  props: ['current'],
  data () {
    return {
      bottomNav: ''
    }
  },
  created () {
    this.bottomNav = this.$props.current
  },
  methods: {
    syncHeader (pageTitle) {
      this.$emit('syncHeader', pageTitle)
    },
    syncDialog (bool) {
      this.$emit('syncDialog', bool)
    }
  }
}
</script>

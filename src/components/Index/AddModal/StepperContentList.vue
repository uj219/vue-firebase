<template>
  <div class="stepper-content-list">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-list>
            <v-list-tile
              v-for="item in searchResults"
              :key="item.id"
              @click="confirm(item)"
            >
              <v-list-tile-avatar>
                <img :src="item.logo_image">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.catch"></v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon color="teal">add_circle</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>

          <v-divider></v-divider>
        </v-flex>

        <v-btn
          v-if="hasMoreResults"
          fab
          dark
          color="primary"
          @click="getMoreItems()"
        >
          <v-icon dark>expand_more</v-icon><br>
          More
        </v-btn>

        <v-flex xs12 d-flex>
          <v-btn
            flat
            @click="changeStep(1)"
          >
            Cancel
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'StepperContentList',
  props: ['searchResults', 'hasMoreResults'],
  data () {
    return {
    }
  },
  methods: {
    getMoreItems () {
      this.$emit('getMoreItems')
    },
    changeStep (num) {
      this.$emit('changeStep', num)
    },
    confirm (item) {
      this.$emit('confirm', item)
    }
  }
}
</script>

<style scoped>
.v-stepper__content {
  padding-right: 0;
  padding-left: 0;
}
</style>

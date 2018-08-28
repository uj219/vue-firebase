<template>
  <div class="stepper-content-list">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-list two-line>
            <v-subheader>
              <v-icon>check</v-icon>
              追加アイテムの選択
            </v-subheader>

            <v-list-tile
              class="v-list__tile__custom"
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
                <v-icon color="primary">add_circle</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>

        <v-flex xs12 d-flex>
          <v-btn
            flat
            @click="changeStep(1)"
          >
            Cancel
          </v-btn>

          <v-btn
            v-if="hasMoreResults"
            color="primary"
            :loading="addModalListLoading"
            :disabled="addModalListLoading"
            @click="getMoreItems()"
          >
            More
          </v-btn>
        </v-flex>

        <v-flex
          xs12
          d-flex
        >
          <loader v-show="addModalListLoading" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Loader from '@/components/common/Loader'

export default {
  name: 'StepperContentList',
  props: ['searchResults', 'hasMoreResults', 'addModalListLoading'],
  components: {
    'loader': Loader
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
.v-list__tile__custom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.16);
}
</style>

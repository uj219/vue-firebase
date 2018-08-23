<template>
  <div class="confirm-dialog">
    <v-dialog
      v-model="confirmDialog"
      max-width="290"
    >
      <v-card>
        <v-card-text class="pb-0">
          <v-layout row wrap>
            <v-flex xs12>
              <img :src="confirmItem.logo_image" class="thumb">
            </v-flex>
            <v-flex xs12>
              <span class="subheading font-weight-bold d-block">{{confirmItem.name}}</span>
              <span class="d-block">{{confirmItem.catch}}</span>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-container>
          <v-layout row wrap>
            <v-flex xs12 d-flex>
              <v-btn
                flat
                @click="closeConfirm"
              >
                キャンセル
              </v-btn>

              <v-btn
                color="primary"
                @click="addItem(confirmItem)"
              >
                追加
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: ['confirmDialog', 'confirmItem'],
  methods: {
    closeConfirm () {
      this.$emit('closeConfirm')
    },
    addItem (item) {
      this.$emit('addItem', item)
    },
  }
}
</script>

<style scoped>
.thumb {
  width: 100%;
  height: auto;
}
</style>

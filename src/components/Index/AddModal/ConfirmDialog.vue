<template>
  <div class="confirm-dialog">
    <v-dialog
      v-model="confirmDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">このアイテムを追加しますか?</v-card-title>

        <v-card-text>
          <img :src="confirmItem.logo_image">

        </v-card-text>

        <v-card-actions>
          <v-flex xs12 d-flex>
            <v-btn
              color="grey lighten-1"
              flat="flat"
              @click="closeConfirm"
            >
              キャンセル
            </v-btn>

            <v-btn
              color="teal"
              flat="flat"
              @click="addItem(confirmItem)"
            >
              追加
            </v-btn>
          </v-flex>
        </v-card-actions>
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

</style>

<template>
  <div class="add-modal">
    <v-dialog
      v-model="isShown"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.stop="syncDialog(false)">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add item</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1" editable>検索方法を選択してください</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2" editable>エリア選択</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">追加アイテムの選択</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-list two-line subheader>
                  <v-subheader inset>検索方法</v-subheader>
                  <v-list-tile v-for="item in items" :key="item.title" avatar @click="e1 = 2">
                    <v-list-tile-avatar>
                      <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card
                  class="mb-5"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>

                <v-btn
                  color="primary"
                  @click="e1 = 3"
                >
                  Continue
                </v-btn>

                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                  class="mb-5"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>

                <v-btn
                  color="primary"
                  @click="e1 = 1"
                >
                  Continue
                </v-btn>

                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddModal',
  props: ['isShown'],
  data () {
    return {
      e1: 0,
      items: [
        { icon: 'place', iconClass: 'teal white--text', title: 'エリアから探す' },
        { icon: 'near_me', iconClass: 'teal white--text', title: '現在地から探す' }
      ]
    }
  },
  methods: {
    syncDialog (bool) {
      this.$emit('syncDialog', bool)
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

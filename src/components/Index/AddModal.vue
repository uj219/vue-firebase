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
          <v-btn icon dark @click.stop="syncAddModal(false)">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add item</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-stepper v-model="step">
            <v-stepper-header>
              <v-stepper-step :complete="step > 1" step="1" editable>検索方法を選択してください</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 2" step="2" :editable="step > 1">
                <span v-if="searchType === 'area'">エリアから探す</span>
                <span v-if="searchType === 'gps'">現在地から探す</span>
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">追加アイテムの選択</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-container>
                  <v-subheader>
                    <v-icon>search</v-icon>
                    検索方法の選択
                  </v-subheader>
                  <v-list two-line>
                    <v-list-tile avatar @click="selectSearchType('area')">
                      <v-list-tile-avatar>
                        <v-icon class="teal white--text">place</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>エリアから探す</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile avatar @click="selectSearchType('gps')">
                      <v-list-tile-avatar>
                        <v-icon class="teal white--text">near_me</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>現在地から探す</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>

                  <v-flex xs12 d-flex>
                    <v-btn
                      flat
                      @click="syncAddModal(false)"
                    >
                      Cancel
                    </v-btn>
                  </v-flex>
                </v-container>
              </v-stepper-content>

              <v-stepper-content step="2">
                <stepper-content-area-search v-if="searchType === 'area'" @changeStep="changeStep" @search="search" />
                <stepper-content-gps-search v-if="searchType === 'gps'" @changeStep="changeStep" @search="search" />
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-list>
                      <v-list-tile
                        v-for="item in items7"
                        :key="item.title"
                        @click.stop="confirmDialog = true"
                      >
                        <v-list-tile-avatar>
                          <img :src="item.avatar">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.title"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action v-if="item.active">
                          <v-icon color="teal">add_circle</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>

                    <v-divider></v-divider>
                  </v-flex>
                </v-layout>

                <v-btn
                  color="primary"
                  @click="step = 1"
                >
                  Continue
                </v-btn>

                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="confirmDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">このアイテムを追加しますか?</v-card-title>

        <v-card-text>
          ここにアイテム情報を表示
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey lighten-1"
            flat="flat"
            @click="confirmDialog = false"
          >
            キャンセル
          </v-btn>

          <v-btn
            color="teal"
            flat="flat"
            @click="snackbar = true"
          >
            追加
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import StepperContentAreaSearch from '@/components/Index/AddModal/StepperContentAreaSearch'
import StepperContentGpsSearch from '@/components/Index/AddModal/StepperContentGpsSearch'

export default {
  name: 'AddModal',
  components: {
    'stepper-content-area-search': StepperContentAreaSearch,
    'stepper-content-gps-search': StepperContentGpsSearch
  },
  props: ['isShown'],
  data () {
    return {
      step: 0,
      searchType: 'area',
      items7: [
        {
          active: true,
          title: 'Jason Oner',
          avatar: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          subtitle: '<span class="text--primary">Ali Connors</span> &mdash; Ill be in your neighborhood doing errands this weekend. Do you want to hang out?'
        },
        { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
        { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
        { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' }
      ],
      confirmDialog: false,
      snackbar: false,
      color: 'teal',
      mode: '',
      timeout: 3000,
      text: 'アイテムを追加しました'
    }
  },
  methods: {
    syncAddModal (bool) {
      this.$emit('syncAddModal', bool)
    },
    changeStep (num) {
      this.step = num
    },
    selectSearchType (type) {
      this.searchType = type
      this.changeStep(2)
    },
    search (options) {
      
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

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
                    <v-list-tile
                      avatar
                      @click="selectSearchType('area')"
                    >
                      <v-list-tile-avatar>
                        <v-icon class="primary white--text">place</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>エリアから探す</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile
                      avatar
                      @click="selectSearchType('gps')"
                    >
                      <v-list-tile-avatar>
                        <v-icon class="primary white--text">near_me</v-icon>
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
                <stepper-content-area-search v-if="searchType === 'area'" @changeStep="changeStep" @setSearchOptions="setSearchOptions" />
                <stepper-content-gps-search v-if="searchType === 'gps'" @changeStep="changeStep" @setSearchOptions="setSearchOptions" />
              </v-stepper-content>

              <v-stepper-content step="3">
                <stepper-content-list :searchResults="searchResults" :hasMoreResults="hasMoreResults" @changeStep="changeStep" @getMoreItems="getMoreItems" @confirm="confirm" />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>

    <confirm-dialog :confirmDialog="confirmDialog" :confirmItem="confirmItem" @closeConfirm="closeConfirm" @addItem="addItem" />
  </div>
</template>

<script>
import axios from 'axios'
import hotPepperApiKey from '../../api_keys/hotpepper'
import StepperContentAreaSearch from '@/components/Index/AddModal/StepperContentAreaSearch'
import StepperContentGpsSearch from '@/components/Index/AddModal/StepperContentGpsSearch'
import StepperContentList from '@/components/Index/AddModal/StepperContentList'
import ConfirmDialog from '@/components/Index/AddModal/ConfirmDialog'

export default {
  name: 'AddModal',
  components: {
    'stepper-content-area-search': StepperContentAreaSearch,
    'stepper-content-gps-search': StepperContentGpsSearch,
    'stepper-content-list': StepperContentList,
    'confirm-dialog': ConfirmDialog
  },
  props: ['isShown'],
  data () {
    return {
      step: 1,
      searchType: 'area',
      searchOffset: 1,
      searchLimit: 100,
      searchOptions: {},
      searchResults: [],
      hasMoreResults: true,
      confirmDialog: false,
      confirmItem: {}
    }
  },
  methods: {
    syncAddModal (bool) {
      this.reset()
      this.step = 1
      this.$emit('syncAddModal', bool)
    },
    changeStep (num) {
      this.step = num
    },
    selectSearchType (type) {
      this.searchType = type
      this.changeStep(2)
    },
    setSearchOptions (options) {
      this.reset()
      this.searchOptions = options
      this.getItems()
    },
    getMoreItems () {
      this.searchOffset += this.searchLimit
      this.getItems()
    },
    getItems () {
      const params = Object.assign({
        key: hotPepperApiKey,
        format: 'json',
        start: this.searchOffset,
        count: this.searchLimit
      }, this.searchOptions)

      axios.get(`http://webservice.recruit.co.jp/hotpepper/gourmet/v1/`, {
        params: params
      }).then((response) => {
        if (response.data.results.results_returned < this.searchLimit) this.hasMoreResults = false
        response.data.results.shop.forEach((el) => {
          this.searchResults.push(el)
        })

        if (this.step === 3) return
        this.changeStep(3)
      }).catch((error) => {
        // todo: snackbarで表示
        console.log(error)
      })
    },
    reset () {
      this.searchOptions = {}
      this.searchOffset = 1
      this.searchResults = []
      this.hasMoreResults = true
    },
    confirm (item) {
      this.confirmItem = item
      this.confirmDialog = true
    },
    closeConfirm () {
      this.confirmItem = {}
      this.confirmDialog = false
    },
    addItem (item) {
      this.$emit('addItem', item)
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

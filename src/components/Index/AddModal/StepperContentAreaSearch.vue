<template>
  <div class="stepper-content-area-search">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container>
        <v-subheader>
          <v-icon>place</v-icon>
          エリアから探す
        </v-subheader>
        <v-layout wrap align-center>
          <v-flex xs12 d-flex v-if="large_area.length">
            <v-select
              v-model="large_area_selected"
              :items="large_area"
              item-text="name"
              item-value="code"
              :hint="large_area_selected"
              label="large_area"
              outline
              @change="getAreaCode('middle_area', {'large_area': large_area_selected}); small_area = []; small_area_selected = ''"
            ></v-select>
          </v-flex>

          <v-flex xs12 d-flex v-if="middle_area.length">
            <v-select
              v-model="middle_area_selected"
              :items="middle_area"
              item-text="name"
              item-value="code"
              :hint="middle_area_selected"
              label="middle_area"
              outline
              @change="getAreaCode('small_area', {'middle_area': middle_area_selected}); small_area_selected = []"
            ></v-select>
          </v-flex>

          <v-flex xs12 d-flex v-if="small_area.length">
            <v-select
              v-model="small_area_selected"
              :items="small_area"
              item-text="name"
              item-value="code"
              label="small_area"
              outline
              multiple
              chips
              :rules="rules"
            ></v-select>
          </v-flex>

          <v-flex xs12 d-flex>
            <v-btn
              flat
              @click="changeStep(1)"
            >
              Cancel
            </v-btn>

            <v-btn
              v-if="small_area_selected.length"
              color="primary"
              :loading="addModalListLoading"
              :disabled="addModalListLoading"
              @click="setSearchOptions"
            >
              Search
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import * as HotpepperFunction from '../../../functions/HotpepperFunction'

export default {
  name: 'stepperContentAreaSearch',
  props: ['addModalListLoading'],
  data () {
    return {
      valid: false,
      rules: [
        v => v.length < 6 || 'small_area は最大5つまで指定可能です。'
      ],
      large_area: [],
      middle_area: [],
      small_area: [],
      large_area_selected: '',
      middle_area_selected: '',
      small_area_selected: []
    }
  },
  created () {
    this.getAreaCode('large_area')
  },
  methods: {
    getAreaCode (area, options) {
      HotpepperFunction.getAreaHotpepper(area, options)
        .then((response) => {
          // 都度空にする
          this.$data[area] = []

          response.forEach((el) => {
            this.$data[area].push(el)
          })
        }).catch((error) => {
          this.$emit('showSnackbar', error)
        })
    },
    setSearchOptions () {
      if (!this.$refs.form.validate()) return
      this.$emit('setSearchOptions', {
        small_area: this.small_area_selected.join(',')
      })
    },
    changeStep (num) {
      this.$emit('changeStep', num)
    }
  }
}
</script>

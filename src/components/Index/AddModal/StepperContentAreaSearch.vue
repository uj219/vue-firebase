<template>
  <div class="stepper-content-area-search">
    <v-container fluid grid-list-xl>
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
            @change="validateSmallArea"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn
      v-if="small_area_selected.length"
      color="primary"
      @click="search"
    >
      Search
    </v-btn>

    <v-btn
      flat
      @click="step = 1"
    >
      Cancel
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios';
import hotPepperApiKey from '../../../api_keys/hotpepper';

export default {
  name: 'stepperContentAreaSearch',
  data () {
    return {
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
      const params = Object.assign({
        key: hotPepperApiKey,
        format: 'json'
      }, options)

      axios.get(`http://webservice.recruit.co.jp/hotpepper/${area}/v1/`,{
        params: params
      }).then((response) => {
        // 都度空にする
        this.$data[area] = []

        response.data.results[area].forEach((el) => {
          this.$data[area].push(el)
        })
      }).catch((error) => {
        console.log(error)
      });
    },
    validateSmallArea () {
      console.log(this.small_area_selected.length);
    },
    search () {
      this.$emit('search', {small_area: this.small_area_selected})
    }
  }
}
</script>

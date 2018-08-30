<template>
  <div class="stepper-content-area-search">
    <v-form v-model="valid" ref="form" v-if="location.available">
      <v-container>
        <v-subheader>
          <v-icon>near_me</v-icon>
          現在地から探す
        </v-subheader>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="latitude"
              outline
              readonly
              :value="location.latitude"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              label="longitude"
              outline
              readonly
              :value="location.longitude"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-card flat color="transparent">
              <v-subheader>Range</v-subheader>

              <v-card-text>
                <v-slider
                  v-model="range"
                  :tick-labels="rangeLabels"
                  :max="5"
                  :min="1"
                  step="1"
                  thumb-label="always"
                ></v-slider>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 d-flex>
            <v-btn
              flat
              @click="changeStep(1)"
            >
              Cancel
            </v-btn>

            <v-btn
              v-if="valid"
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

    <div v-else>
      <v-container>
        <v-subheader>
          <v-icon>near_me</v-icon>
          現在地から探す
        </v-subheader>
        <no-item layout="static" text="お使いのブラウザでは位置情報をご利用できません" />
      </v-container>
    </div>
  </div>
</template>

<script>
import NoItem from '@/components/common/NoItem'

export default {
  name: 'stepperContentGpsSearch',
  props: ['addModalListLoading', 'location'],
  components: {
    'no-item': NoItem
  },
  data () {
    return {
      valid: false,
      range: 3,
      rangeLabels: [
        '300m',
        '500m',
        '1km',
        '2km',
        '3km'
      ]
    }
  },
  created () {
    if (this.$props.location.available) this.valid = true
  },
  methods: {
    setSearchOptions () {
      if (!this.$refs.form.validate()) return
      this.$emit('setSearchOptions', {
        lat: this.$props.location.latitude,
        lng: this.$props.location.longitude,
        range: this.range
      })
    },
    changeStep (num) {
      this.$emit('changeStep', num)
    }
  }
}
</script>

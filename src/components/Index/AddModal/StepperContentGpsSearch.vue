<template>
  <div class="stepper-content-area-search">
    <v-form v-model="valid" ref="form" v-if="locationAvailable">
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
              :value="latitude"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              label="longitude"
              outline
              readonly
              :value="longitude"
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
              v-if="valid"
              color="primary"
              @click="search"
            >
              Search
            </v-btn>

            <v-btn
              flat
              @click="changeStep(1)"
            >
              Cancel
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
        <v-alert
          :value="true"
          type="error"
        >
          お使いのブラウザでは位置情報をご利用できません。
        </v-alert>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stepperContentGpsSearch',
  data () {
    return {
      locationAvailable: true,
      valid: false,
      latitude: 0,
      longitude: 0,
      range: 3,
      rangeLabels: [
        '300m',
        '500m',
        '1000m',
        '2000m',
        '3000m'
      ]
    }
  },
  created () {
    this.getLocation()
  },
  methods: {
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude
          this.longitude = position.coords.longitude
          this.valid = true
        })
      } else {
        this.locationAvailable = false
      }
    },
    search () {
      if (!this.$refs.form.validate()) return
      this.$emit('search', {
        lat: this.latitude,
        lng: this.longitude,
        range: this.range
      })
    },
    changeStep (num) {
      this.$emit('changeStep', num)
    }
  }
}
</script>

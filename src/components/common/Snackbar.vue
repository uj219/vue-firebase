<template>
  <div class="snackbar">
    <v-snackbar
      v-model="snackbar.isShown"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
      <v-btn
        dark
        flat
        @click="closeSnackbar"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Snackbar',
  props: ['snackbar'],
  methods: {
    closeSnackbar () {
      this.$emit('closeSnackbar')
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

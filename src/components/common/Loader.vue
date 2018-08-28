<template>
  <div class="loader">
    <div :class="layout">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: ['layout']
}
</script>

<style scoped>
.loader {
  text-align: center
}
.fixed {
  position: fixed;
  top: 50%;
  width: 100%;
  text-align: center;
  left: 0;
  margin-top: -15px;
}
</style>

<template>
  <div class="loader">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  top: 50%;
  width: 100%;
  text-align: center;
  left: 0;
  margin-top: -15px;
}
</style>

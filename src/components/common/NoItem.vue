<template>
  <div class="no-item">
    <v-icon class="mb-2">block</v-icon>
    <div>{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'NoItems',
  props: ['text']
}
</script>

<style scoped>
.no-item {
  position: fixed;
  top: 50%;
  width: 100%;
  text-align: center;
  left: 0;
  margin-top: -27px;
}
</style>

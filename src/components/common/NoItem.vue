<template>
  <div class="no-item">
    <div :class="layout">
      <v-icon class="mb-2">block</v-icon>
      <div>{{text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoItems',
  props: ['text', 'layout']
}
</script>

<style scoped>
.no-item {
  text-align: center;
  color: rgba(0,0,0,.54);
}
.fixed {
  position: fixed;
  top: 50%;
  width: 100%;

  left: 0;
  margin-top: -27px;
}
.static {
  margin: 40px 0;
}
</style>

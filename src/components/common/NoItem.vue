<template>
  <div class="no-item" :style="{height: height}">
    <div class="no-item">
      <v-icon class="mb-2">block</v-icon>
      <div>{{text}}</div>
    </div>
  </div>
</template>

<script>
// todo 高さを自動で端末に合わせてMAXに
export default {
  name: 'NoItems',
  props: ['text', 'height']
}
</script>

<style scoped>
.no-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>

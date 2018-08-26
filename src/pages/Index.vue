<template>
  <div class="index">
    <list :list="list" />
    <bottom-nav :current="bottomNav" @syncHeader="syncHeader" @syncAddModal="syncAddModal" />
    <add-modal :isShown="addModal" @syncAddModal="syncAddModal" @addItem="addItem" @showSnackbar="showSnackbar" />
  </div>
</template>

<script>
import List from '@/components/Index/List'
import BottomNav from '@/components/Index/BottomNav'
import AddModal from '@/components/Index/AddModal'

export default {
  name: 'Index',
  components: {
    'list': List,
    'bottom-nav': BottomNav,
    'add-modal': AddModal
  },
  props: ['list'],
  data () {
    return {
      bottomNav: 'recent',
      addModal: false
    }
  },
  created () {
    this.syncHeader(this.bottomNav)
  },
  methods: {
    syncHeader (pageTitle) {
      this.$emit('syncHeader', pageTitle)
    },
    syncAddModal (bool) {
      this.addModal = bool
    },
    addItem (item) {
      this.$emit('addItem', item)
    },
    showSnackbar (params) {
      this.$emit('showSnackbar', params)
    }
  }
}
</script>

<style scoped>
.index {
  margin-top: 60px;
  margin-bottom: 80px;
}
</style>

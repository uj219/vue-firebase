<template>
  <div class="index">
    <list
      :list="list"
      :listLoading="listLoading"
      :currentUser="currentUser"
      @addFav="addFav"
      @deleteFav="deleteFav"
      @syncLoginDialog="syncLoginDialog"
    />

    <bottom-nav
      :current="bottomNav"
      @sortList="sortList"
      @syncAddModal="syncAddModal"
    />

    <add-modal
      :isShown="addModal"
      :isAddingItem="isAddingItem"
      :location="location"
      @syncAddModal="syncAddModal"
      @addItem="addItem"
      @showSnackbar="showSnackbar"
    />
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
  props: ['list', 'listLoading', 'currentUser', 'isAddingItem', 'location'],
  data () {
    return {
      bottomNav: 'recent',
      addModal: false
    }
  },
  methods: {
    sortList (sort) {
      this.$emit('sortList', sort)
    },
    syncAddModal (bool) {
      this.addModal = bool
    },
    syncLoginDialog (bool) {
      this.$emit('syncLoginDialog', bool)
    },
    addItem (item) {
      this.$emit('addItem', item)
    },
    showSnackbar (params) {
      this.$emit('showSnackbar', params)
    },
    addFav (itemId, userId) {
      this.$emit('addFav', itemId, userId)
    },
    deleteFav (itemId, userId) {
      this.$emit('deleteFav', itemId, userId)
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
